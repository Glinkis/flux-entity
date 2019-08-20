import { arrayInsert, arrayRemove } from './array'

type Key<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T]

export interface Entity<T, K extends Key<T>> {
  readonly all: Record<any, T>
  readonly ids: T[K][]
  readonly key: K
}

export function createEntityFactory<T>() {
  return function createEntity<K extends Key<T>>(key: K): Entity<T, K> {
    return { all: {}, ids: [], key: key }
  }
}

const entity = createEntityFactory<Window>()('status')
insert(entity, new Window())

export function insert<T, K extends Key<T>>(entity: Entity<T, K>, ...values: T[]) {
  for (const value of values) {
    const id = value[entity.key]
    entity.all[id] = value
    arrayInsert(entity.ids, id)
  }
}

export function remove<T, K extends Key<T>>(entity: Entity<T, K>, ...values: T[]) {
  for (const value of values) {
    const id = value[entity.key]
    delete entity.all[id]
    arrayRemove(entity.ids, id)
  }
}
