import store from '../store'
// 定義 RootState 類型
//沒有用到這個方式
export type ActionTypes = ReturnType<typeof store.getState>;