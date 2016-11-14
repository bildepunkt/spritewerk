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
        /**
         * @member {Sprite} Group#sprite - The group's display object
         */
        this.sprite = new Sprite();
        /**
         * @member {Boolean} Group#isGroup - Denotes the object as a group
         */
        this.isGroup = true;
    }

    /**
     * Iterates the collection's sorted items. The item, index, and name are supplied
     * to the provided function
     * @method Collection#each
     * @param {Function} fn - The function to execute on the iterable
     * @param {Object} [scope] - The scope with which to execute the function
     */
    nestedEach (fn, scope) {
        fn = scope ? fn.bind(scope) : fn;

        for (let i = 0, len = this.collection.getCount(); i < len; i++) {
            let item = this.collection.items[i];
            let doContinue;

            // if item on last item and an item is removed
            if (!item) {
                break;
            }

            if (item.isGroup) {
                item.nestedEach(fn, scope);
            } else {
                doContinue = fn(item, i);

                if (doContinue === false) {
                    break;
                }
            }
        }
    }
}
