import React from "react";

const ChatBubles = ({ messages, scrollRef }) => {
  return (
    <div className={styles.wrapper}>
      {messages
        ?.sort((x, y) => x.id - y.id)
        .map((message, i) => {
          if (message.isError) return <i key={i}>{message.title} (failed to send this message)</i>
          return (
            <p className={styles.p} key={i} ref={scrollRef}>
              {message.title}
              {message.sending ? (
                <span> sending ⏰</span>
              ) : (
                <span> send ✅</span>
              )}
            </p>
          );
        })}
    </div>
  );
};

const styles = {
  wrapper: "flex flex-col space-y-2 pb-4 max-w-sm w-full h-52 overflow-y-scroll focus:scroll-auto",
  p: "block flex gap-4 h-full rounded-lg py-1 text-end px-4 hover:border-pink-600",
  i: "text-white",
};

export default ChatBubles;
