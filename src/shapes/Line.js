import Sprite from "../Sprite";

/**
 * @class Line
 */
export default class Line extends Sprite {
    constructor (x, y, w, h) {
        super(x, y, w, h);
        
        this.stroke = "#000";
        this.points = [];
    }

    render (context) {
        super.render(context);

        context.beginPath();
        context.moveTo(0, 0);

        /*if (this.points.length < 1) {
            console.warn("Line#points requires at least one point");
        }*/

        for (let pt of this.points) {
            context.lineTo(pt.x, pt.y);
        }

        context.strokeStyle = this.stroke;
        context.stroke();
    }
}