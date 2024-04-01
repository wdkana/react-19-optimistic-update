//! NO OPTIMISM
import ChatBubles from "./components/ChatBubles";
import { useRef, useState, useEffect } from "react";

function App() {
  const formRef = useRef();
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);

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
    formRef.current.reset();
    await sendMessage(message);
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ChatBubles messages={messages} scrollRef={scrollRef} />
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
        <button
          onClick={() =>
            setTimeout(
              () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
              10
            )
          }
          type="submit"
          className={styles.button}
        >
          kirim pesan
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: `min-h-screen flex flex-col justify-center items-center`,
  form: `flex flex-col gap-4 w-full max-w-sm`,
  input: `px-8 py-3 rounded-md border-gray-200 shadow-sm sm:text-sm mt-8`,
  button: `inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500`,
};

export default App;
