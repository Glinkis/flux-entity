export interface Entity<T extends Value = any, K extends Key<T> = Key<T>> {
  readonly all: Record<T[K], T>
  readonly ids: T[K][]
  readonly key: K
}

export type Key<T> = { [K in keyof T]: T[K] extends PropertyKey ? K : never }[keyof T]

export type EntityKey<E> = E extends Entity<infer T, infer K> ? T[K] : never

export type Value = Record<PropertyKey, any>

export type ValueType<E> = E extends Entity<infer T> ? T : never
