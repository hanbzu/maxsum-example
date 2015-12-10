import { List } from 'immutable'


// todo array must be sorted by absolute number
// positive values must not be passed together
// with negatives/zeroes. Make two groups and then concat.
function doPairs(todo, done = List()) {

  if (todo.isEmpty())
    return done
  else if (todo.size === 1)
    return done.push(todo.first())

  const [a, b] = todo.take(2).toJS()

  if (a * b > a + b)
    return doPairs(todo.skip(2), done.push([a, b]))
  else
    return doPairs(todo.skip(1), done.push(a))
}


export default function (list) {

  const sortByAbs = (a, b) => Math.abs(b) - Math.abs(a)

  const negativesAndZeroesSorted =
    list.filter(_ => _ <= 0).sort(sortByAbs)

  const positivesSorted =
    list.filter(_ => _ > 0).sort(sortByAbs)

  const grouped = doPairs(positivesSorted)
    .concat(doPairs(negativesAndZeroesSorted))

  console.log('list: ', list.toJS())
  console.log('grouped: ', grouped.toJS())

  // Multiply and add
  return grouped
    .map(_ => _ instanceof Array ? (_[0] * _[1]) : _)
    .reduce((a, b) => a + b, 0)
}
