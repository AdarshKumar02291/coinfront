"use client";
import Image from "next/image";
import type { RootState } from "./global/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./global/features/counter/counterSlice";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const disptach = useDispatch();

  return <div>
    <button onClick={()=>disptach(increment())}>Increment</button>
    <button onClick={()=>disptach(decrement())}>Decrement</button>
    <div>{count}</div>
  </div>;
}
