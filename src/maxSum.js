import { List } from 'immutable'

// todo array must be sorted by absolute number
// positive values must not be passed together
// with negatives/zeroes. Make two groups and then concat.
function group(todo, done = List()) {

  if (todo.isEmpty())
    return done
  else if (todo.size === 1)
    return done.push(todo.first())

  const [a, b] = todo.take(2).toJS()

  if (a * b > a + b)
    return group(todo.skip(2), done.push([a, b]))
  else
    return group(todo.skip(1), done.push(a))
}

const sortByAbs = (a, b) => Math.abs(b) - Math.abs(a)

export default (list) => {

  const negativesAndZeroes = group(
    list.filter(_ => _ <= 0).sort(sortByAbs)
  )

  const positives = group(
    list.filter(_ => _ > 0).sort(sortByAbs)
  )

  const grouped = positives.concat(negativesAndZeroes)

  console.log('list: ', list.toJS())
  console.log('grouped: ', grouped.toJS())

  return grouped
    .map(_ => _ instanceof Array ? (_[0] * _[1]) : _)
    .reduce((a, b) => a + b, 0)
}
