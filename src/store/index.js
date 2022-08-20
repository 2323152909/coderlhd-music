import create from 'zustand'
import { subscribeWithSelector, devtools, persist } from 'zustand/middleware'

import * as models from './modules/index'

// 获取到所有的module模块，并过滤掉没有namespace命名空间的module，放入数组中等待处理
const MODULE_LIST = Object.keys(models)
  .map((moduleName) => models[moduleName])
  .filter((module) => module.namespace)

export const useSelector = create(
  devtools(
    persist(
      subscribeWithSelector((set, get) => {
        const { state, actions } = MODULE_LIST.reduce(
          (pre, cur) => {
            // 存储当前module模块的action函数
            const newActions = {}

            Object.keys(cur.actions).forEach((actionName) => {
              newActions[`${cur.namespace}/${actionName}`] =
                cur.actions[actionName]
            })

            return {
              ...pre,
              state: {
                ...pre.state,
                [cur.namespace]: { ...cur.state }
              },
              actions: {
                ...pre.actions,
                ...newProcessor
              }
            }
          },
          {
            state: {},
            actions: {}
          }
        )

        const dispatchFunc = async ({ type, payload, callback }) => {
          // 判断是否存在该action
          if (actions[type]) {
            const namespace = type.split('/')[0]

            await actions[type](
              { payload, callback },
              {
                setState: (newState = {}) => {
                  const curState = get()

                  set({
                    [namespace]: {
                      ...curState[namespace],
                      ...newState
                    }
                  })
                },
                select: (selectFunc) => {
                  const curState = get()

                  if (typeof selectFunc !== 'function') {
                    return curState[namespace]
                  }

                  return selectFunc(curState[namespace], curState)
                }
              }
            )
          }
        }

        return {
          ...state,
          dispatch: dispatchFunc
        }
      }),
      {
        name: 'globalStore'
      }
    )
  )
)

export const useDispatch = () => {
  const dispatch = useSelector((store) => store.dispatch)

  return dispatch
}

export const { getState, setState, subscribe, destroy } = useSelector
