import { CreateDimensions, CreateVector2, place_meeting } from './Utils.js';
import CreateSlot from './Slot.js';
import "../definitions.js";

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
  const getSlots = () => slotsArr;

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

  const update = () => {
    for (let i = 0; i < slotsArr.length; i++)
    {
      const current_slot = slotsArr[i];
      if (place_meeting(cursor.getPosition().x, cursor.getPosition().y, current_slot))
      {
        current_slot.setHover(true);
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

  return { draw, update, getSlots }
}

export default CreateInventory;