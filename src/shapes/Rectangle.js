import Sprite from "../Sprite";

/**
 * @class Rectangle
 */
export default class Rectangle extends Sprite {
    constructor (x, y, w, h) {
        super(x, y, w, h);
        
        this.fill = "#000";
    }

    render (context) {
        super.render(context);

        context.fillStyle = this.fill;
        context.fillRect(0, 0, this.width, this.height);
    }
}
