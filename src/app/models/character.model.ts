import { v4 as uuidv4 } from 'uuid';
import { Attribute } from '../enums/attributes.enum';
import { Item } from './item.model';

/** Class representing a character in the game world */
export class Character {
  id: string;
  name: string;
  initialAttributes: number[];
  attributes: number[];
  inventory: Item[];
  alive: boolean;

  /**
   * Create an instance of a character
   * @param name name of character
   * @param initialAttributes characters starting attributes
   * @param initalInventory characters starting inventory
   */
  constructor(name: string, initialAttributes: number[], initalInventory: Item[] = []) {
    this.id = uuidv4();
    this.name = name;
    this.inventory = initalInventory;
    this.initialAttributes = [];
    this.attributes = [];
    initialAttributes.forEach(attribute => {
      this.initialAttributes.push(attribute);
      this.attributes.push(attribute);
    });
    this.alive = this.attributes[Attribute.Vitality] > 0;
  }

  /**
   * Modify a characters attribute by an amount
   * @param attribute attribute to modify
   * @param value value to modify by
   * @returns final value of attribute
   */
  modifyAttribute(attribute: Attribute, value: number): number {
    value = Math.floor(value);
    this.attributes[attribute] = Math.max(0, Math.min(this.attributes[attribute] + value, this.initialAttributes[attribute]));
    this.checkAlive();
    return this.attributes[attribute];
  }

  /**
   * Modify a characters initial attribute by an amount
   * @param attribute initial attribute to modify
   * @param value value to modify by
   * @returns final value of initial attribute
   */
  modifyInitialAttribute(attribute: Attribute, value: number): number {
    value = Math.floor(value);
    this.initialAttributes[attribute] = Math.max(0, this.initialAttributes[attribute] + value);
    this.checkAlive();
    return this.attributes[attribute];
  }

  /**
   * Check if the character is alive
   * @returns true or false
   */
  checkAlive(): boolean {
    return this.alive = this.attributes[Attribute.Vitality] > 0;
  }

  /**
   * Checks if the character has an item matching the name and description provided
   * @param itemToFind item to search for
   * @returns id of found item or null
   */
  hasItem(itemToFind: Item): boolean {
    let foundItem: Item | undefined = this.inventory.find(item => item.isSameItem(itemToFind));
    return foundItem != undefined && foundItem.quantity >= itemToFind.quantity;
  }

  /**
   * Remove a quantity of an item from a characters inventory 
   * @param itemToRemove item to remove from inventory
   * @returns characters updated inventory or null if failed
   */
  removeItem(itemToRemove: Item): Item[] | null {
    let itemIndex = this.inventory.findIndex(item => item.isSameItem(itemToRemove));
    if (itemIndex === -1) return null;
    if (!this.inventory[itemIndex].modifyQuantity(-itemToRemove.quantity)) return null;
    if (this.inventory[itemIndex].quantity === 0) this.inventory.splice(itemIndex, 1);
    return this.inventory;
  }

  /**
   * Add an item to the characters inventory
   * @param itemToAdd item to add
   * @returns characters updated inventory
   */
  addItemToInventory(itemToAdd: Item): Item[] {
    let foundItem: Item | undefined = this.inventory.find(item => item.isSameItem(itemToAdd));
    if (foundItem === undefined) this.inventory.push(itemToAdd)
    else foundItem.modifyQuantity(itemToAdd.quantity);
    return this.inventory;
  }


  /**
   * Create a copy of the character mainly for testing
   * @returns copy of self
   */
  copy(): Character {
    let copy: Character = new Character(
      this.name,
      this.initialAttributes.map((initialAttribute) => initialAttribute),
      this.inventory.map((item) => item.copy())
    );
    copy.attributes = this.attributes.map((attribute) => attribute);
    copy.checkAlive();
    return copy;
  }
}