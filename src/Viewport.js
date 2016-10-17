/* eslint-disable */
import index from "./";
/* eslint-enable */

import { applyStyles, fitToWindow } from "./util/domHelpers";
import { tuneIn } from "./util/radio";

const defaults = {
    fitToWindow: true
};

/**
 * @class Viewport
 * @requires util/domHelpers
 * @requires util/radio
 *
 * @param {Integer} width The game width
 * @param {Integer} height The game height
 * @param {Object} options
 * @param {HTMLElement} [options.parent=document.body] - The parent element
 * @param {Boolean} [options.fitToWindow=true] - If true, the viewport will fill the screen while maintaining aspect ratio
 */
export default class Viewport {
    constructor (width, height, options=defaults) {
        options = Object.assign(defaults, options);

        // can't set as defaults; throw errors in test env
        if (options.window === undefined) {
            options.window = window;
        }
        if (options.document === undefined) {
            options.document = document;
        }
        if (options.parent === undefined) {
            options.parent = options.document.body;
        }

        /**
         * @member {Integer} Viewport#width - The viewport's width
         */
        this.width = width;
        /**
         * @member {Integer} Viewport#height - The viewport's height
         */
        this.height = height;
        /**
         * @member {Integer} Viewport#options - The viewport's options
         */
        this.options = options;
        /**
         * @member {HTMLElement} Viewport#canvas - The canvas element
         */
        this.canvas = options.document.createElement("canvas");
        /**
         * @member {HTMLElement} Viewport#video - The video element
         */        
        this.video = options.document.createElement("video");
        /**
         * @member {HTMLElement} Viewport#screen - The topmost element to handle UI. Events are also triggered from this element
         */        
        this.screen = options.document.createElement("canvas");

        this.canvas.id = "canvas";
        this.video.id = "video";
        this.screen.id = "screen";

        this.canvas.width = this.screen.width = width;
        this.canvas.height = this.screen.height = height;

        const viewportStyles = {
            height: this.height,
            left: 0,
            position: "absolute",
            top: 0,
            width: this.width
        };
    
        applyStyles(this.canvas, viewportStyles);
        applyStyles(this.video, viewportStyles);
        applyStyles(this.screen, viewportStyles);

        options.parent.appendChild(this.canvas);
        options.parent.appendChild(this.video);
        options.parent.appendChild(this.screen);

        if (options.fitToWindow) {
            tuneIn(options.window, "resize", this._onResize, this);
            tuneIn(options.window, "orientationchange", this._onResize, this);
            this._onResize();
        }
    }

    /**
     * @method Viewport#_onResize
     */
    _onResize () {
        const posCoords = fitToWindow(
            this.width, this.height, this.options.window.innerWidth, this.options.window.innerHeight
        );

        applyStyles(this.canvas, posCoords);
        applyStyles(this.video, posCoords);
        applyStyles(this.screen, posCoords);
    }
}
