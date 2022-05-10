import { v4 as uuidv4 } from 'uuid';

/** Class representing an in game item */
export class Item {
  name: string;
  description: string;
  quantity: number;

  /**
   * Create an item instance
   * @param name name of item
   * @param description description of item
   * @param quantity quantity of this item in the stack, default = 1, min at instantiation = 1
   */
  constructor(name: string, description: string, quantity: number = 1) {
    this.name = name;
    this.description = description;
    this.quantity = Math.max(quantity, 1);
  }

  /**
   * Check if two items are the same item not the same instance 
   * @param item 
   * @returns true or false
   */
  isSameItem(item: Item): boolean {
    return this.name == item.name && this.description == item.description;
  }

  /**
   * Modify the quantity of an item in a given stack
   * @param value quantity to modify by
   * @returns true if quantity exceed value to modify by, otherwise does not modify and returns false.
   */
  modifyQuantity(value: number): boolean {
    if (this.quantity + value < 0) return false;
    this.quantity += value;
    return true;
  }

  /**
   * Create a copy of the item mainly for testing
   * @returns copy of self
   */
  copy(): Item {
    return new Item(this.name, this.description, this.quantity);
  }
}