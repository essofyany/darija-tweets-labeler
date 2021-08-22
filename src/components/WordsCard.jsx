import { useState } from "react";
import Slider, { SliderTooltip } from "rc-slider";
import CloseIcon from "./CloseIcon";
import { useRecoilState } from "recoil";
import { tweetsAtom } from "../context/atoms";
import { removeItemAtIndex } from "../utils/arrayCrud";
import { labelTokens } from "../utils/api";

import "rc-slider/assets/index.css";

function WordsCard({ item }) {
  const [words, setWords] = useState(
    item.text.split(" ").filter((token) => token.length > 2)
  );

  const [lexicon, setLexicon] = useState({ pos: {}, neg: {}, neu: {} });

  const [{ chunk: tweets, chunckIndifier }, setTweets] =
    useRecoilState(tweetsAtom);

  const index = tweets.findIndex((tweet) => tweet === item);

  function handleDeleteTweet() {
    const newList = removeItemAtIndex(tweets, index);
    setTweets({ chunk: newList, chunckIndifier });
  }

  function onSliderChange(value, token) {
    value > 0
      ? setLexicon({
          ...lexicon,
          pos: Object.assign(lexicon.pos, { [token]: value }),
        })
      : value < 0
      ? setLexicon({
          ...lexicon,
          neg: Object.assign(lexicon.neg, { [token]: value }),
        })
      : setLexicon({
          ...lexicon,
          neu: Object.assign(lexicon.neu, { [token]: value }),
        });

    // console.log(lexicon);
  }

  function handleDeleteToken(token) {
    const newWords = words.filter((word) => word !== token);
    setWords(newWords);
  }

  function handleSubmit() {
    labelTokens(lexicon);
    setLexicon({ pos: {}, neg: {}, neu: {} });
    handleDeleteTweet();
  }

  return (
    <section className="card">
      <p className="card-parag">
        Use slider below to define polarity level for each word.
      </p>
      {words.length > 0
        ? words.map((token, idx) => (
            <div key={idx} className="card-row">
              <div className="card-row-slider">
                <Slider
                  handle={handle}
                  onAfterChange={(value) => onSliderChange(value, token)}
                  min={-3}
                  max={3}
                  defaultValue={0}
                  startPoint={0}
                  step={1}
                  marks={{
                    "-3": -3,
                    "-2": -2,
                    "-1": -1,
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                  }}
                />
              </div>
              <p className="card-row-token">
                {token}{" "}
                <span onClick={() => handleDeleteToken(token)}>
                  <CloseIcon size="14" />
                </span>
              </p>
            </div>
          ))
        : handleDeleteTweet()}
      <button
        style={{
          display: `${true ? "inline" : "none"}`,
        }}
        onClick={handleSubmit}
        className="submit-btn"
      >
        Submit
      </button>
    </section>
  );
}

const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  let category = value > 0 ? "Positive" : value < 0 ? "Negative" : "Neutral";
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}: ${category}`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

export default WordsCard;
