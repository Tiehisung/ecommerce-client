import { useEffect, useState } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState("t");
  useEffect(() => {
    let interval = setInterval(() => {
      let date = Date().toString().split("(");
      setCurrentTime(date[0]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center w-full border rounded-full h-20 min-w-20 text-sm p-8 bg-black text-white">
      <h1> {currentTime}</h1>
    </div>
  );
}
