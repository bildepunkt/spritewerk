import { tuneIn } from "../util/radio";
import mouseCnst from "./constants/mouse";
import emulatedCnst from "./constants/emulated";
import { getScaleFactor } from "../util/domHelpers";
import DragEventManager from "./DragEventManager";
import { pointRectCollide } from "../util/physics";

/**
 * @module input/mouseInput
 */
export default {
    /**
     * @method mouseInput.init
     * @param  {[type]} canvas    [description]
     * @param  {[type]} canvasFit [description]
     */
    init (canvas, tree, canvasFit) {
        this.canvas = canvas;
        this.tree = tree;
        this.canvasFit = canvasFit;

        this.dragEventManager = new DragEventManager(
            mouseCnst.MOUSE_DOWN,
            mouseCnst.MOUSE_MOVE,
            mouseCnst.MOUSE_UP
        );

        this.handlerObjects = {
            [mouseCnst.MOUSE_DOWN]: [],
            [mouseCnst.MOUSE_MOVE]: [],
            [mouseCnst.MOUSE_UP]: [],
            [emulatedCnst.DBL_CLICK]: [],
            [emulatedCnst.CLICK]: [],
            [emulatedCnst.DRAG]: [],
            [emulatedCnst.DRAG_END]: [],
            [emulatedCnst.DRAG_START]: []
        };
        this.queuedEvents = [];
        this.enqueueEvent = this.enqueueEvent.bind(this);
        this.clickCandidates = [];

        for (let event in mouseCnst) {
            tuneIn(canvas, mouseCnst[event], this.enqueueEvent);
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

        let scaleFactor = this.canvasFit ? getScaleFactor(this.canvas) : 1;
        let event = {
            domEvent: inputEvent,
            type: inputEvent.type,
            ctrlKey: inputEvent.ctrlKey,
            shiftKey: inputEvent.shiftKey,
            metaKey: inputEvent.metaKey,
            button: inputEvent.button
        };

        // coordinate positions relative to canvas scaling
        event.x = Math.round((inputEvent.pageX - this.canvas.offsetLeft) * scaleFactor);
        event.y = Math.round((inputEvent.pageY - this.canvas.offsetTop) * scaleFactor);

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
