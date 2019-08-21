import { expect } from 'chai'
import { createEntityFactory } from '../src'

describe('createEntityFactory', () => {
  it('should create a function', () => {
    expect(createEntityFactory()).to.be.a('function')
  })
})

describe('createEntity', () => {
  it('should create an entity object', () => {
    expect(createEntityFactory()('id')).to.eql({
      all: {},
      ids: [],
      key: 'id',
    })
  })
})
