import React from "react";
//Component
// import Chat from "../components/Chat";
import ChatTest from "../components/ChatTest";
import { useSelector } from "react-redux";

function ChattingRoom() {
  const Bungle = useSelector( state => state.Bungle.postId );
  if (Bungle) {
    console.log("PostID ", Bungle);
  }

  return (
    <div>
      {/* <Chat /> */}
      <ChatTest Bungle={Bungle} />
    </div>
  );
}

export default ChattingRoom;
