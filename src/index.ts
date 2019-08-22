import { Entity, Key, KeyType, Value, ValueType } from './type-helpers'

export { Entity }

/** */
export function createEntityFactory<T extends Value>() {
  return function createEntity<K extends Key<T>>(key: K): Entity<T, K> {
    return { key, ids: [], all: {} } as any
  }
}

/**
 * Inserts values into an array,
 * skipping values that already exists.
 *
 * @param array Array to insert into.
 * @param values Values to insert.
 *
 * @example
 * const numbers = []
 * insertIntoArray(numbers, 1, 2, 3, 4, 5)
 * // numbers = [1, 2, 3, 4, 5]
 */
export function insertIntoArray<T>(array: T[], ...values: T[]) {
  for (const value of values) {
    const index = array.indexOf(value)
    index < 0 && array.push(value)
  }
}

/**
 * Removes values from an array.
 *
 * @param array Array to remove from.
 * @param values Values to remove.
 *
 * @example
 * const numbers = [0, 1, 2, 3, 4, 5]
 * removeFromArray(numbers, 0, 2, 4)
 * // numbers = [1, 3, 5]
 */
export function removeFromArray<T>(array: T[], ...values: T[]) {
  for (const value of values) {
    const index = array.indexOf(value)
    index < 0 || array.splice(index, 1)
  }
}

/**
 * Removes all values from an entity.
 * Does not remove the key value.
 *
 * @param entity Entity to clear.
 */
export function clearEntity<E extends Entity>(entity: E) {
  for (const id of entity.ids) {
    delete entity.all[id]
  }
  entity.ids.length = 0
}

/**
 * Inserts values into an entity.
 *
 * @param entity Entity to insert into.
 * @param values Values to insert.
 *
 * @example
 * insertIntoEntity(people, matt, sam, liam)
 */
export function insertIntoEntity<E extends Entity>(entity: E, ...values: ValueType<E>[]) {
  for (const value of values) {
    const id = value[entity.key]
    entity.all[id] = value
    insertIntoArray(entity.ids, id)
  }
}

/**
 * Removes values from an entity.
 *
 * @param entity Entity to remove from.
 * @param values Values to remove.
 *
 * @example
 * removeFromEntity(people, matt, sam, liam)
 */
export function removeFromEntity<E extends Entity>(entity: E, ...values: ValueType<E>[]) {
  for (const value of values) {
    const id = value[entity.key]
    delete entity.all[id]
    removeFromArray(entity.ids, id)
  }
}

/**
 * Removes values from an entity by matching IDs.
 *
 * @param entity Entity to remove from.
 * @param ids IDs to match.
 *
 * @example
 * removeFromEntityById(people, 0, 2, 6)
 */
export function removeFromEntityById<E extends Entity>(entity: E, ...ids: KeyType<E>[]) {
  for (const id of ids) {
    delete entity.all[id]
    removeFromArray(entity.ids, id)
  }
}
