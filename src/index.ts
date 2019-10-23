import { Entity, Key, KeyType, Value, ValueType } from './type-helpers'

export { Entity }

/** */
export function createEntityFactory<T extends Value>() {
  return function createEntity<K extends Key<T>>(key: K) {
    return { key, ids: [], all: {} as any } as Entity<T, K>
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
  const exists = new Set(array)
  for (const value of values) {
    if (!exists.has(value)) {
      exists.add(value)
      array.push(value)
    }
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
 *
 * @example
 * clearEntity(people)
 */
export function clearEntity(entity: Entity) {
  for (const id of entity.ids) {
    delete entity.all[id]
  }
  entity.ids.length = 0
}

/**
 * Copies an entity with all its values.
 * The values themselves are not copied,
 * so they keep their referential equality.
 *
 * @param entity Entity to copy.
 *
 * @example
 * copyEntity(people)
 */
export function copyEntity<T>(entity: Entity<T>) {
  const copy = createEntityFactory<T>()(entity.key)
  for (const id of entity.ids) {
    copy.ids.push(id)
    copy.all[id] = entity.all[id]
  }
  return copy
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
  const exists = new Set(entity.ids)
  for (const value of values) {
    const id = value[entity.key]
    entity.all[id] = value
    if (!exists.has(id)) {
      exists.add(id)
      entity.ids.push(id)
    }
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
