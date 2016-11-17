import Sprite from "../Sprite";

/**
 * @class Polygon
 */
export default class Polygon extends Sprite {
    constructor (x, y, w, h) {
        super(x, y, w, h);
        
        this.fill = "#000";
        this.stroke = "";
        this.points = [];
    }

    render (context) {
        super.render(context);

        context.beginPath();
        context.moveTo(0, 0);

        /*if (this.points.length < 2) {
            console.warn("Polygon#points requires at least two points");
        }*/

        for (let pt of this.points) {
            context.lineTo(pt.x, pt.y);
        }

        context.closePath();

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
