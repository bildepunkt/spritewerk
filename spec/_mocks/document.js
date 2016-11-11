import Canvas from "./Canvas";
import Element from "./Element";

export default {
    body: new Element("body"),
    children: [],

    createElement: (type)=> {
        switch (type) {
        case "canvas":
            return new Canvas(type);
        default:
            return new Element(type);
        }
    }
};
