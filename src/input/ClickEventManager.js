//import emulatedCnst from "./constants/emulated";

/**
 * Provides a common interface for mouse and touch events to emulate drag events
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
    }

    getDragEvents (event) {
        let clickEvents = [];

        // emulate events
        switch (event.type) {
        case this.startEvent:

            break;
        case this.endEvent:
            
            break;
        }

        return clickEvents;
    }
}