import { useEffect, useState } from "react";

import { useSocket } from "./utils";
import { CreateOrJoinRoom, Gameplay } from "./components";

export default function App() {
  const { socket, isConnected } = useSocket();
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    if (socket) socket.connect();

    return () => socket && socket.disconnect();
  }, [socket]);

  if (!isConnected) {
    return (
      <div className="h-screen w-screen absolute inset-0 bg-primary/10 bg-opacity-20 grid place-items-center">
        <span className="loading loading-ring loading-lg bg-primary"></span>
      </div>
    );
  }

  if (!roomId) return <CreateOrJoinRoom onRoomJoined={setRoomId} />;

  return <Gameplay roomId={roomId} />;
}
