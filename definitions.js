/**
 * @typedef {Object} Slot
 * @prop {() => void} draw
 * @prop {() => { x: number, y: number }} getPosition
 * @prop {() => { w: number, h: number }} getSize
 * @prop {(value: boolean) => void} setHover
 */

/**
 * @typedef {Object} Item
 * @prop {() => void} draw
 */

/**
 * @typedef {Object} Cursor
 * @prop {() => void} draw
 * @prop {(newPosition: { x: number, y: number }) => void} setPosition
 * @prop {() => { x: number, y: number }} getPosition
 * @prop {() => { w: number, y: number }} getSize
 */