import { tuneIn } from "../util/radio";
import mouseCnst from "./constants/mouse";
import emulatedCnst from "./constants/emulated";
import { getScaleFactor } from "../util/domHelpers";

/**
 * @module mouseInput
 */
export default {
    /**
     * @method mouseInput.init
     * @param  {[type]} canvas    [description]
     * @param  {[type]} canvasFit [description]
     */
    init (canvas, canvasFit) {
        this.canvas = canvas;
        this.canvasFit = canvasFit;

        this.handlerObjects = {
            [mouseCnst.DBL_CLICK]: [],
            [mouseCnst.CLICK]: [],
            [mouseCnst.MOUSE_DOWN]: [],
            [mouseCnst.MOUSE_MOVE]: [],
            [mouseCnst.MOUSE_UP]: [],
            [emulatedCnst.DRAG]: [],
            [emulatedCnst.DRAG_END]: [],
            [emulatedCnst.DRAG_START]: []
        };
        this.queuedEvents = [];
        this.enqueueEvent = this.enqueueEvent.bind(this);
        this.clickCandidates = [];
        this.isDragging = false;
        this.canDrag = false;

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

        this.queuedEvents.push(event);

        // emulate events
        switch (event.type) {
        case mouseCnst.MOUSE_DOWN:
            this.canDrag = true;

            break;
        case mouseCnst.MOUSE_MOVE:
            if (this.canDrag) {
                if (!this.isDragging) {
                    this.queuedEvents.push(Object.assign({}, event, {
                        type: emulatedCnst.DRAG_START
                    }));
                }

                this.queuedEvents.push(Object.assign({}, event, {
                    type: emulatedCnst.DRAG
                }));

                this.isDragging = true;
            }

            break;
        case mouseCnst.MOUSE_UP:
            if (this.isDragging) {
                this.queuedEvents.push(Object.assign({}, event, {
                    type: emulatedCnst.DRAG_END
                }));

                this.isDragging = false;
            }

            this.canDrag = false;
            break;
        }
    }
};
