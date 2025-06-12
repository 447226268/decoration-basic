import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: "counter",
    // 初始化state
    initialState: {
        count: 0
    },
    // 修改状态的方法，支持直接修改
    reducers: {
        increment: (state) => {
            state.count++;
        },
        decrement: (state) => {
            state.count--;
        }
    }
});
// 解构actionCreater函数
const { increment, decrement } = counterStore.actions;
//获取reducer
const reducer = counterStore.reducer;
//按需导出的方式导出actionCreater
export { increment, decrement }
//默认导出reducer
export default reducer;