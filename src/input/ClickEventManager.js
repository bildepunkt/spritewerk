import { spriteMatch } from "../util";
import mouseCnst from "./constants/mouse";
import touchCnst from "./constants/touch";
import emulatedCnst from "./constants/emulated";

/**
 * Provides a common interface for mouse and touch events to emulate click events
 * @class input/ClickEventManager
 * @requires ./constants/emulated
 * @param  {String} start The mouse/touch start event
 * @param  {String} move  The mouse/touch move event
 * @param  {String} end   The mouse/touch end event
 */
export default class ClickEventManager {
    constructor (start, end) {
        this.startEvent = start;
        this.endEvent = end;
        this.clickee = null;
    }

    getEvents (event) {
        let clickEvents = [];

        // emulate events
        switch (event.type) {
        case this.startEvent:
            this.clickee = event.target;

            break;
        case this.endEvent:
            if (this.clickee && spriteMatch(this.clickee, event.target)) {
                let type;

                switch (this.endEvent) {
                case mouseCnst.MOUSE_UP:
                    type = emulatedCnst.CLICK;
                    break;
                case touchCnst.TOUCH_END:
                    type = emulatedCnst.TAP;
                    break;
                }

                clickEvents.push(Object.assign({}, event, {
                    type
                }));
            }

            this.clickee = null;
            
            break;
        }

        return clickEvents;
    }
}