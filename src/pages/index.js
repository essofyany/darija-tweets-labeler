import { useEffect, useState } from "react";

function HomePage() {
  const [state, setstate] = useState([]);
  const [currentChunk, setCurrentChunk] = useState([]);

  async function labelTweet(data) {
    try {
      await fetch("/api/server", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error("something went wrong!!!!!");
    }
  }

  async function fetchTweets() {
    try {
      const res = await fetch("/api/server");
      const { chunk, chunckIndifier } = await res.json();
      console.log(chunk, chunckIndifier);
      setstate(chunk);
      setCurrentChunk(chunckIndifier);
    } catch (error) {
      throw new Error("something went wrong!!!!!");
    }
  }

  useEffect(() => {
    fetchTweets();
    // labelTweet();
  }, []);

  return (
    <>
      <section>
        <h1>Home Page</h1>
        <div className="container">
          <ul className="tweet-list">
            {state.length > 0 &&
              state.map((item) => (
                <li
                  className="tweet-item"
                  onClick={() =>
                    labelTweet({ tweet: item, chunckIndifier: currentChunk })
                  }
                  key={item._id}
                >
                  <p>{item.text}</p>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <style jsx>
        {`
          section {
            width: 100vw;
            min-height: 100vh;
          }
          .container {
            max-width: 80%;
            margin: 0 auto;
          }
          .tweet-list {
            max-width: 80%;
            list-style: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .tweet-item {
            display: flex;
            flex-direction: row-reverse;
            width: 100%;
            padding: 10px;
            border-bottom: 1px solid #222;
          }
        `}
      </style>
    </>
  );
}

export default HomePage;
