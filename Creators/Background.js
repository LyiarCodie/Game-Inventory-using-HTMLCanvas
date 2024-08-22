/** @type {CanvasRenderingContext2D} c */
function CreateBackground(c)
{
  const draw = () => {
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
  }

  return { draw }
}

export default CreateBackground;