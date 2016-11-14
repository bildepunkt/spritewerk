import Group from "../src/Group";
import Collection from "../src/Collection";
import Sprite from "../src/Sprite";

describe("Group", ()=> {
    let group;

    beforeEach(()=> {
        group = new Group();
    });

    it("instantiates", ()=> {
        expect(group instanceof Group).toBe(true);
        expect(group.collection instanceof Collection).toBe(true);
        expect(group.sprite instanceof Sprite).toBe(true);
        expect(group.isGroup).toBe(true);
    });

    it("iterates over other groups", ()=> {
        let item = { uuid: 0 };
        let item2 = { uuid: 1 };
        let item3 = { uuid: 2 };
        let group2 = new Group();
        let group3 = new Group();
        let itemFound = false;
        let item2Found = false;
        let item3Found = false;

        group3.collection.add(item3);
        group2.collection.add(group3, item2);
        group.collection.add(group2, item);

        group.nestedEach( item => {
            if (item.uuid === 0) {
                itemFound = true;
            }
            if (item.uuid === 1) {
                item2Found = true;
            }
            if (item.uuid === 2) {
                item3Found = true;
            }
        });

        expect(itemFound).toBe(true);
        expect(item2Found).toBe(true);
        expect(item3Found).toBe(true);
    });
});
