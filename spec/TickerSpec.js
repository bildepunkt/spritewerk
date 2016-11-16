import Ticker from "../src/Ticker";
import Canvas from "./_mocks/Canvas";
import window from "./_mocks/window";

window.CustomEvent = ()=> {};

describe("Ticker", ()=> {
    let ticker;

    beforeEach(()=> {
        ticker = new Ticker(new Canvas(), {
            start: false,
            window
        });
    });

    it("initializes with defaults", ()=> {
        expect(ticker instanceof Ticker).toBe(true);
        expect(ticker.screen instanceof Canvas).toBe(true);
    });

    it("updates", ()=> {
        spyOn(ticker, "onPreTick");
        spyOn(ticker, "onTick");
        spyOn(ticker, "onPostTick");

        ticker._update();

        expect(ticker.onPreTick).toHaveBeenCalled();
        expect(ticker.onTick).toHaveBeenCalled();
        expect(ticker.onPostTick).toHaveBeenCalled();
    });
});
