import { CreateDimensions, CreateVector2 } from './Creators/Utils.js';
import CreateInventory from './Creators/Inventory.js';
import CreateCursor from './Creators/Cursor.js';
import './definitions.js';

//#region 
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const c = canvas.getContext('2d');

/** @type {HTMLImageElement} */
const inventoryImg = document.getElementById("inventoryImg")
/** @type {HTMLImageElement} */
const cursorImg = document.getElementById("cursorImg")
/** @type {HTMLImageElement} */
const itemsImg = document.getElementById("itemsImg")

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

const scaleFactor = 1;

/** @param {{row: number, column: number}} itemImageClipIndex */
const CreateItem = (itemImageClipIndex) => {
  const position = CreateVector2();
  const size = CreateDimensions(16, 16);

  const draw = () => {
    
  }

  return { draw }
}

function CreateBackground()
{
  const draw = () => {
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
  }

  return { draw }
}

const cursor = CreateCursor(c);
const inventory = CreateInventory(c, cursor);

instances.push(CreateBackground());
instances.push(inventory);
instances.push(cursor);

function getCursorPosition(clientX = 0, clientY = 0)
{
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const mouseX = Math.round((clientX - rect.left) * scaleX);
  const mouseY = Math.round((clientY - rect.top) * scaleY);

  return CreateVector2(mouseX, mouseY);
}

canvas.addEventListener("mousemove", (ev) => {
  const { clientX, clientY } = ev;

  const cursorPosition = getCursorPosition(clientX, clientY);

  cursor.setPosition(cursorPosition);
});

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