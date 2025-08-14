import { useKeyboardControls } from "@react-three/drei";
import useGame from "../../stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const forward = useKeyboardControls((state) => state.moveForward);
  const backward = useKeyboardControls((state) => state.moveBackward);
  const left = useKeyboardControls((state) => state.moveLeft);
  const right = useKeyboardControls((state) => state.moveRight);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const time = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      addEffect(() => {
        const state = useGame.getState();
        let elapsedTime = 0;
        if (state.phase === "playing") {
          elapsedTime = Date.now() - state.startTime;
        } else if (state.phase === "ended") {
          elapsedTime = state.endTime - state.startTime;
        }
        elapsedTime /= 1000;

        if (time.current) {
          time.current.textContent = elapsedTime.toFixed(2);
        }
      });
    };
  }, []);

  return (
    <div className="interface">
      {/* time */}
      <div ref={time} className="time">
        0.00
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="row">
          <div className={`key key-top ${forward ? "active" : ""}`}></div>
        </div>
        <div className="row">
          <div className={`key key-left ${left ? "active" : ""}`}></div>
          <div className={`key key-down ${backward ? "active" : ""}`}></div>
          <div className={`key key-right ${right ? "active" : ""}`}></div>
        </div>
        <div className="row">
          <div className={`key key-space ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
