import Sprite from "../Sprite";

/**
 * @class Ellipse
 */
export default class Ellipse extends Sprite {
    constructor (x, y, w, h) {
        super(x, y, w, h);
        
        this.fill = "#000";
        this.stroke = "";
    }

    render (context) {
        super.render(context);

        context.beginPath();
        context.ellipse(0, 0, this.width, this.height, 0, 0, 2 * Math.PI);

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
