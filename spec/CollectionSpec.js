import Collection from "../src/Collection";

describe("CollectionNoName", ()=> {
    let itemA = { uuid: 0 };
    let itemB = { uuid: 1 };
    let itemC = { uuid: 2 };
    let collection;

    beforeEach(()=> {
        collection = new Collection();
    });

    it("adds one item", ()=> {
        collection.add(itemA);

        expect(collection.items[0]).toEqual(itemA);
    });

    it("adds one item at the given index", ()=> {
        collection.add(itemA, itemA, itemA);

        collection.addAt(1, itemB);

        expect(collection.getCount()).toEqual(4);
        expect(collection.fetchAt(1)).toEqual(itemB);
    });

    it("iterates over items", ()=> {
        collection.add(itemA, itemB, itemC);
        let iteratees = [];

        collection.each((item, index)=> {
            iteratees.push({
                item, index
            });
        });

        expect(iteratees).toEqual([
            {
                item: itemA,
                index: 0
            }, {
                item: itemB,
                index: 1
            }, {
                item: itemC,
                index: 2
            }
        ]);
    });

    it("breaks on iteration if fn returns false", ()=> {
        collection.add(itemA, itemB, itemC);
        let iteratees = [];

        collection.each((item, index)=> {
            if (index > 0) {
                return false;
            }

            iteratees.push({
                item, index
            });
        });

        expect(iteratees).toEqual([
            {
                item: itemA,
                index: 0
            }
        ]);
    });

    it("fetches an item at given index", ()=> {
        collection.add(itemA, itemB, itemA);

        expect(collection.fetchAt(1)).toEqual(itemB);
    });

    it("filters items", ()=> {
        collection.add(itemA, itemA, itemA, itemB, itemA, itemB);
        
        let bItems = collection.filter((item)=> {
            return item.uuid === 1;
        });

        expect(bItems).toEqual([itemB, itemB]);
    });

    it("returns correct count", ()=> {
        collection.add(itemA);
        expect(collection.getCount()).toEqual(1);
        collection.add(itemA);
        expect(collection.getCount()).toEqual(2);
        collection.add(itemA);
        expect(collection.getCount()).toEqual(3);
    });

    it("returns index of item", ()=> {
        collection.add(itemA, itemA, itemA, itemC, itemA, itemB);

        expect(collection.getIndex(itemC)).toEqual(3);
        expect(collection.getIndex(itemB)).toEqual(5);
    });

    it("returns if item is at front (last in list)", ()=> {
        collection.add(itemA, itemB, itemC);

        expect(collection.isAtFront(itemC)).toBe(true);
        expect(collection.isAtFront(itemB)).toBe(false);
        expect(collection.isAtFront(itemA)).toBe(false);
    });

    it("returns if item is at back (first in list)", ()=> {
        collection.add(itemA, itemB, itemC);

        expect(collection.isAtBack(itemA)).toBe(true);
        expect(collection.isAtBack(itemB)).toBe(false);
        expect(collection.isAtBack(itemC)).toBe(false);
    });

    it("matches two items", ()=> {
        expect(collection.match(itemA, itemA)).toBe(true);
        expect(collection.match(itemA, itemB)).toBe(false);
    });

    it("moves an item", ()=> {
        collection.add(itemA, itemB, itemC);

        collection.move(itemA, 1);
        expect(collection.fetchAt(0)).toEqual(itemB);
        expect(collection.fetchAt(1)).toEqual(itemA);
        expect(collection.fetchAt(2)).toEqual(itemC);

        collection.move(itemC, -2);
        expect(collection.fetchAt(0)).toEqual(itemC);
        expect(collection.fetchAt(1)).toEqual(itemB);
        expect(collection.fetchAt(2)).toEqual(itemA);
    });

    it("moves an item to the front (last index)", ()=> {
        collection.add(itemA, itemB, itemC);

        collection.moveToFront(itemA);
        expect(collection.fetchAt(0)).toEqual(itemB);
        expect(collection.fetchAt(1)).toEqual(itemC);
        expect(collection.fetchAt(2)).toEqual(itemA);
    });

    it("moves an item to the back (first index)", ()=> {
        collection.add(itemA, itemB, itemC);

        collection.moveToBack(itemC);
        expect(collection.fetchAt(0)).toEqual(itemC);
        expect(collection.fetchAt(1)).toEqual(itemA);
        expect(collection.fetchAt(2)).toEqual(itemB);
    });

    it("removes an item", ()=> {
        collection.add(itemA, itemB, itemC);

        collection.remove(itemB);
        expect(collection.getCount()).toEqual(2);
        expect(collection.fetchAt(0)).toEqual(itemA);
        expect(collection.fetchAt(1)).toEqual(itemC);
    });

    it("removes all items", ()=> {
        collection.add(itemA, itemB, itemC);

        expect(collection.getCount()).toEqual(3);
        collection.removeAll();
        expect(collection.getCount()).toEqual(0);
    });

    it("removes an item at given index", ()=> {
        collection.add(itemA, itemB, itemC);

        collection.removeAt(1);
        expect(collection.getCount()).toEqual(2);
        expect(collection.fetchAt(0)).toEqual(itemA);
        expect(collection.fetchAt(1)).toEqual(itemC);
    });
});
