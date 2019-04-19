/**
 * Check if a value is numeric
 *
 * @param param Value to be checked
 * @returns {boolean} Returns true when the `param` is a numeric value
 */
export default function isNumeric(param) {
  if (typeof param === "symbol") {
    return false;
  }

  return !isNaN(parseFloat(param)) && isFinite(param);
}
