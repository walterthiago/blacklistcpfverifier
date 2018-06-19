let counter = 0;

function count() {
  ++counter;
}

function getCounter() {
  return counter;
}

module.exports = exports = {
  count, getCounter
}