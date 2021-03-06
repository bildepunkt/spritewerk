import Sprite from "../Sprite";

/**
 * @class Rectangle
 */
export default class Rectangle extends Sprite {
    constructor (x, y, w, h) {
        super(x, y, w, h);
        
        this.fill = "#000";
        this.stroke = "";
    }

    render (context) {
        super.render(context);

        context.beginPath();
        context.rect(0, 0, this.width, this.height);

        if (this.fill) {
            context.fillStyle = this.fill;
            context.fill();
        }

        if (this.stroke) {
            context.strokeStyle = this.stroke;
            context.stroke();
        }
    }
}
