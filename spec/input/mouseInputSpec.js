import mouseInput from "../../src/input/mouseInput";
import mouseCnst from "../../src/input/constants/mouse";
import emulatedCnst from "../../src/input/constants/emulated";
import Group from "../../src/Group";
import Rectangle from "../../src/shapes/Rectangle";
import Canvas from "../_mocks/Canvas";
import event from "../_mocks/event";

describe("mouseInput", ()=> {
    let canvas = new Canvas();

    beforeEach(()=> {
        let group = new Group();
        group.collection.add(new Rectangle());
        mouseInput.init(canvas, group, false);
    });

    it("initializes", ()=> {
        expect(mouseInput.handlerObjects).toEqual({
            [mouseCnst.MOUSE_DOWN]: [],
            [mouseCnst.MOUSE_MOVE]: [],
            [mouseCnst.MOUSE_UP]: [],
            [emulatedCnst.DBL_CLICK]: [],
            [emulatedCnst.CLICK]: [],
            [emulatedCnst.DRAG]: [],
            [emulatedCnst.DRAG_END]: [],
            [emulatedCnst.DRAG_START]: []
        });

        expect(mouseInput.queuedEvents).toEqual([]);
    });

    it("calculates canvas offset", ()=> {
        let e = Object.assign({}, event, {
            type: mouseCnst.CLICK,
            pageX: 32,
            pageY: 32
        });

        canvas.offsetLeft = 28;
        canvas.offsetTop = 16;

        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[0].x).toEqual(4);
        expect(mouseInput.queuedEvents[0].y).toEqual(16);
    });

    it("queues events", ()=> {
        let e = Object.assign({}, event, {
            type: mouseCnst.CLICK
        });

        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[0].domEvent).toEqual(e);
        expect(mouseInput.queuedEvents[0].type).toEqual(mouseCnst.CLICK);
    });

    it("emulates drag events", ()=> {
        let e = Object.assign({}, event, {
            type: mouseCnst.MOUSE_DOWN
        });
        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[0].type).toEqual(mouseCnst.MOUSE_DOWN);

        e = Object.assign({}, event, {
            type: mouseCnst.MOUSE_MOVE
        });
        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[1].type).toEqual(mouseCnst.MOUSE_MOVE);
        expect(mouseInput.queuedEvents[2].type).toEqual(emulatedCnst.DRAG_START);
        expect(mouseInput.queuedEvents[3].type).toEqual(emulatedCnst.DRAG);

        e = Object.assign({}, event, {
            type: mouseCnst.MOUSE_UP
        });
        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[4].type).toEqual(mouseCnst.MOUSE_UP);
        expect(mouseInput.queuedEvents[5].type).toEqual(emulatedCnst.DRAG_END);
    });

    it("sets a mousedown target", ()=> {
        let e = Object.assign({}, event, {
            type: mouseCnst.MOUSE_DOWN,
            pageX: 32,
            pageY: 32
        });
        mouseInput.enqueueEvent(e);

        expect(mouseInput.queuedEvents[0].target instanceof Rectangle).toBe(true);
    });
});