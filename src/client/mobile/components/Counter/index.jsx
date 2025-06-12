import { increment } from "@common/store/modules/counterStore"
import { decrement } from "@common/store/modules/counterStore"
import { useDispatch } from "react-redux"

export default function Counter() {
    const dispath = useDispatch();
    return (
        <div>
            <button onClick={() => dispath(increment())}>+</button>
            <button onClick={() => dispath(decrement())}>-</button>
        </div>
    )
}
