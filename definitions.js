/**
 * @typedef {Object} Item
 * @prop {() => void} draw
 * @prop {() => { x: number, y: number }} getPosition
 * @prop {() => { w: number, h: number }} getSize
 * @prop {(newPosition: { x: number, y: number }) => void} setPosition
 */

/**
 * @typedef {Object} Slot
 * @prop {() => void} draw
 * @prop {() => { x: number, y: number }} getPosition
 * @prop {() => { w: number, h: number }} getSize
 * @prop {Item} getItem
 * @prop {(Item: Item | null) => void} setItem
 * @prop {(value: boolean) => void} setHover
 */

/**
 * @typedef {Object} Cursor
 * @prop {() => void} draw
 * @prop {(newPosition: { x: number, y: number }) => void} setPosition
 * @prop {() => { x: number, y: number }} getPosition
 * @prop {() => { w: number, y: number }} getSize
 * @prop {() => boolean} getClick
 * @prop {(value: boolean) => void} setClick
 * @prop {() => boolean} getHolding
 * @prop {(value: boolean) => void} setHolding
 * @prop {(Item: Item | null) => void} setItem
 * @prop {Item} getItem
 */