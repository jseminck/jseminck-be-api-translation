/**
 * Shuffle an array, using the Fisher-Yates shuffle algorithm:
 * - https://bost.ocks.org/mike/shuffle/
 * @param {Object[]} array
 * @returns {Object[]} shuffled array
 */
export default function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}