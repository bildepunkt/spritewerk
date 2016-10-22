import Camera from "../src/Camera";
import Group from "../src/Group";
import Scene from "../src/Scene";
import Sprite from "../src/Sprite";
import Ticker from "../src/Ticker";
import Viewport from "../src/Viewport";

class Rect extends Sprite {
    render (context) {
        super.render(context);

        context.fillStyle = this.fill;
        context.fillRect(0, 0, this.width, this.height);
    }
}

(() => {
    const size = 512;
    let rectCount = 32;
    let zoomingIn = true;
    let zoomFactor = 0.01;
    let rotFactor = 0.2;
    
    let viewport = new Viewport(size, size, {
        parent: document.querySelector("#spritewerk"),
        fitToWindow: false
    });
    let camera = new Camera(0, 0, size, size);
    let scene = new Scene(viewport.canvas, camera, {
        debug: true
    });
    let ticker = new Ticker(viewport.screen);
    let group = new Group();

    while (--rectCount) {
        let wh = Math.round(Math.random() * 16 + 16);
        let x = Math.round(Math.random() * size);
        let y = Math.round(Math.random() * size);
        let rect = new Rect(x, y, wh, wh);

        rect.fill = "#000";

        group.collection.add(rect);
    }

    ticker.onTick = ()=> {
        scene.clear("#ccc");
        scene.startRender(group);

        if (camera.zoom > 2) {
            zoomingIn = false;
        }

        if (camera.zoom < 1) {
            zoomingIn = true;
        }

        if (zoomingIn) {
            camera.zoom += zoomFactor;
            camera.rotation += rotFactor;
        } else {
            camera.zoom -= zoomFactor;
            camera.rotation -= rotFactor;
        }
    };
}).call(this);
