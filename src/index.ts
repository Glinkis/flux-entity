import { arrayInsert, arrayRemove } from './array'

type Value = Record<any, any>

type Key<T> = { [K in keyof T]: T[K] extends keyof any ? K : never }[keyof T]

export interface Entity<T extends Value, K extends Key<T>> {
  readonly all: Record<T[K], T>
  readonly ids: T[K][]
  readonly key: K
}

export function createEntityFactory<T extends Value>() {
  return function createEntity<K extends Key<T>>(key: K): Entity<T, K> {
    return {
      all: {} as Record<T[K], T>,
      ids: [],
      key: key,
    }
  }
}

export function insert<T extends Value, K extends Key<T>>(entity: Entity<T, K>, ...values: T[]) {
  for (const value of values) {
    const id = value[entity.key]
    entity.all[id] = value
    arrayInsert(entity.ids, id)
  }
}

export function remove<T extends Value, K extends Key<T>>(entity: Entity<T, K>, ...values: T[]) {
  for (const value of values) {
    const id = value[entity.key]
    delete entity.all[id]
    arrayRemove(entity.ids, id)
  }
}
