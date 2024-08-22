import { CreateDimensions, CreateVector2 } from './Utils.js';
import "../definitions.js";

/** @param {CanvasRenderingContext2D} c */
const CreateSlot = (c) => {
    let position = CreateVector2(10,10);
    let size = CreateDimensions(16, 16);
    /** @type {Item | null} */
    let item = null;
    let isHovered = false;

    const setPosition = (newPosition = { x: 0, y: 0 }) => {
        Object.assign(position, newPosition);
    }

    const update = () => {
    }

    const getSize = () => ({ w: size.w, h: size.h });
    const getPosition = () => ({ x: position.x, y: position.y });
    const setHover = (value = true) => {
        if (typeof(value) != "boolean") { 
        console.error("The assigned value is invalid! Expecting a `boolean` value");
        return;
        }

        isHovered = value;
    }

    const drawOutlineRect = () => {
        c.strokeStyle = "white";
        c.beginPath()
        c.moveTo(position.x, position.y + 0.5); // (start) line from top left corner to top right corner
        c.lineTo(position.x + size.w - 0.5, position.y + 0.5);
        c.lineTo(position.x + size.w - 0.5, position.y + size.h - 0.5); // line from top right corner to bottom right corner
        c.lineTo(position.x + 0.5, position.y + size.h - 0.5); // line from bottom right corner to left bottom corner
        c.lineTo(position.x + 0.5, position.y + 0.5); // line from bottom right corner to the top left corner
        c.stroke();
    }

    const draw = () => {
        if (isHovered) { drawOutlineRect(); }

        if (item) {
        if ("draw" in item) item.draw();
        }
    }

    return { draw, update, setPosition, getSize, getPosition, setHover };
}

export default CreateSlot;