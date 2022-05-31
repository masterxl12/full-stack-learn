// Partial Pick Required
type _Partial<T> = {
  [P in keyof T]?: T[P]
}

type _Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type _Required<T> = {
  [P in keyof T]-?: T[P]
}

// never Exclude Extract Omit
type _Exclude<T, U> = T extends U ? never : T
type _Extract<T, U> = T extends U ? T : never
export type _Omit<T, K extends any> = _Pick<T, _Exclude<keyof T, K>>

// infer 表示在 extends 条件语句中待推断的类型变量 -> 用于提取函数类型的返回值类型/参数类型：
/**
 * @link https://juejin.cn/post/6844903796997357582
    在这个条件语句 T extends (param: infer P) => any ? P : T 中，infer P 表示待推断的函数参数。
    整句表示为：如果 T 能赋值给 (param: infer P) => any，则结果是 (param: infer P) => any 类型中的参数 P，否则返回为 T。
 */
// 提取函数类型中的参数类型
type ParamType<T> = T extends (param: infer P) => any ? P : T
interface User {
  name: string
  age: number
}

type Func = (user: User) => void

type Param = ParamType<Func> // Param = User
type AA = ParamType<string> // string

// 提取函数类型中的返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any

export {}
