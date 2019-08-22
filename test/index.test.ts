import { expect } from 'chai'
import { createEntityFactory, insertIntoEntity, removeFromEntity } from '../src'

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
      all: {},
      ids: [],
      key: 'id',
    })
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

describe('removeValue', () => {
  it('should remove a value from the entity', () => {
    const entity = createEntityFactory<Value>()('id')
    const value = { id: 0, name: 'Bob' }

    insertIntoEntity(entity, value)
    removeFromEntity(entity, value)

    expect(entity.ids).to.eql([])
    expect(entity.all).to.eql({})
  })
})
