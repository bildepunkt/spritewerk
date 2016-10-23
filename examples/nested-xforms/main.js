import Camera from "../src/Camera";
import Group from "../src/Group";
import Scene from "../src/Scene";
import Rectangle from "../src/shapes/Rectangle";
import Ticker from "../src/Ticker";
import Viewport from "../src/Viewport";

(() => {
    const size = 512;
    const rectSize = 64;
    const rectSizeHalf = rectSize / 2;

    /* for logging coordinates */
    const output = document.querySelector("#output");
    /* for logging coordinates */

    let viewport = new Viewport(size, size, {
        parent: document.querySelector("#spritewerk"),
        fitToWindow: false
    });
    let camera = new Camera(0, 0, size, size);
    let scene = new Scene(viewport.canvas, camera, { debug: true });
    let ticker = new Ticker(viewport.screen);

    let rect1 = new Rectangle(-rectSizeHalf, -rectSizeHalf);
    let rect2 = new Rectangle(-rectSizeHalf, -rectSizeHalf);
    let rect3 = new Rectangle(-rectSizeHalf, -rectSizeHalf);

    let grp2 = new Group();
    grp2.collection.add(rect2);
    grp2.sprite.x = rectSize;
    grp2.sprite.y = rectSize;

    let grp3 = new Group();
    grp3.collection.add(rect3);
    grp3.sprite.x = rectSize * 2;
    grp3.sprite.y = rectSize * 2;

    let grp1 = new Group();
    grp1.collection.addMany({item: rect1}, {item: grp2}, {item: grp3});
    grp1.sprite.x = size / 2;
    grp1.sprite.y = size / 2;

    ticker.onTick = ()=> {
        scene.clear("#ccc");

        grp1.sprite.rotation += 1;
        grp2.sprite.rotation -= 1;
        grp3.sprite.rotation += 1;

        /* for logging coordinates */
        output.innerHTML = `rect 1 { x: ${Math.round(rect1.gx)}, y: ${Math.round(rect1.gy)} }
rect 2 { x: ${Math.round(rect2.gx)}, y: ${Math.round(rect2.gy)} }
rect 3 { x: ${Math.round(rect3.gx)}, y: ${Math.round(rect3.gy)} }`;
        /* for logging coordinates */

        scene.startRender(grp1);
    };
}).call(this);
