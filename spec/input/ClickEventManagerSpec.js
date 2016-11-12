import ClickEventManager from "../../src/input/ClickEventManager";
import touchCnst from "../../src/input/constants/touch";
import mouseCnst from "../../src/input/constants/mouse";
import emulatedCnst from "../../src/input/constants/emulated";

describe("ClickEventManager", ()=> {
    const clickee = {
        uuid: 4
    };
    let mouseClickEventManager;
    let touchClickEventManager;

    beforeEach(()=> {
        mouseClickEventManager = new ClickEventManager(
            mouseCnst.MOUSE_DOWN,
            mouseCnst.MOUSE_UP
        );

        touchClickEventManager = new ClickEventManager(
            touchCnst.TOUCH_START,
            touchCnst.TOUCH_END
        );
    });

    it("(mouse) sets canDrag flag to true", ()=> {
        mouseClickEventManager.getEvents({
            type: mouseCnst.MOUSE_DOWN,
            target: clickee
        });

        expect(mouseClickEventManager.clickee).toEqual(clickee);
    });

    it("(mouse) returns [ CLICK ] event", ()=> {
        mouseClickEventManager.getEvents({
            type: mouseCnst.MOUSE_DOWN,
            target: clickee
        });

        expect(mouseClickEventManager.getEvents({
            type: mouseCnst.MOUSE_UP,
            target: clickee
        })).toEqual(
            [{
                type: emulatedCnst.CLICK,
                target: clickee
            }]
        );
    });

    it("(touch) sets canDrag flag to true", ()=> {
        touchClickEventManager.getEvents({
            type: touchCnst.TOUCH_START,
            target: clickee
        });

        expect(touchClickEventManager.clickee).toEqual(clickee);
    });

    it("(touch) returns [ TAP ] event", ()=> {
        touchClickEventManager.getEvents({
            type: touchCnst.TOUCH_START,
            target: clickee
        });

        expect(touchClickEventManager.getEvents({
            type: touchCnst.TOUCH_END,
            target: clickee
        })).toEqual(
            [{
                type: emulatedCnst.TAP,
                target: clickee
            }]
        );
    });
});
