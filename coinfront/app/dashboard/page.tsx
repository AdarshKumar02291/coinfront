"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import type { RootState } from "../global/store";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [socket, setSocket] = useState<any>();
  const user = useSelector((state: RootState) => state.user);
  const count = useSelector((state: RootState) => state.counter.value);
  console.log(user)

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user.userName]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/miner");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("miner"); // Remove token from localStorage
    router.push("/miner"); // Redirect to login page
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        This page is protected and can only be accessed by logged-in users.
        {user.userName}
        {count}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
