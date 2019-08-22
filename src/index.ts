import { Entity, Value, Key, ValueType, KeyType } from './type-helpers'

export { Entity }

export function createEntityFactory<T extends Value>() {
  return function createEntity<K extends Key<T>>(key: K): Entity<T, K> {
    return {
      key: key,
      ids: [],
      all: {},
    } as any
  }
}

export function insertIntoArray<T>(array: T[], ...values: T[]) {
  for (const value of values) {
    const index = array.indexOf(value)
    index < 0 && array.push(value)
  }
}

export function removeFromArray<T>(array: T[], ...values: T[]) {
  for (const value of values) {
    const index = array.indexOf(value)
    index < 0 || array.splice(index, 1)
  }
}

export function insertIntoEntity<E extends Entity>(entity: E, ...values: ValueType<E>[]) {
  for (const value of values) {
    const id = value[entity.key]
    entity.all[id] = value
    insertIntoArray(entity.ids, id)
  }
}

export function removeFromEntity<E extends Entity>(entity: E, ...values: ValueType<E>[]) {
  for (const value of values) {
    const id = value[entity.key]
    delete entity.all[id]
    removeFromArray(entity.ids, id)
  }
}

export function removeFromEntityById<E extends Entity>(entity: E, ...ids: KeyType<E>[]) {
  for (const id of ids) {
    delete entity.all[id]
    removeFromArray(entity.ids, id)
  }
}
