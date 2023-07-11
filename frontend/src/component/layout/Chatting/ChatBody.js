import React, { useEffect, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ChatBody({ user, messages, avatarUrl }) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {user.role === "admin" && messages.projectedMessages?.length === 0 ? (
        <div
          className="chat-body"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="../assets/images/vendor-page/logo.png"
            style={{
              width: "5em",
            }}
            alt=""
          />
          <h5>
            Welcome, <span>{user.name}!</span>
          </h5>
          <h6>Please select a chat to start messaging.</h6>
        </div>
      ) : (
        <div className="chat-body">
          {messages.projectedMessages === 0 ? (
            <div className="message-sender">
              <div className="message">
                <img
                  src="https://res.cloudinary.com/dfusvbvhg/image/upload/v1684104676/avatars/dwgrl2fvkk8ko4oxcfxr.png"
                  alt="avatar 1"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                    border: "1px solid rgb(0 0 0)",
                  }}
                />
              </div>
              <div className="chatbox-sender">
                <div
                  className="message-content-sender"
                  data-mdb-toggle="tooltip"
                  title="12:00"
                >
                  Hi! How Can I Help You ??
                </div>
              </div>
            </div>
          ) : (
            <>
              <ScrollToBottom>
                {messages.projectedMessages?.map((message, index) => {
                  return (
                    <div
                      className={`message-${
                        message.fromSelf ? "recived" : "sender"
                      }`}
                      key={index}
                      ref={scrollRef}
                    >
                      <div className="message">
                        <img
                          src={message.fromSelf ? user.avatar.url : avatarUrl}
                          alt="avatar 1"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                            border: "1px solid rgb(0 0 0)",
                          }}
                        />
                      </div>
                      <div
                        className={`chatbox-${
                          message.fromSelf ? "recived" : "sender"
                        }`}
                      >
                        <div
                          className={`message-content-${
                            message.fromSelf ? "recived" : "sender"
                          }`}
                        >
                          {message.message}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </>
          )}
        </div>
      )}
    </>
  );
}
