import DragEventManager from "../../src/input/DragEventManager";
import touchCnst from "../../src/input/constants/touch";
import mouseCnst from "../../src/input/constants/mouse";
import emulatedCnst from "../../src/input/constants/emulated";

describe("DragEventManager", ()=> {
    let touchDragEventManager;
    let mouseDragEventManager;

    beforeEach(()=> {
        touchDragEventManager = new DragEventManager(
            touchCnst.TOUCH_START,
            touchCnst.TOUCH_MOVE,
            touchCnst.TOUCH_END
        );

        mouseDragEventManager = new DragEventManager(
            mouseCnst.MOUSE_DOWN,
            mouseCnst.MOUSE_MOVE,
            mouseCnst.MOUSE_UP
        );
    });

    it("(touch) sets canDrag flag to true", ()=> {
        touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_START
        });

        expect(touchDragEventManager.canDrag).toBe(true);
    });

    it("(touch) sets isDragging flag to true", ()=> {
        touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_START
        });
        touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_MOVE
        });

        expect(touchDragEventManager.isDragging).toBe(true);
    });

    it("(touch) reverts canDrag and isDragging", ()=> {
        touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_START
        });
        touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_MOVE
        });
        touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_END
        });

        expect(touchDragEventManager.canDrag).toBe(false);
        expect(touchDragEventManager.isDragging).toBe(false);
    });

    it("(touch) returns [ DRAG_START, DRAG ], and [ DRAG_END ]", ()=> {
        touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_START
        });

        expect(touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_MOVE
        })).toEqual(
            [{
                type: emulatedCnst.DRAG_START,
                target: undefined
            }, {
                type: emulatedCnst.DRAG,
                target: undefined
            }]
        );

        expect(touchDragEventManager.getEvents({
            type: touchCnst.TOUCH_END
        })).toEqual(
            [{
                type: emulatedCnst.DRAG_END,
                target: undefined
            }]
        );
    });

    it("(mouse) sets canDrag flag to true", ()=> {
        mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_DOWN
        });

        expect(mouseDragEventManager.canDrag).toBe(true);
    });

    it("(mouse) sets isDragging flag to true", ()=> {
        mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_DOWN
        });
        mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_MOVE
        });

        expect(mouseDragEventManager.isDragging).toBe(true);
    });

    it("(mouse) reverts canDrag and isDragging", ()=> {
        mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_DOWN
        });
        mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_MOVE
        });
        mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_UP
        });

        expect(mouseDragEventManager.canDrag).toBe(false);
        expect(mouseDragEventManager.isDragging).toBe(false);
    });

    it("(mouse) returns [ DRAG_START, DRAG ], and [ DRAG_END ]", ()=> {
        mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_DOWN
        });

        expect(mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_MOVE
        })).toEqual(
            [{
                type: emulatedCnst.DRAG_START,
                target: undefined
            }, {
                type: emulatedCnst.DRAG,
                target: undefined
            }]
        );

        expect(mouseDragEventManager.getEvents({
            type: mouseCnst.MOUSE_UP
        })).toEqual(
            [{
                type: emulatedCnst.DRAG_END,
                target: undefined
            }]
        );
    });
});
