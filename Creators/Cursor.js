import { CreateDimensions, CreateVector2 } from './Utils.js';

import "../definitions.js";

/** @param {CanvasRenderingContext2D} c */
function CreateCursor(c)
{
  let position = CreateVector2(0, 0);
  let size = CreateDimensions(cursorImg.width, cursorImg.height);
  /** @type {Item | null} */
  let item = null;

  /**
   * @param {{x: number; y: number}} newPosition 
   * @returns {void}
   */
  const setPosition = (newPosition) => {
    Object.assign(position, newPosition);
  }

  const getPosition = () => ({ x: position.x, y: position.y })
  const getSize = () => ({ w: size.w, h: size.h })

  const draw = () => {
    c.drawImage(cursorImg, position.x, position.y, size.w, size.h);
  }

  return { draw, setPosition, getPosition, getSize }
}

export default CreateCursor;