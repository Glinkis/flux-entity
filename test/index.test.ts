import { expect } from 'chai'
import { createEntityFactory, insertIntoEntity, removeFromEntity, removeFromEntityById } from '../src'

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
    removeFromEntityById(entity, value.id)

    expect(entity.ids).to.eql([])
    expect(entity.all).to.eql({})
  })
})
