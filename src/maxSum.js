import { List } from 'immutable'

// todo array must be sorted by absolute number
function doGroups(todo, done = List()) {
  //console.log(done, todo)

  switch (todo.size) {
  case 0: return done
  case 1: return done.push(todo.first())
  default:
  }

  const [a, b] = todo.take(2).toJS()

  if (a * b > a + b)
    return doGroups(todo.skip(2), done.push([a, b]))
  else
    return doGroups(todo.skip(1), done.push(a))
}


export default (list) => {
  const sortByAbs = (a, b) => Math.abs(b) - Math.abs(a)
  const negativesAndZeroes = list.filter(_ => _ <= 0)
  const positives = list.filter(_ => _ > 0)

  const grouped =
    doGroups(positives.sort(sortByAbs))
    .concat(doGroups(negativesAndZeroes.sort(sortByAbs)))

  console.log('list: ', list.toJS())
  console.log('grouped: ', grouped.toJS())

  return grouped
    .map(_ => _ instanceof Array ? (_[0] * _[1]) : _)
    .reduce((a, b) => a + b, 0)
}
