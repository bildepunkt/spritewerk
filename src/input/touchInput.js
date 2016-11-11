import { tuneIn } from "../util/radio";
import touchCnst from "./constants/touch";
import emulatedCnst from "./constants/emulated";
import { getScaleFactor } from "../util/domHelpers";
import DragEventManager from "./DragEventManager";
import { pointRectCollide } from "../util/physics";

/**
 * @module input/touchInput
 */
export default {
    /**
     * @method mouseInput.init
     * @param  {[type]} canvas    [description]
     * @param  {Object} opts - Options from Input
     */
    init (canvas, tree, opts) {
        this.canvas = canvas;
        this.tree = tree;
        this.opts = opts;

        this.dragEventManager = new DragEventManager(
            touchCnst.TOUCH_START,
            touchCnst.TOUCH_MOVE,
            touchCnst.TOUCH_END
        );

        this.handlerObjects = {
            [touchCnst.TOUCH_START]: [],
            [touchCnst.TOUCH_MOVE]: [],
            [touchCnst.TOUCH_END]: [],
            [emulatedCnst.DBL_TAP]: [],
            [emulatedCnst.TAP]: [],
            [emulatedCnst.DRAG]: [],
            [emulatedCnst.DRAG_END]: [],
            [emulatedCnst.DRAG_START]: []
        };
        this.queuedEvents = [];
        this.enqueueEvent = this.enqueueEvent.bind(this);
        this.tapCandidates = [];

        for (let event in touchCnst) {
            tuneIn(canvas, touchCnst[event], this.enqueueEvent);
        }
    },

    /**
     * Handler for DOM events. Creates custom event object with helpful properties
     * @method mouseInput.enqueueEvent
     * @param {object} inputEvent - The DOM event object
     */
    enqueueEvent (inputEvent) {
        inputEvent.preventDefault();
        inputEvent.stopPropagation();

        let boundingRect = this.canvas.getBoundingClientRect();
        let scaleFactor = this.opts.canvasFit ? getScaleFactor(this.canvas) : 1;
        let event = {
            domEvent: inputEvent,
            type: inputEvent.type,
            ctrlKey: inputEvent.ctrlKey,
            shiftKey: inputEvent.shiftKey,
            metaKey: inputEvent.metaKey,
            button: inputEvent.button,
            target: undefined
        };
        let x, y;

        if (inputEvent.touches && inputEvent.touches.length) {
            x = inputEvent.touches[0].pageX;
            y = inputEvent.touches[0].pageY;
        } else if (inputEvent.changedTouches && inputEvent.changedTouches.length) {
            x = inputEvent.changedTouches[0].pageX;
            y = inputEvent.changedTouches[0].pageY;
        } else {
            x = inputEvent.pageX;
            y = inputEvent.pageY;
        }

        // coordinate positions relative to canvas scaling
        event.x = Math.ceil((x - (boundingRect.left + this.opts.window.scrollX)) * scaleFactor);
        event.y = Math.ceil((y - (boundingRect.top + this.opts.window.scrollY)) * scaleFactor);

        // find and set target object
        this.tree.collection.each((item)=> {
            if (pointRectCollide(event.x, event.y, item)) {
                event.target = item;
                // don't break, we want the last-most (highest) item
            }
        });

        this.queuedEvents.push(event);

        this.queuedEvents = this.queuedEvents.concat(this.dragEventManager.getDragEvents(event));
    }
};
