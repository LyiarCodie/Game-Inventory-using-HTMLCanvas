import { getCursorPosition } from './Creators/Utils.js';
import CreateInventory from './Creators/Inventory.js';
import CreateCursor from './Creators/Cursor.js';
import CreateBackground from './Creators/Background.js';
import './definitions.js';

//#region 
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const c = canvas.getContext('2d');

/** @type {HTMLButtonElement} */
const startBtn = document.getElementById("start");
/** @type {HTMLButtonElement} */
const stopBtn = document.getElementById("stop");

canvas.width = 172;
canvas.height = 96;
c.imageSmoothingEnabled = false;

let animationFrameId = 0;
let isRunning = false;
let frame = 0;
//#endregion

const instances = [];

const cursor = CreateCursor(c);
const inventory = CreateInventory(c, cursor);

instances.push(CreateBackground(c));
instances.push(inventory);
instances.push(cursor);

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  cursor.setPosition(getCursorPosition(clientX, clientY));
});

canvas.addEventListener("mousedown", () => {
  if (!cursor.getHolding())
  {
    cursor.setClick(true);
    cursor.setHolding(true);
  }
})
canvas.addEventListener("mouseup", () => {
  if (cursor.getHolding())
  {
    cursor.setHolding(false);
  }
})

function animate()
{
  for (let i = 0; i < instances.length; i++)
  {
    const inst = instances[i];
    if (inst)
    {
      if ("draw" in inst) { inst.draw(); }
      if ("update" in inst) { inst.update(); }
    }
    
  }

  cursor.setClick(false);

  frame++;
  animationFrameId = requestAnimationFrame(animate);
}

//#region
startBtn.onclick = () => {
  if (!isRunning)
  {
    animate();
    isRunning = true;
    console.clear();
    console.log("Running");
  }
}

stopBtn.onclick = () => {
  if (isRunning)
  {
    cancelAnimationFrame(animationFrameId);
    isRunning = false;
    console.log("Stopped");
  }
}
//#endregion