import { CreateDimensions, CreateVector2 } from './Utils.js';
import "../definitions.js";

/** @type {HTMLImageElement} */
const cursorImg = document.getElementById("cursorImg")

/** @param {CanvasRenderingContext2D} c */
function CreateCursor(c)
{
  let position = CreateVector2(0, 0);
  let size = CreateDimensions(cursorImg.width, cursorImg.height);
  let holding = false;
  let click = false;

  /** @type {Item} */
  let item = null;

  /** @param {Item} newItem */
  const setItem = (newItem) => {
    item = newItem;
  }

  const getItem = () => item;

  /**
   * @param {{x: number; y: number}} newPosition 
   * @returns {void}
   */
  const setPosition = (newPosition) => {
    Object.assign(position, newPosition);
  }

  const getPosition = () => ({ x: position.x, y: position.y })
  const getSize = () => ({ w: size.w, h: size.h })

  const getClick = () => click;
  const setClick = (value = true) => {
    if (typeof(value) != "boolean") { 
      console.error("The assigned value is invalid! Expecting a `boolean` value");
      return;
    }

    click = value;
  } 

  const getHolding = () => holding;
  const setHolding = (value = true) => {
    if (typeof(value) != "boolean") { 
      console.error("The assigned value is invalid! Expecting a `boolean` value");
      return;
    }

    click = value;
  } 

  const update = () => {
    if (item)
    {
      if ("setPosition" in item) { 
        item.setPosition({ x: position.x - item.getSize().w / 2, y: position.y - item.getSize().h / 2 }) 
      }
    }
  }

  const draw = () => {
    if (item)
    {
      if ("draw" in item) { 
        item.draw()
      }
    }
    else
    {
      c.drawImage(cursorImg, position.x, position.y, size.w, size.h);
    }
  }

  return { draw, update, setPosition, getPosition, getSize, getClick, setClick, setItem, getItem, getHolding, setHolding }
}

export default CreateCursor;