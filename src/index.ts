export interface Entity<T> {
  readonly all: Record<string, T>
  readonly ids: Array<string>
}
