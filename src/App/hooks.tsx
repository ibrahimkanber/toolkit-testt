import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreator, bindActionCreators } from 'redux'

export function useActions<A extends Array<ActionCreator<any> | ActionCreatorWithoutPayload>>(actions: A): A {
  const dispatch = useDispatch()
  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => bindActionCreators(a, dispatch)) as A
    }
    return bindActionCreators(actions, dispatch)
  }, [actions, dispatch])
}

