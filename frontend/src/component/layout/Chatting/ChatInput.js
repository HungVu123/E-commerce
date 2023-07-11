import React, { useState } from "react";
import { FaSmile } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <form className="chat-footer" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <FiPaperclip style={{ color: "#757575", fontSize: "20px" }} />
        <FaSmile style={{ color: "#757575", fontSize: "20px" }} />
        <button
          type="submit"
          style={{
            border: "none",
            backgroundColor: "#f6f7f9",
            display: msg.length > 0 ? "" : "none",
          }}
        >
          <IoMdSend style={{ color: "#1877f2", fontSize: "25px" }} />
        </button>
      </form>
    </>
  );
}
