export * from './data'
export * from './manual'

/**
 * @description 2
 * @description 希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。
 * @param a
 * @param b
 */
function f(a: string, b: string): string
function f(a: number, b: number): number
function f(a: string | number, b: string | number): string | number {
  if (typeof a === 'string') {
    return a + ':' + b
  } else {
    return (a as number) + (b as number)
  }
}

/*
f(1, 2)
f('1', 2)
f(1, '2')
f('1', '2')
*/

/**
 * @description 3
 * @description 如何定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的？对应的使用示例如下所示：
 type Foo = {
      a: number;
      b?: string;
      c: boolean;
  }

  // 测试用例
  type SomeOptional = SetOptional<Foo, 'a' | 'b'>
  // type SomeOptional = {
  // 	a?: number; // 该属性已变成可选的
  // 	b?: string; // 保持不变
  // 	c: boolean; 
  // }
 */
type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type SetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * @description 4
 * @description 定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型
    interface Example {
      a: string;
      b: string | number;
      c: () => void;
      d: {};
    }

    // 测试用例：
    type StringKeysOnly = ConditionalPick<Example, string>;
    //=> {a: string}
 */
type ConditionalPick<T, K> = {
  [P in keyof T as T[P] extends K ? P : never]: T[P]
}

// 待推断的类型变量 infer
/**
 * @description 5
 * @description 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数。具体的使用示例如下所示：
    type Fn = (a: number, b: string) => number
    type AppendArgument<F, A> = // 你的实现代码

    type FinalFn = AppendArgument<Fn, boolean> 
    // (x: boolean, a: number, b: string) => number
 */
type AppendArgument<F extends (...args: any) => any, A> = (x: A, ...args: Parameters<F>) => ReturnType<F>

/*
 * @description 6 使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值：
 * TestCase:
 * type EmptyObject = {};
 * const emptyObject: EmptyObject = {}; // 可以正常赋值
 * const emptyObject2: EmptyObject = {a: 1}; // 报错，类型 '{ a: number; }' 不能赋值给类型 'EmptyObject'
 */

type EmptyObject = { [P in PropertyKey]: never }
const emptyObject: EmptyObject = {}
// const emptyObject1: EmptyObject = {a:'1'}

/*
 * @description 7
 * @description 定义一个 NonEmptyArray 类型，使得该类型只允许非空数组赋值：
 * TestCase:
 * const a: NonEmptyArray<string> = [] // 将出现编译错误
 * const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
 */
type NonEmptyArray1<T> = { [P in number]: T } & { 0: T }
const nonEmptyArray: NonEmptyArray1<string> = ['Hello TS']

/*
 * @description 8
 * @description 实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理
 * TestCase:
 * Trim<' hello '> = 'hello'
 */
type TrimLeft<V extends string> = V extends ` ${infer U}` ? TrimLeft<U> : V
type TrimRight<V extends string> = V extends `${infer U} ` ? TrimRight<U> : V
type Trim<V extends string> = TrimLeft<TrimRight<V>>
