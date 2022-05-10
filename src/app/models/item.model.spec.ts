import { Item } from './item.model';


describe('Item', () => {
  let items: Item[] = [];
  let data: any[] = [
    { name: 'Same Name', description: 'Same Description', quantity: 1 },
    { name: 'Same Name', description: 'Same Description', quantity: 1 },
    { name: 'Different Name', description: 'Different Description', quantity: 10 }
  ]
  let modifyValue: number = -5;


  beforeEach(() => {
    items = [];
    data.forEach(item => {
      items.push(new Item(item.name, item.description, item.quantity));
    });
  });

  it('copy should produce an identical object', () => {
    items.forEach(item => {
      let originalEntries = Object.entries(item);
      let copy = item.copy();
      Object.entries(copy).forEach((entry, index) => {
        expect(entry[1]).toEqual(originalEntries[index][1]);
      });
    });
  });

  it('items with identical names and descriptions should be equal', () => {
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (items[i].name == items[j].name && items[i].description == items[j].description) {
          expect(items[i].isSameItem(items[j])).toBeTrue();
        } else {
          expect(items[i].isSameItem(items[j])).toBeFalse();
        }
      }
    }
  });

  it('reducing the quantity of an item should never fall below zero', () => {
    items.forEach(item => {
      if (item.quantity + modifyValue < 0) {
        expect(item.modifyQuantity(modifyValue)).toBeFalse();
      } else {
        let expectedValue: number = item.quantity + modifyValue;
        expect(item.modifyQuantity(modifyValue)).toBeTrue();
        expect(item.quantity).toEqual(expectedValue);
      }
    });
  });
});
