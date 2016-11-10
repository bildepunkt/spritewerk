/**
 * @class Collection
 * @param {Any} [...items] - optional items to initially add
 */
export default class Collection {
    constructor (...items) {
        /**
         * @member {Array} Collection#items - the collection of items
         */
        this.items = items || [];
    }

    /**
     * Add n items(s)
     * @method Collection#add
     * @param  {...Object} items - item(s) to add
     */
    add (...items) {
        for (let item of items) {
            this.items.push(item);
        }
    }

    /**
     * Add an item at a given index
     * @method Collection#addAt
     * @param  {Integer} index - The index to add the item
     * @param  {Any}     item - The item to add
     */
    addAt (index, item) {
        if (index > this.getCount()) {
            this.add(item);
        } else {
            this.items.splice(index, 0, item);
        }
    }

    /**
     * Iterates the collection's sorted items. The item, index, and name are supplied
     * to the provided function
     * @method Collection#each
     * @param {Function} fn - The function to execute on the iterable
     * @param {Object} [scope] - The scope with which to execute the function
     */
    each (fn, scope) {
        fn = scope ? fn.bind(scope) : fn;

        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            let doContinue;

            // if item on last item and an item is removed
            if (!item) {
                break;
            }

            doContinue = fn(item, i);

            if (doContinue === false) {
                break;
            }
        }
    }

    /**
     * Returns an object at a given index
     * @method Collection#fetchAt
     * @param  {Integer} index - The index
     * @return {Any}
     */
    fetchAt (index) {
        return this.items[index];
    }

    /**
     * iterates items and return the ones that meet criteria
     * @method Collection#filter
     * @param  {Function} fn - Truth predicate
     * @param  {Object} [scope] - The scope in which to execute the function
     * @return {Array}
     */
    filter(fn, scope) {
        let filteredItems = [];

        this.each((item, i)=> {
            let predicate = fn(item, i);

            if (predicate) {
                filteredItems.push(item);
            }
        }, scope);

        return filteredItems;
    }

    /**
     * Returns the count of items in group
     * @method Collection#getCount
     * @return {Integer} - The item count
     */
    getCount () {
        return this.items.length;
    }

    /**
     * Returns the given item's index, with optional starting index
     * @method Collection#getIndex
     * @param  {Any} item - the item to query
     * @param  {Integer} [fromIndex] - starting index
     * @return {Integer} - the item's index
     */
    getIndex (item, fromIndex) {
        return this.items.indexOf(item, fromIndex);
    }

    /**
     * Checks if item is at front of render order
     * @method Collection#isAtFront
     * @param  {Any} item - The item to query
     * @return {Boolean} - If item is at front
     */
    isAtFront (item) {
        return this.getIndex(item) === this.getCount() - 1;
    }

    /**
     * Checks if item is at back of render order
     * @method Collection#isAtBack
     * @param  {Any} item - The item to query
     * @return {Boolean} - If item is at back
     */
    isAtBack (item) {
        return this.getIndex(item) === 0;
    }

    // TODO unify with util.match
    /**
     * Returns if two items have the same unique id
     * @method Collection#match
     * @param  {Any} a - item a
     * @param  {Any} b - item b
     * @return {Boolean} If items match
     */
    match (a, b) {
        return a.uuid === b.uuid;
    }

    /**
     * Moves an item to a new index
     * @method Collection#move
     * @param  {Any} movee - the item to move
     * @param  {Integer} indices - the amount of indices to shift item. Can be positive/negative
     * @return {Boolean} - Whether the item was successfully moved
     */
    move (movee, indices) {
        const index = this.getIndex(movee);

        if (indices === 0) {
            return false;
        }

        // cannot move before begining (don't use isAtBack to save getIndex use)
        if (index === 0 && indices < 0) {
            return false;
        }

        // cannot move past end (don't use isAtFront to save getIndex use)
        if (index === this.getCount() - 1 && indices > 0) {
            return false;
        }

        this.remove(movee);
        this.addAt(index + indices, movee);

        return true;
    }

    /**
     * Moves an item to the front of the render order
     * @method Collection#moveToFront
     * @param  {Any} movee - the item to move
     * @return {Boolean} - Whether item successfully moved
     */
    moveToFront (movee) {
        if (this.isAtFront(movee)) {
            return false;
        }

        this.remove(movee);
        this.addAt(this.getCount(), movee);

        return true;
    }

    /**
     * Moves an item to the back of the render order
     * @method Collection#moveToBack
     * @param  {Any} movee - the item to move
     * @return {Boolean} - Whether item successfully moved
     */
    moveToBack (movee) {
        if (this.isAtBack(movee)) {
            return false;
        }

        this.remove(movee);
        this.addAt(0, movee);

        return true;
    }

    /**
     * Remove item by name
     * @method Collection#removeBy
     * @param {String} removee - The item to remove
     * @return {Boolean} - Whether item was successfully removed
     */
    remove (removee) {
        let removed = false;

        for (let i = 0, len = this.getCount(); i < len; i++) {
            let item = this.items[i];
            if (this.match(item, removee)) {
                this.items.splice(i, 1);
                removed = true;
                break;
            }
        }

        return removed;
    }

    /**
     * Removes all items
     * @method Collection#removeAll
     */
    removeAll () {
        this.items = [];
    }

    /**
     * Remove item at given index
     * @method Collection#removeAt
     * @param {Integer} index - The index of the item to remove
     */
    removeAt (index) {
        this.items.splice(index, 1);
    }
}