import { useEffect, useState, useReducer } from "react";
import CloseIcon from "../components/CloseIcon";
import WordsCard from "../components/WordsCard";

function HomePage() {
  const [state, dispatch] = useReducer(reducer, { toSubmit: false });
  const [tweets, setTweets] = useState([]);
  const [currentChunk, setCurrentChunk] = useState([]);

  function handleDeleteTweet(id) {
    const newTweets = tweets.filter((tweet) => tweet._id !== id);
    setTweets(newTweets);
  }

  async function labelTweet(data) {
    try {
      await fetch("/api/server", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log("tweet is labeled successfully");
    } catch (error) {
      throw new Error("something went wrong!!!!!");
    }
  }

  async function fetchTweets() {
    try {
      const res = await fetch("/api/server");
      const { chunk, chunckIndifier } = await res.json();
      // console.log(chunk, chunckIndifier);
      setTweets(chunk);
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
      <section className="app">
        <h1>Home Page</h1>
        <div className="container">
          <ul className="tweet-list">
            {tweets.length > 0 &&
              tweets.map((item) => (
                <li className="tweet-item" key={item._id}>
                  <p
                    className="close-icon"
                    onClick={() => handleDeleteTweet(item._id)}
                  >
                    <CloseIcon />
                  </p>
                  {state.toSubmit ? (
                    <WordsCard text={item.text} />
                  ) : (
                    <p className="tweet-text">{item.text}</p>
                  )}
                  <div className="btns">
                    <button
                      style={{
                        display: `${state.toSubmit ? "none" : "inline"}`,
                      }}
                      onClick={() => dispatch({ type: "toSubmit" })}
                      className="pos-btn"
                    >
                      Positive
                    </button>
                    <button
                      style={{
                        display: `${state.toSubmit ? "none" : "inline"}`,
                      }}
                      onClick={() => dispatch({ type: "toSubmit" })}
                      className="neu-btn"
                    >
                      Neutral
                    </button>
                    <button
                      style={{
                        display: `${state.toSubmit ? "none" : "inline"}`,
                      }}
                      onClick={() => dispatch({ type: "toSubmit" })}
                      className="neg-btn"
                    >
                      Negative
                    </button>
                    <button
                      style={{
                        display: `${state.toSubmit ? "inline" : "none"}`,
                      }}
                      onClick={() => {}}
                      className="submit-btn"
                    >
                      Submit
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "toSubmit":
      return { toSubmit: true };
    default:
      throw new Error();
  }
}

export default HomePage;
