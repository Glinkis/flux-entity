import { expect } from 'chai'

import {
  createEntityFactory,
  insertIntoArray,
  removeFromArray,
  insertIntoEntity,
  removeFromEntity,
  removeFromEntityById,
} from '../src'

interface Value {
  id: number
  name: string
}

describe('createEntityFactory', () => {
  it('should create a function', () => {
    expect(createEntityFactory<Value>()).to.be.a('function')
  })
})

describe('createEntity', () => {
  it('should create an entity object', () => {
    expect(createEntityFactory<Value>()('id')).to.eql({
      key: 'id',
      ids: [],
      all: {},
    })
  })
})

describe('insertIntoArray', () => {
  it('should insert values into the array', () => {
    const array: number[] = []
    insertIntoArray(array, 0, 1, 2)
    expect(array).to.eql([0, 1, 2])
  })
})

describe('removeFromArray', () => {
  it('should insert values into the array', () => {
    const array: number[] = [0, 1, 2]
    removeFromArray(array, 0, 1, 2)
    expect(array).to.eql([])
  })
})

describe('insertIntoEntity', () => {
  it('should insert a value into the entity', () => {
    const entity = createEntityFactory<Value>()('id')
    const value = { id: 0, name: 'Jane' }

    insertIntoEntity(entity, value)

    expect(entity.ids).to.eql([0])
    expect(entity.all).to.eql({ 0: value })
  })
})

describe('removeFromEntity', () => {
  it('should remove a value from the entity', () => {
    const entity = createEntityFactory<Value>()('id')
    const value = { id: 0, name: 'Bob' }

    insertIntoEntity(entity, value)
    removeFromEntity(entity, value)

    expect(entity.ids).to.eql([])
    expect(entity.all).to.eql({})
  })
})

describe('removeFromEntityById', () => {
  it('should remove a value from the entity by its id', () => {
    const entity = createEntityFactory<Value>()('id')
    const value = { id: 0, name: 'Bob' }

    insertIntoEntity(entity, value)
    removeFromEntityById(entity, 0)

    expect(entity.ids).to.eql([])
    expect(entity.all).to.eql({})
  })
})
