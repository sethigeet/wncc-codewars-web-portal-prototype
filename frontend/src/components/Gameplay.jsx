import { useEffect, useMemo, useState } from "react";

import { useSocket } from "../utils";
import { SelectMove } from "./SelectMove";

export function Gameplay({ roomId }) {
  const { socket } = useSocket();
  const [moveSent, setMoveSent] = useState(false);
  const [selectedMove, setSelectedMove] = useState("rock");
  const [results, setResults] = useState(null);

  const opponentMove = useMemo(() => {
    if (results === null) return null;

    const oppMove = results.filter((res) => res !== selectedMove);
    if (oppMove.length === 0) return selectedMove;
    return oppMove[0];
  }, [results, selectedMove]);

  useEffect(() => {
    socket.on("game over", (res) => setResults(res));

    return () => {
      socket.off("game over");
    };
  });

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <div className="bg-primary p-4">
        <h1 className="text-3xl font-semibold text-primary-content text-center">
          Room: {roomId}
        </h1>
      </div>
      <div className="flex flex-grow py-4">
        <div className="flex-1 grid place-items-center">
          {!moveSent && (
            <SelectMove
              sendMove={(move) => {
                setSelectedMove(move);
                setMoveSent(true);
                socket.emit("play move", move);
              }}
            />
          )}
          {moveSent && (
            <h3 className="font-medium text-xl">
              You selected: {selectedMove}
            </h3>
          )}
        </div>
        <div className="divider divider-horizontal divider-primary text-xl font-semibold">
          v/s
        </div>
        <div className="flex-1 grid place-items-center">
          <h3 className="font-medium text-xl">
            {results === null
              ? "Waiting for opponent..."
              : `Opponent selected: ${opponentMove}`}
          </h3>
        </div>
      </div>
    </div>
  );
}
