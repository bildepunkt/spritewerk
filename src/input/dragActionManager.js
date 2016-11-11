/**
 * Handles actions to take on targets to drag
 * @module dragActionManager
 */
export default {
    dragee: null,
    offset: {
        x: 0,
        y: 0
    },

    handle (event) {
        switch (event.type) {
        case "dragstart":
            if (event.target && event.target.draggable) {
                this.dragee = event.target;
                this.offset.x = event.x - this.dragee.x;
                this.offset.y = event.y - this.dragee.y;
            }
            break;
        case "drag":
            if (this.dragee) {
                this.dragee.x = event.x - this.offset.x;
                this.dragee.y = event.y - this.offset.y;
            }
            break;
        case "dragend":
            this.dragee = null;
            break;
        }
    }
};
