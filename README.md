# Game Books Online

Game Books Online is a web based interface for creating and playing RPG game books. This doc is a WIP. This project is a practice project to develop my TDD skills.

## Concepts

### Book

A book is a complete set of all the following concepts which can be created and played through this project.

### Map

A map is a graph of pages that forms the route that a player can take in a given book.

### Page

A page represents a literal page in the adventure, comprising of contextual information and a decision

### Decision

A decision is a group of actions the player must choose from to proceed from one page to the next. There can be multiple options for a player to choose from that advance to different pages. There must always be one option for the player to choose. Options can be locked behind requirements (Stat or Item) and have immediate impacts on the players state.

### Battle

A battle is a turn based combat encounter where the player must fight a set of monsters. The stats of all characters as well as dice rolls are used to determine the outcome of a given battle. Players are able to use consumables during their turns.

### Character

A character is comprised of a name, set of attributes and an inventory, and is able to partake in battles.

### Attribute

An attribute is a core stat of a character utilised in the game in battles or decisions. Attributes can be modified over the course of a game by decision outcomes or items. There will always be three core attributes:
- Vitality - the current health of the character, if reduced to zero the character dies.
- Skill - the characters combat prowess, used in battles.
- Luck - the characters fortune (or misfortune), used to influence the outcomes of decisions and battle actions.

### Inventory

A characters collection of items.

### Item

An item is an object in the game world that can be carried by a character. All items can be used in decisions (such as gold to trade or losing a weapon). There are two special types of items, equipment and consumables.

### Consumable

A consumable item can be used by a character to provide an immediate effect to their stats.

### Equipment

An equippable item that when equipped in it's relevant equipment slot provides a temporary boost to a characters stats.

### Equipment Slot

An abstraction of a place on a character where an equipment item can be equipped

### Player

The user's character instance that the user progresses through a book with

### Monster

An NPC character that the user can engage in battle with.

## Tools

- Angular https://angular.io/
- ngx-charts https://swimlane.gitbook.io/ngx-charts/