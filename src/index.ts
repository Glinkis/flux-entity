import { arrayInsert, arrayRemove } from './array'

type Value = Record<any, any>

type Key<T> = { [K in keyof T]: T[K] extends PropertyKey ? K : never }[keyof T]

type ValueType<E> = E extends Entity<infer T> ? T : never

type KeyType<E> = E extends Entity<infer T, infer K> ? T[K] : never

export interface Entity<T extends Value = any, K extends Key<T> = Key<T>> {
  readonly all: Record<T[K], T>
  readonly ids: T[K][]
  readonly key: K
}

export function createEntityFactory<T extends Value>() {
  return function createEntity<K extends Key<T>>(key: K): Entity<T, K> {
    return {
      all: {},
      ids: [],
      key: key,
    } as any
  }
}

export function insertIntoEntity<E extends Entity>(entity: E, ...values: ValueType<E>[]) {
  for (const value of values) {
    const id = value[entity.key]
    entity.all[id] = value
    arrayInsert(entity.ids, id)
  }
}

export function removeFromEntity<E extends Entity>(entity: E, ...values: ValueType<E>[]) {
  for (const value of values) {
    const id = value[entity.key]
    delete entity.all[id]
    arrayRemove(entity.ids, id)
  }
}

export function removeFromEntityById<E extends Entity>(entity: E, ...ids: KeyType<E>[]) {
  for (const id of ids) {
    delete entity.all[id]
    arrayRemove(entity.ids, id)
  }
}
