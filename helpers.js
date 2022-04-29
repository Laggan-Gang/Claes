function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function random(x) {
  if (Array.isArray(x)) return x[Math.floor(Math.random() * x.length)];
  if (typeof x == 'object') return x[random(Object.keys(x))];
  if (typeof x == 'number') return Math.floor(1 + Math.random() * x);
  if (typeof x == 'boolean') return Math.random() > 0.5;
  if (typeof x == 'string')
    return x.split(' ').length > 1
      ? random(x.split(' '))
      : x[Math.floor(Math.random() * x.length)];
}

module.exports = {
  shuffleArray,
  random,
};
