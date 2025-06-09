// 在React组件中使用store中的数据，需要用到一个钩子函数：useSelector，他的作用是从store中获取数据
import { useSelector } from "react-redux"
// 在React组件中修改store中的数据，需要用到一个钩子函数：useDispatch，他的作用是从store中获取dispatch函数
import { Counter } from "@mobile/components"

export default function Home() {
    const { count } = useSelector(state => state.counter)
    const { meta } = useSelector(state => state.meta)
    return (
        <>
            <div>{count}</div>
            <div>{JSON.stringify(meta)}</div>
            <Counter />
        </>
    )
}