//! WITH OPTIMISM
import ChatBubles from "./components/ChatBubles";
import { useOptimistic, useRef, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import TopPosts from "./components/TopPosts";

function OptimisticApp() {
  const formRef = useRef();
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      { title: newMessage, sending: true, isError: false },
    ]
  );

  async function sendMessage(title) {
    const response = await fetch("http://localhost:3002/api/posts", {
      method: "post",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const isCreated = await response.json();

    if (isCreated.error)
      return setMessages([...messages, { title, isError: true }]);

    setMessages([...messages, { title }]);
  }

  async function getMessage() {
    const response = await fetch("http://localhost:3002/api/posts");
    const { posts } = await response.json();
    setMessages(posts.data);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function formAction(formData) {
    const message = formData.get("message");
    addOptimisticMessage(message);
    formRef.current.reset();
    await sendMessage(message);
  }

  useEffect(() => {
    getMessage();
  }, []);

  const HandleSubmit = () => {
    const { pending } = useFormStatus()
    
    return (
      <button
        disabled={pending}
        onClick={() =>
          setTimeout(
            () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
            10
          )
        }
        type="submit"
        className={styles.button}
      >
        {pending ? "Loading..." : "Kirim Pesan"}
      </button>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className="max-w-sm w-full px-4 mb-8">
        <h3 className="text-center">Top 3 Messages</h3>
        <hr/>
        <TopPosts />
      </div>
      <ChatBubles messages={optimisticMessages} scrollRef={scrollRef} />
      <form ref={formRef} action={formAction} className={styles.form}>
        <input
          name="message"
          type="text"
          placeholder="..."
          className={styles.input}
          onFocus={() =>
            scrollRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <HandleSubmit />
      </form>
    </div>
  );
}

const styles = {
  wrapper: `min-h-screen flex flex-col justify-center items-center`,
  form: `flex flex-col gap-4 w-full max-w-sm`,
  input: `px-8 py-3 rounded-md border-gray-200 shadow-sm sm:text-sm mt-8`,
  button: `inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 disabled:bg-slate-400/50 disabled:scale-100`,
};

export default OptimisticApp;
