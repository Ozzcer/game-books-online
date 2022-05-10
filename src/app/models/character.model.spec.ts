import { Attribute } from "../enums/attributes.enum";
import { Character } from "./character.model";
import { Item } from "./item.model";

describe('Character', () => {
  const ITEM_QUANTITY_TO_CHECK: number = 5;
  const ITEM_QUANTITY_TO_REMOVE: number = 5;
  const ITEM_QUANTITY_TO_ADD: number = 1;
  let character: Character;
  let inventory: Item[] = [new Item("Test Item 1", "Test Item 1 Desc"), new Item("Test Item 2", "Test Item 2 Desc", 5), new Item("Test Item 3", "Test Item 3 Desc", 10)];
  let attributes: number[] = [10, 10, 10];

  beforeEach(() => {
    character = new Character("player", attributes, inventory);
  });

  it('copy should produce an identical object', () => {
    let originalEntries = Object.entries(character);
    let copy = character.copy();
    Object.entries(copy).forEach((entry, index) => {
      if (entry[0] === "id") return;
      expect(entry[1]).toEqual(originalEntries[index][1]);
    });
  });

  it('characters inventory should return a list of size equal to the inventory data', () => {
    expect(character.inventory.length).toEqual(inventory.length);
  });

  it('subtracting half a players vitality should leave them with half of their vitality and alive', () => {
    let originalVitality: number = character.attributes[Attribute.Vitality];
    let returnedVitality: number = character.modifyAttribute(Attribute.Vitality, -(originalVitality / 2));
    expect(returnedVitality).toEqual(character.attributes[Attribute.Vitality]);
    expect(character.attributes[Attribute.Vitality]).toEqual(Math.ceil(originalVitality / 2));
  });

  it('increasing a players attributes should not increase past their initial attributes', () => {
    Object.keys(Attribute).forEach(attribute => {
      if (isNaN(Number(attribute))) return;
      character.modifyAttribute(Number(attribute), Number.MAX_SAFE_INTEGER);
      expect(character.attributes[Number(attribute)]).toEqual(character.initialAttributes[Number(attribute)]);
    });
  });

  it('a decreased attribute should never fall below 0', () => {
    Object.keys(Attribute).forEach(attribute => {
      if (isNaN(Number(attribute))) return;
      character.modifyAttribute(Number(attribute), -Number.MAX_SAFE_INTEGER);
      expect(character.attributes[Number(attribute)]).toEqual(0);
    });
  });

  it('decreasing vitality to zero should mark the character as not alive', () => {
    character.modifyAttribute(Attribute.Vitality, -Number.MAX_SAFE_INTEGER);
    expect(character.alive).toBeFalse();
  });

  it('has item should return false if the user does not have an item', () => {
    expect(character.hasItem(new Item("NON EXISTENT", "NON EXISTENT"))).toBeFalse();
  });

  it('has item should respectively return true or false if the user has sufficient quantity of given item', () => {
    character.inventory.forEach(item => {
      let itemToCheck: Item = new Item(item.name, item.description, ITEM_QUANTITY_TO_CHECK);
      let hasItem: boolean = character.hasItem(itemToCheck);
      if (itemToCheck.quantity > item.quantity) {
        expect(hasItem).toBeFalse()
      } else {
        expect(hasItem).toBeTrue();
      }
    });
  });

  it('remove item should successfully remove given quantity of items from characters inventory or fail for insufficient items', () => {
    for (let i = 0; i < character.inventory.length; i++) {
      let itemToRemove: Item = new Item(character.inventory[i].name, character.inventory[i].description, ITEM_QUANTITY_TO_REMOVE);
      let initialItem = character.inventory[i].copy();
      let initalInventoryLength = character.inventory.length;
      if (ITEM_QUANTITY_TO_REMOVE > character.inventory[i].quantity) {
        expect(character.removeItem(itemToRemove)).toBeFalsy()
        expect(character.inventory.length).toEqual(initalInventoryLength);
      } else {
        let updatedInventory: Item[] | null = character.removeItem(itemToRemove);
        expect(updatedInventory).toBeTruthy();
        if (initialItem.quantity - ITEM_QUANTITY_TO_REMOVE != 0) {
          expect(character.inventory[i].quantity).toEqual(initialItem.quantity - ITEM_QUANTITY_TO_REMOVE);
          expect(character.inventory.length).toEqual(initalInventoryLength);
        } else {
          i--;
          expect(character.inventory.find(item => item.isSameItem(initialItem))).toBeFalsy();
          expect(character.inventory.length).toEqual(initalInventoryLength - 1);
        }

      }
    }
  });

  it('adding a prexisting item to a characters inventory should just increment the quantity of that item', () => {
    let itemToAdd = character.inventory[0].copy();
    let initialSize = character.inventory.length;
    let initialQuantity = itemToAdd.quantity;
    itemToAdd.quantity = ITEM_QUANTITY_TO_ADD;
    let updatedInventory = character.addItemToInventory(itemToAdd);
    expect(updatedInventory).toHaveSize(initialSize);
    expect(updatedInventory[0].quantity).toEqual(initialQuantity + ITEM_QUANTITY_TO_ADD);
  });

  it('adding a new item to a characters inventory should push it to their inventory array', () => {
    let itemToAdd = new Item("NEW ITEM", "NEW ITEM");
    let initialSize = character.inventory.length;
    let updatedInventory = character.addItemToInventory(itemToAdd);
    expect(updatedInventory).toHaveSize(initialSize + 1);
    expect(updatedInventory[initialSize].isSameItem(itemToAdd)).toBeTrue();
  });

});
