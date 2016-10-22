import Collection from "./Collection";
import Sprite from "./Sprite";

/**
 * Composes Sprite and Collection
 * @class Group
 * @requires Collection
 * @requires Sprite
 */
export default class Group {
    constructor () {
        /**
         * @member {Collection} Group#collection - The group's collection
         */
        this.collection = new Collection();
        this.collection.each = (fn, scope)=> {
            fn = scope ? fn.bind(scope) : fn;

            for (let i = 0, len = this.collection.getCount(); i < len; i++) {
                let item = this.collection.items[i];
                let doContinue;

                if (item.isGroup) {
                    item.collection.each(fn, scope);
                } else {
                    // if on last item and that item is removed
                    if (!item) {
                        break;
                    }

                    doContinue = fn(item.item, item.name, i);

                    if (doContinue === false) {
                        break;
                    }
                }
            }
        };
        /**
         * @member {Sprite} Group#sprite - The group's display object
         */
        this.sprite = new Sprite();
        /**
         * @member {Boolean} Group#isGroup - Denote's the object as a group
         */
        this.isGroup = true;
    }
}
