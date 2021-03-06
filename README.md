# flux-entity

Utility library for the flux entity pattern

[![CircleCI](https://img.shields.io/circleci/build/github/Glinkis/flux-entity?style=flat-square)](https://circleci.com/gh/Glinkis/flux-entity)
[![npm version](https://img.shields.io/npm/v/flux-entity.svg?style=flat-square)](https://www.npmjs.com/package/flux-entity)
[![npm downloads](https://img.shields.io/npm/dw/flux-entity.svg?style=flat-square)](https://www.npmjs.com/package/flux-entity)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

## Motivation

A common pattern when working with a flux-based system such as [Redux](https://redux.js.org) is to use a normalized registry of objects, keyed by some unique value.

## Installation

With npm

```shell
npm install --save flux-entity
```

With yarn

```shell
yarn add flux-entity
```

## API

```typescript
// Returns a function for creating entities
createEntityFactory()

// Inserts values into an array
insertIntoArray(array, ...values)

// Removes values from an array
removeFromArray(array, ...values)

// Removes all values from an entity
clearEntity(entity)

// Returns a copy of the entity with all values
copyEntity(entity)

// Inserts values into an entity
insertIntoEntity(entity, ...values)

// Removes values from an entity
removeFromEntity(entity, ...values)

// Removes values from an entity by their id
removeFromEntityById(entity, ...ids)
```

## Examples

Say we have an object type `Person`.

```typescript
interface Person {
  id: number
  name: string
}
```

Create an entity factory for type `Person`. By supplying `Person`, we can get excellent type safety with Typescript.

```typescript
const createEntity = createEntityFactory<Person>()
```

Create an entity, keyed by `id`. This will now mean that each `Person` is indexed with their `id` as the uniqueness qualifier.

```typescript
const entity = createEntity('id')
```

We now have an empty entity.

```typescript
{
  key: 'id', // Unique key
  ids: [], // Ordered array of all ids
  all: {}, // Dictionary with all objects
}
```

Insert a value into the entity.

```typescript
insertIntoEntity(entity, {
  id: 0,
  name: 'Jane',
})
```

The resulting entity state now looks like this.

```typescript
{
  key: 'id',
  ids: [0],
  all: {
    0: {
      id: 0,
      name: 'Jane',
    },
  },
}
```
