import { use, cache, Suspense } from "react";

const fetcher = cache(async () => {
  const r = await fetch("http://localhost:3002/api/posts/top");
  const { posts } = await r.json();
  return posts.data;
});

const MessageList = () => {
  const messages = use(fetcher());
  return messages?.map((m, i) => {
    return (
      <div key={i}>
        <p>{i+1}. {m.title}</p>
      </div>
    );
  });
};

const TopThreeMessage = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <MessageList />
    </Suspense>
  );
};

export default TopThreeMessage;
