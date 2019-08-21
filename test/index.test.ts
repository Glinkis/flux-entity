import { expect } from 'chai'
import { createEntityFactory } from '../src'

describe('createEntityFactory', () => {
  const entityFactory = createEntityFactory()

  it('should create a function', () => {
    expect(entityFactory).to.be.a('function')
  })

  describe('the returned function', () => {
    const entity = entityFactory('id')

    it('should create an entity object', () => {
      expect(entity).to.eql({
        all: {},
        ids: [],
        key: 'id',
      })
    })
  })
})
