import { expect } from 'chai'
import { List } from 'immutable'
import maxSum from '../src/maxSum'

describe('function maxSum', () => {

  it('is valid for proposed arrays', () => {
    expect(maxSum(List.of(0, 1, 2, 3, 4, 5)))
      .to.equal(27)

    expect(maxSum(List.of(-1, 0, 1)))
      .to.equal(1)

    expect(maxSum(List.of(1, 1)))
      .to.equal(2)
  })

  it('is valid for other arrays', () => {
    expect(maxSum(List.of(-1, -1)))
      .to.equal(1)

    expect(maxSum(List.of(-1, -2, -3, -4, -5)))
      .to.equal(25)
  })
})
