/**
 * immer好处
 * 1、方便做diff，避免做无意义的渲染
 * 2、只拷贝变动的节点，其余部分保持引用不变（结构共享）
 * 3、不会意外地“改坏”原始数据
 * 4、创建新结构，属于V8底层快对象，性能更好
 * **/
import { useCallback, useState } from 'react';
import { Draft, freeze, produce } from 'immer';

// ts学到这样就够用了
// 这里的Draft<S> 是immer库中的类型，表示一个Draft对象，Draft对象是immer库中的一个概念，表示一个临时的、可变的状态，用于在函数中修改状态
export type DraftFucion<S> = (draf: Draft<S>) => void;
// Updater<S> 函数签名 接受一个参数arg 类型是S 或者是DraftFucion<S> 返回viod
export type Updater<S> = (arg: S | DraftFucion<S>) => void;
// 返回一个元祖类型 ImmerHook<S>包含两个元素
export type ImmerHook<S> = [S, Updater<S>];
// 函数签名 接受initialValue参数  类型S 或者() => S 返回[state, setSteate]
export function useImmer<S = unknown>(initialValue: S | (() => S)): ImmerHook<S>;

export function useImmer<T>(initialValue: T) {
  const [val, updateValue] = useState(
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue, true),
  );
  
  return [
    val, 
    useCallback((updater: T | DraftFucion<T>) => {
      if (typeof updater === 'function') {
        updateValue(produce(updater as DraftFucion<T>));
      } else {
        updateValue(freeze(updater))
      }
    }, [])
  ]
}
