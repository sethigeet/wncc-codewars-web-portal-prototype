import { useEffect, useState } from "react";
import { useSocket } from "../utils";

export function CreateOrJoinRoom({ onRoomJoined }) {
  const { socket } = useSocket();
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("room joined", (roomId) => onRoomJoined(roomId));
    return () => {
      socket.off("room joined");
    };
  }, [socket, onRoomJoined]);

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div>
        <h1 className="text-3xl font-bold mx-auto border-b-2 border-b-primary/20">
          Create or Join a Room
        </h1>

        <div className="mt-10">
          <input
            type="text"
            placeholder="Room ID to Join"
            className="input input-bordered w-full max-w-xs"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />

          <div className="flex mt-4 w-full gap-2 items-center justify-center">
            <button
              className="btn btn-primary"
              disabled={roomId === ""}
              onClick={() => socket.emit("join room", roomId)}
            >
              Join Room
            </button>
          </div>
        </div>
        <div className="divider">OR</div>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="btn btn-primary"
            onClick={() => socket.emit("create room")}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
