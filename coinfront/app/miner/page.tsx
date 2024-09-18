"use client";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { RootState } from "../global/store";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword } from "../global/features/user/user";

export default function Page() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleUser(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    dispatch(setUsername(value));
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    dispatch(setPassword(value));
  }

  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:5000/miner/login", user);
      const token = res.data.token;
      const miner = res.data.user;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("miner", JSON.stringify(miner));

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="h-screen w-screen bg-[#FFE6C9] flex items-center justify-center">
      <div className="h-[400px] w-[320px] bg-white flex flex-col justify-between items-center px-8 py-8 rounded-md">
        <div className="text-[32px] font-bold">Login for Miner</div>
        <div className="w-full flex flex-col gap-y-4">
          <div className="w-full flex flex-col gap-y-1">
            <div className="text-[15px]">Username</div>
            <input
              type="text"
              placeholder="username"
              className="w-full h-[40px] border-[0.5px] border-[#DED2D9] rounded-md px-2"
              onChange={handleUser}
              value={user.userName}
            />
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <div className="text-[15px]">Password</div>
            <input
              type="password"
              placeholder="password"
              className="w-full h-[40px] border-[0.5px] border-[#DED2D9] rounded-md px-2"
              onChange={handlePassword}
              value={user.password}
            />
          </div>
          <div
            className="w-full bg-[#7F265B] flex items-center justify-center h-[50px] text-[18px] text-white rounded-xl mt-3"
            onClick={handleLogin}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}
