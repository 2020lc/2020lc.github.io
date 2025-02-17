# React

## useMemo

> useMemo 是 React 中的一个 Hook，用于对计算结果进行记忆，以避免不必要的重复计算。

```typescript
import React, { useMemo } from 'react';

const ExpensiveComponent = ({ a, b }) => {
  const result = useMemo(() => {
    console.log('Calculating result...');
    return a * b;
  }, [a, b]);

  return <div>Result: {result}</div>;
};

const MyComponent = () => {
  const [num1, setNum1] = React.useState(5);
  const [num2, setNum2] = React.useState(10);

  return (
    <div>
      <input value={num1} onChange={e => setNum1(Number(e.target.value))} />
      <input value={num2} onChange={e => setNum2(Number(e.target.value))} />
      <ExpensiveComponent a={num1} b={num2} />
    </div>
  );
};
```
