/**
 * @namespace util
 */

/**
 * Determine if an input is numeric or not
 * @method isNumeric
 * @memberOf util
 * @param {Any} n - A value to evaluate
 * @return {Boolean}
 */
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

/**
 * Determine if two sprites are a match
 * @method spriteMatch
 * @memberOf util
 * @param  {Sprite} a - Sprite a
 * @param  {Sprite} b - Sprite b
 * @return {Boolean} - Whether or not the objects match
 */
const spriteMatch = (a, b) => a.uuid === b.uuid;

export {
    isNumeric,
    spriteMatch
};
