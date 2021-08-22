import { useState } from "react";
import { useRecoilState } from "recoil";
import { tweetsAtom } from "../context/atoms";
import { labelTweet } from "../utils/api";
import { removeItemAtIndex } from "../utils/arrayCrud";
import CloseIcon from "./CloseIcon";
import WordsCard from "./WordsCard";

function WrapperCard({ item }) {
  const [clicked, setClicked] = useState(false);
  const [{ chunk: tweets, chunckIndifier }, setTweets] =
    useRecoilState(tweetsAtom);

  const index = tweets.findIndex((tweet) => tweet === item);

  function handleDeleteTweet(label) {
    const newList = removeItemAtIndex(tweets, index);
    setTweets({ chunk: newList, chunckIndifier });
  }

  function onPolarity(label) {
    const labeledTweet = { ...item, polarity: label };
    labelTweet({ tweet: labeledTweet, chunckIndifier });
  }

  return (
    <>
      <p className="close-icon" onClick={handleDeleteTweet}>
        <CloseIcon />
      </p>
      {clicked ? (
        <WordsCard item={item} />
      ) : (
        <p className="tweet-text">{item.text}</p>
      )}
      <div className="btns">
        <button
          style={{
            display: `${clicked ? "none" : "inline"}`,
          }}
          onClick={(e) => {
            onPolarity(e.target.innerText.toLowerCase());
            setClicked(true);
          }}
          className="pos-btn"
        >
          Positive
        </button>
        <button
          style={{
            display: `${clicked ? "none" : "inline"}`,
          }}
          onClick={(e) => {
            onPolarity(e.target.innerText.toLowerCase());
            setClicked(true);
          }}
          className="neu-btn"
        >
          Neutral
        </button>
        <button
          style={{
            display: `${clicked ? "none" : "inline"}`,
          }}
          onClick={(e) => {
            onPolarity(e.target.innerText.toLowerCase());
            setClicked(true);
          }}
          className="neg-btn"
        >
          Negative
        </button>
      </div>
    </>
  );
}

export default WrapperCard;
