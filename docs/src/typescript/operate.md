# 操作符

## typeof

- 在`JavaScript`中用于获取一个值的类型，返回一个表示该值数据类型的字符串。

- 在`TypeScript`中功能得到扩展，能获取对象属性的类型、函数的类型以及实例的类型。

**基用法和技巧**

1. 获取对象、类的类型

```typescript
let obj = { name: 'John', age: 30 };
type ObjType = typeof obj; // { name: string, age: number }

class Person {
  name: string;
  age: number;
}
type PersonType = typeof Person; // { name: string, age: number }
```

2. 配合`ReturnType`获取函数的返回类型

```typescript
function getObject(a: string, b: number) {
  ...
  return {
    name: a,
    age: b
  }
}
type funcType = typeof getObject;
// (a: string, b: number) => { name: string; age:number;}
type ReturnTypeObj = ReturnType<funcType>; // { name: string, age: number }
```

3. 配合`keyof`获取枚举值的键

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
type ColorKeys = keyof typeof Color; // "Red" | "Green" | "Blue"
```

## keyof

> 获取一个类型的所有键（属性名）构成的联合类型

**基本用法和技巧**

1. 获取对象的键

```typescript
type Person = { name: string; age: number };
type PersonKeys = keyof Person; // "name" | "age"
```

2. 处理字符串和数字索引

```typescript
type Person = { [k: string]: boolean };
type PersonKeys = keyof Mapish; // string | number
```

3. 配合泛型，确保泛型参数类型安全

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const person: Person = { name: 'John', age: 30 };
const personName: string = getProperty(person, 'name');
const personAge: number = getProperty(person, 'age');
```

## Parameters

> 获取函数参数类型，并将这些类型组合成一个元组类型
>
> 不适用类 class，类 class 请看 ConstructorParameters

**基本用法和技巧**

1. 配合`typeof`获取函数的参数类型

```typescript
const test = (a: string, b: number, c: boolean) => {
  return { a, b, c };
};
type TestParams = Parameters<typeof test>;
// [a: string, b: number, c: boolean]
```

## ConstructorParameters

> 获取构造函数（类 class）的参数类型

**基本用法和技巧**

1. 配合`typeof`获取构造函数的参数类型

```typescript
class myClass {
  constructor(name: string, columns: string[]) {}
}
type FirstConstructorParameter = ConstructorParameters<typeof myClass>;
// [name: string, columns: string[]]
```

## ReturnType

> 获取函数的返回值类型
>
> 入参为“函数类型”，不是函数本身，而是函数类型

**基本用法和技巧**

1. 配合`typeof`获取函数的返回类型

```typescript
function getObject(a: string, b: number) {
  ...
  return {
    name: a,
    age: b
  }
}
type funcType = typeof getObject;
// (a: string, b: number) => { name: string; age:number;}
type ReturnTypeObj = ReturnType<funcType>; // { name: string, age: number }
```
