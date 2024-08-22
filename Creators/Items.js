import { CreateDimensions, CreateVector2 } from './Utils.js';

/** @type {HTMLImageElement} */
const itemsImg = document.getElementById("itemsImg");

import "../definitions.js";

/** 
 * @param {CanvasRenderingContext2D} c
 * @param {{row: number, column: number}} itemImageClipIndex 
 * */
const CreateItem = (c, itemImageClipIndex) => {
    const position = CreateVector2();
    const size = CreateDimensions(16, 16);

    const setPosition = (newPosition = { x: 0, y: 0 }) => {
        Object.assign(position, newPosition);
    }

    const getPosition = () => ({ x: position.x, y: position.y })
    const getSize = () => ({ w: size.w, h: size.h })

    const draw = () => {
        c.drawImage(itemsImg, 16 * itemImageClipIndex.column, 16 * itemImageClipIndex.row, 16, 16, position.x, position.y, size.w, size.h);
    }

    return { draw, setPosition, getPosition, getSize }
}

/** @param {CanvasRenderingContext2D} c */
export const CreateWateringCan = (c) => {
    return CreateItem(c, { row: 0, column: 0 });
}

/** @param {CanvasRenderingContext2D} c */
export const CreateAxe = (c) => {
    return CreateItem(c, { row: 0, column: 1 });
}

/** @param {CanvasRenderingContext2D} c */
export const CreateHoe = (c) => {
    return CreateItem(c, { row: 0, column: 2 });
}

/** @param {CanvasRenderingContext2D} c */
export const CreateStone = (c) => {
    return CreateItem(c, { row: 1, column: 0 });
}

/** @param {CanvasRenderingContext2D} c */
export const CreateBranch = (c) => {
    return CreateItem(c, { row: 1, column: 1 });
}

/** @param {CanvasRenderingContext2D} c */
export const CreateWood = (c) => {
    return CreateItem(c, { row: 1, column: 2 });
}