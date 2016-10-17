import Camera from "../src/Camera";
import Group from "../src/Group";
import Scene from "../src/Scene";
import Sprite from "../src/Sprite";
import Ticker from "../src/Ticker";
import Viewport from "../src/Viewport";

class Rect extends Sprite {
    render (context) {
        super.render(context);

        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

(() => {
    const size = 512;
    const parent = document.querySelector("#spritewerk");
    let rectCount = 32;
    let zoomingIn = true;
    let zoomFactor = 0.01;
    let rotFactor = 0.2;
    
    let viewport = new Viewport(size, size, {
        parent
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

        group.collection.add(new Rect(x, y, wh, wh));
    }

    ticker.onTick = ()=> {
        scene.clear();


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
