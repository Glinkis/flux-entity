export interface Entity<T> {
  readonly all: Record<string, T>
  readonly ids: Array<string>
}

export function createEntity<T>(): Entity<T> {
  return {
    all: {},
    ids: []
  }
}
