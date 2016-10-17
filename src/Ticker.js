import { broadcast } from "./util/radio";

const defaults = {
    start: true
};

/**
 * @class Ticker
 * @description Executes callback based on given fps and requestAnimationFrame
 * @author Chris Peters
 * 
 * @param {Object} [opts] The Ticker's options
 * @param {Boolean} [opts.start=true] Starts timer on instantiation
 */
export default class Ticker {
    constructor(screen, opts=defaults) {
        this.screen = screen;
        this.ticks = 0;
        this.then = null;

        this._update = this._update.bind(this);

        if (opts.start) {
            this.start();
        }
    }

    /**
     * dispatches events and executes callbacks
     * @method Ticker#_update
     */
    _update() {
        const now = Date.now();
        const delta = (now - this.then) / 1000;

        this.then = now;
        this.ticks += 1;

        const detail = {
            delta,
            ticks: this.ticks
        };

        // create and fire tick events and execute callbacks
        this.onPreTick(delta, this.ticks);
        broadcast(this.screen, "pretick", detail);

        this.onTick(delta, this.ticks);
        broadcast(this.screen, "tick", detail);

        this.onPostTick(delta, this.ticks);
        broadcast(this.screen, "tick", detail);

        requestAnimationFrame(this._update);
    }

    /**
     * A callback executed pre each tick.
     *
     * @method Ticker#onPreTick
     * @param {Integer} delta The time elapsed between ticks
     * @param {Integer} ticks The amount of ticks that have accumulated
     */
    onPreTick() {}

    /**
     * A callback executed on each tick.
     *
     * @method Ticker#onTick
     * @param {Integer} delta The time elapsed between ticks
     * @param {Integer} ticks The amount of ticks that have accumulated
     */
    onTick() {}

    /**
     * A callback executed post tick.
     * @method Ticker#onPostTick
     * @param {Integer} delta The time elapsed between ticks
     * @param {Integer} ticks The amount of ticks that have accumulated
     */
    onPostTick() {}

    /**
     * Starts the ticker
     * @method Ticker#start
     */
    start() {
        this.then = Date.now();
        requestAnimationFrame(this._update);
    }
}
