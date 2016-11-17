import Preloader from "../src/Preloader";
import window from "./_mocks/window";

describe("Preloader", ()=> {
    Preloader.window = window;

    it("loads files", ()=> {
        Preloader.load("some/file");

    });
});
