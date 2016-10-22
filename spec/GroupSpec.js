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
        let item = { uuid: 4 };
        let group2 = new Group();
        let itemFound = false;

        group2.collection.add(item);
        group.collection.add(group2);

        group.collection.each( item => {
            if (item.uuid === 4) {
                itemFound = true;
            }
        });

        expect(itemFound).toBe(true);
    });
});
