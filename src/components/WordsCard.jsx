import { useEffect, useState } from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import CloseIcon from "./CloseIcon";

const { createSliderWithTooltip } = Slider;
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

function WordsCard({ text }) {
  const [words, setWords] = useState([]);
  useEffect(() => {
    setWords(text.split(" ").filter((token) => token.length > 2));
  }, []);

  function onSliderChange(value) {
    console.log(value);
  }

  function handleDeleteToken(token) {
    const newWords = words.filter((word) => word !== token);
    setWords(newWords);
  }

  return (
    <section className="card">
      <p className="card-parag">
        Use slider below to define polarity level for each word.
      </p>
      {words.length > 0 &&
        words.map((token, idx) => (
          <div key={idx} className="card-row">
            <div className="card-row-slider">
              <Slider
                handle={handle}
                onChange={onSliderChange}
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
        ))}
    </section>
  );
}

export default WordsCard;
