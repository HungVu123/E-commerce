import React, { useEffect, useRef, useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import "./Chat.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addMsg, getAllMsg } from "../../../actions/messageAction";

import io from "socket.io-client";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatBody";

export default function Chat({ user }) {
  const socket = useRef();
  // const socket = io.connect("http://localhost:4000");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [chatId, setChatId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://res.cloudinary.com/dfusvbvhg/image/upload/v1684104676/avatars/dwgrl2fvkk8ko4oxcfxr.png"
  );

  const { messages } = useSelector((state) => state.getMessage);
  const { users } = useSelector((state) => state.allUsers);
  const [messageList, setMessageList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  console.log(messageList);
  console.log(messages);
  console.log(arrivalMessage);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [className, setClassName] = useState("");

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
    setMessageList(messages);
  };

  const handleSendMsg = async (msg) => {
    await socket.current.emit("send-msg", {
      to: chatId,
      from: user._id,
      msg,
    });

    const msgs = [...messages.projectedMessages];
    msgs.push({ fromSelf: true, message: msg });
    dispatch(addMsg(user._id, chatId, msg));
    dispatch(getAllMsg(user._id, chatId));
    setMessageList(msgs);
  };

  const handleClickId = (id, avatarUrl) => {
    setChatId(id);
    setAvatarUrl(avatarUrl);
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (user) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("add-user", user._id);
    }

    if (user.role !== "admin") {
      setClassName("col-xxl-12 col-lg-12 col-sm-12");
      setChatId("6431c4067a775988a3a15a1e");
    } else {
      setClassName("col-xxl-8 col-lg-8 col-sm-8");
    }

    dispatch(getAllMsg(user._id, chatId));
    // setIsOpen(false);
  }, [isAuthenticated, user, navigate, dispatch, location, chatId, socket]);

  useEffect(() => {
    socket.current.on("msg-recieve", (msg) => {
      setArrivalMessage((list) => [...list, msg]);
      // setArrivalMessage({ fromSelf: false, message: msg });
    });
  }, [messages.projectedMessages]);

  // useEffect(() => {
  //   arrivalMessage && setMessageList((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  return (
    <>
      <div
        class="theme-option"
        style={{ display: isAuthenticated ? "block" : "none" }}
      >
        <div class="setting-box">
          <button class="btn setting-button" onClick={toggleChatWindow}>
            <h5>
              Chat <IoChatbubblesOutline />
            </h5>
          </button>
          {isOpen && (
            <div className="chat-popup">
              <div>
                <div class="row">
                  <div
                    class="col-xxl-4 col-lg-4 col-sm-4"
                    style={{
                      display: user.role !== "admin" ? "none" : "",
                      paddingRight: "0",
                    }}
                  >
                    {users &&
                      users.map((user, index) => {
                        if (user.role === "user") {
                          return (
                            <li
                              class="pt-2 ps-2 border-bottom"
                              key={index}
                              style={{ width: "100%", cursor: "pointer" }}
                              onClick={() =>
                                handleClickId(user._id, user.avatar.url)
                              }
                            >
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src={user.avatar.url}
                                    alt="avatar"
                                    class="d-flex align-self-center"
                                    width="40"
                                    height="42.7"
                                    style={{ borderRadius: "100%" }}
                                  />
                                </div>
                                <div class="px-2 pt-1">
                                  <p class="fw-bold mb-0">{user.name}</p>
                                  <p class="small text-muted">Hello, Are you</p>
                                </div>
                                <div
                                  class="px-2 pt-1"
                                  style={{ marginLeft: "auto", order: "1" }}
                                >
                                  <p class="small text-muted mb-1">Just now</p>
                                  <span class="badge bg-danger rounded-pill float-end">
                                    3
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </div>
                  <div class={className} style={{ paddingLeft: "0" }}>
                    <div className="chat-header">
                      <h2>Chat {user.role === "admin" ? "" : "with Admin"}</h2>
                      <button onClick={toggleChatWindow}>
                        <AiOutlineClose />
                      </button>
                    </div>
                    <ChatBody
                      user={user}
                      messages={messages}
                      avatarUrl={avatarUrl}
                    />
                    <ChatInput handleSendMsg={handleSendMsg} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
