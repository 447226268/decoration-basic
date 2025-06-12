import { createSlice } from "@reduxjs/toolkit";

const metaStore = createSlice({
    name: "meta",
    // 初始化state
    initialState: {
        layout: {
            page: {
                header: [],
                body: [],
                footer: {}
            }
        },
        config: {
            attr: ''
        },
        footer: {},
    },
    // 修改状态的方法，支持直接修改
    reducers: {
        init: (state, action) => {
            state.meta = action.payload;
        },
    }
});
// 解构actionCreater函数
const { init } = metaStore.actions;
//按需导出的方式导出actionCreater
export {
    init,
}
//默认导出reducer
export default metaStore.reducer;
