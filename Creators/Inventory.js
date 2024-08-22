import { CreateDimensions, CreateVector2, place_meeting } from './Utils.js';
import { CreateBranch, CreateHoe, CreateStone, CreateWateringCan, CreateAxe, CreateWood } from './Items.js';
import CreateSlot from './Slot.js';

import "../definitions.js";

/** @type {HTMLImageElement} */
const inventoryImg = document.getElementById("inventoryImg")

/** 
 * @param {CanvasRenderingContext2D} c
 * @param {Cursor} cursor
 *  */
function CreateInventory(c, cursor)
{
  const size = CreateDimensions(inventoryImg.width, inventoryImg.height);
  const position = CreateVector2(size.w / 2, size.h / 2 - 7);

  const amountOfCells = 15;

  /** @type {Slot[]} */
  const slotsArr = new Array(amountOfCells);

  const CreateSlots = () => {
    const columns = 5;
    const rows = 3;
    const gap = 1;
    const margin = 2;
    let i = 0;

    for (let row = 0; row < slotsArr.length / columns; row++)
    {
      for (let col = 0; col < slotsArr.length / rows; col++)
      {
        const current_slot = CreateSlot(c);
        
        const slotX = position.x + margin + (current_slot.getSize().w * col) + (gap * (col));
        const slotY = position.y + margin + (current_slot.getSize().h * row) + (gap * (row));
        current_slot.setPosition(CreateVector2(slotX, slotY));
        slotsArr[i] = current_slot;
        i++;
      }
    }
  }
  CreateSlots();

  const populateInventory = () => {
    /** @type {Item[]} */
    const items = [CreateHoe(c), CreateWateringCan(c), CreateAxe(c), CreateBranch(c), CreateStone(c), CreateWood(c)];

    let current_item_id = 0;
    while (current_item_id < items.length)
    {
      let random_slot_id = Math.floor(Math.random() * slotsArr.length);
      const current_slot = slotsArr[random_slot_id];

      if (current_slot.getItem() != null)
      {
        continue;
      }
      else {
        const current_item = items[current_item_id];
        current_item.setPosition(current_slot.getPosition());

        current_slot.setItem(current_item);

        current_item_id += 1;
      }
    }
  }
  populateInventory();

  const update = () => {
    for (let i = 0; i < slotsArr.length; i++)
    {
      const current_slot = slotsArr[i];
      if (place_meeting(cursor.getPosition().x, cursor.getPosition().y, current_slot))
      {
        current_slot.setHover(true);
        
        if (cursor.getClick() && cursor.getItem() == null)
        {
          cursor.setItem(current_slot.getItem())
          current_slot.setItem(null);
        }
        else if (cursor.getClick() && current_slot.getItem() == null)
        {
          /** @type {Item} */
          const cursor_item = cursor.getItem();
          cursor_item.setPosition(current_slot.getPosition());
          current_slot.setItem(cursor_item);

          cursor.setItem(null);
        }
        else if (cursor.getClick() && current_slot.getItem() != null)
        {
          const slot_item = current_slot.getItem();
          /** @type {Item} */
          const cursor_item = cursor.getItem();
          cursor_item.setPosition(current_slot.getPosition());
          current_slot.setItem(cursor_item);

          cursor.setItem(slot_item);
        }
      }
      else
      {
        current_slot.setHover(false);
      }
    }
  }

  const draw = () => {
    c.drawImage(inventoryImg, position.x, position.y, size.w, size.h);

    for (let i = 0; i < slotsArr.length; i++)
    {
      const current_slot = slotsArr[i];
      if (current_slot)
      {
        if (current_slot.draw) { current_slot.draw(); }
        if (current_slot.update) { current_slot.update(); }
      }
    }
  }

  return { draw, update }
}

export default CreateInventory;