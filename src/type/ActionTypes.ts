import store from '../store'

// 定義 RootState 類型
export type ActionTypes = ReturnType<typeof store.getState>;