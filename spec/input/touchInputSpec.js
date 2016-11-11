import touchInput from "../../src/input/touchInput";
import touchCnst from "../../src/input/constants/touch";
import emulatedCnst from "../../src/input/constants/emulated";
import Group from "../../src/Group";
import Rectangle from "../../src/shapes/Rectangle";
import Canvas from "../_mocks/Canvas";
import win from "../_mocks/window";
import event from "../_mocks/event";

describe("touchInput", ()=> {
    let canvas = new Canvas();

    beforeEach(()=> {
        let group = new Group();
        group.collection.add(new Rectangle());
        touchInput.init(canvas, group, {
            canvasFit: false,
            window: win
        });
    });

    it("initializes", ()=> {
        expect(touchInput.handlerObjects).toEqual({
            [touchCnst.TOUCH_START]: [],
            [touchCnst.TOUCH_MOVE]: [],
            [touchCnst.TOUCH_END]: [],
            [emulatedCnst.DBL_TAP]: [],
            [emulatedCnst.TAP]: [],
            [emulatedCnst.DRAG]: [],
            [emulatedCnst.DRAG_END]: [],
            [emulatedCnst.DRAG_START]: []
        });

        expect(touchInput.queuedEvents).toEqual([]);
    });

    // TODO switched to getClientBoundingRect. can it be mocked?
    xit("calculates canvas offset", ()=> {
        let e = Object.assign({}, event, {
            type: touchCnst.TAP,
            pageX: 32,
            pageY: 32
        });

        canvas.offsetLeft = 28;
        canvas.offsetTop = 16;

        touchInput.enqueueEvent(e);

        expect(touchInput.queuedEvents[0].x).toEqual(4);
        expect(touchInput.queuedEvents[0].y).toEqual(16);
    });

    it("queues events", ()=> {
        let e = Object.assign({}, event, {
            type: touchCnst.TAP
        });

        touchInput.enqueueEvent(e);

        expect(touchInput.queuedEvents[0].domEvent).toEqual(e);
        expect(touchInput.queuedEvents[0].type).toEqual(touchCnst.TAP);
    });

    it("emulates drag events", ()=> {
        let e = Object.assign({}, event, {
            type: touchCnst.TOUCH_START
        });
        touchInput.enqueueEvent(e);

        expect(touchInput.queuedEvents[0].type).toEqual(touchCnst.TOUCH_START);

        e = Object.assign({}, event, {
            type: touchCnst.TOUCH_MOVE
        });
        touchInput.enqueueEvent(e);

        expect(touchInput.queuedEvents[1].type).toEqual(touchCnst.TOUCH_MOVE);
        expect(touchInput.queuedEvents[2].type).toEqual(emulatedCnst.DRAG_START);
        expect(touchInput.queuedEvents[3].type).toEqual(emulatedCnst.DRAG);

        e = Object.assign({}, event, {
            type: touchCnst.TOUCH_END
        });
        touchInput.enqueueEvent(e);

        expect(touchInput.queuedEvents[4].type).toEqual(touchCnst.TOUCH_END);
        expect(touchInput.queuedEvents[5].type).toEqual(emulatedCnst.DRAG_END);
    });
});