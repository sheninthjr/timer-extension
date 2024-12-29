import { useCallback, useEffect, useMemo, useState } from "react";

interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
}
export default function App() {
  const [time, setTime] = useState<TimeState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [state, setState] = useState<boolean>(false);

  const calculateTime = useCallback((prev: TimeState): TimeState => {
    const newSeconds = prev.seconds + 1;
    const newMinutes = prev.minutes + Math.floor(newSeconds / 60);
    const newHours = prev.hours + Math.floor(newMinutes / 60);
    return {
      hours: newHours % 24,
      minutes: newMinutes % 60,
      seconds: newSeconds % 60,
    };
  }, []);

  useEffect(() => {
    let interval = 0;
    if (state) {
      interval = setInterval(() => {
        setTime(calculateTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  const format = useCallback((n: number): string => {
    return n.toString().padStart(2, "0");
  }, []);

  const formatTime = useMemo(
    () => ({
      hours: format(time.hours),
      minutes: format(time.minutes),
      seconds: format(time.seconds),
    }),
    [time, format]
  );

  const handleStart = () => {
    setState(true);
  };

  const handleReset = () => {
    setState(false);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const TimerDisplay = useMemo(
    () => (
      <div className="flex gap-2 items-center">
        <div className="bg-neutral-600 px-2 rounded-xl py-2 font-extrabold text-xl">
          {formatTime.hours}
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="bg-neutral-600 px-2 rounded-xl py-2 font-extrabold text-xl">
          {formatTime.minutes}
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="bg-neutral-600 px-2 rounded-xl py-2 font-extrabold text-xl">
          {formatTime.seconds}
        </div>
      </div>
    ),
    [formatTime]
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white/10 shadow-neutral-800 shadow-lg flex flex-col justify-evenly items-center border border-slate-700 backdrop:blur-lg w-72 rounded-lg h-40">
        {TimerDisplay}
        <div className="flex gap-4">
          {!state && (
            <button
              className="bg-green-700 px-2 py-1 font-mono font-bold rounded-xl"
              onClick={handleStart}
            >
              START
            </button>
          )}
          {state && (
            <button
              className="bg-red-700 px-2 py-1 font-bold font-mono rounded-xl"
              onClick={() => setState(false)}
            >
              STOP
            </button>
          )}
          <button
            className="bg-blue-700 px-2 py-1 font-mono font-bold rounded-xl"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
