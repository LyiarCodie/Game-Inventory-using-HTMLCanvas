export function CreateVector2(x = 0, y = 0)
{
  return { x, y };
}

export function CreateDimensions(w = 0, h = 0) {
  return { w, h };
}

/**
 * @param {number} x
 * @param {number} y
 * @param {{ 
*    getPosition() => { x: number, y: number }
*    getSize() => { w: number, h: number }
* }} obj
*/
export function place_meeting(x, y, obj)
{
 const _obj = { 
   position: { ...obj.getPosition() }, 
   size: { ...obj.getSize() } 
 }

 return x > _obj.position.x && x < _obj.position.x + _obj.size.w && y > _obj.position.y && y < _obj.position.y + _obj.size.h;
}

export function getCursorPosition(clientX = 0, clientY = 0)
{
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const mouseX = Math.round((clientX - rect.left) * scaleX);
  const mouseY = Math.round((clientY - rect.top) * scaleY);

  return CreateVector2(mouseX, mouseY);
}