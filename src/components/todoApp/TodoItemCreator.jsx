import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListAtom } from "../context/atoms";

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListAtom);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button type="submit" onClick={addItem}>
        Add
      </button>
    </div>
  );
}

let id = 0;
function getId() {
  return id++;
}

export default TodoItemCreator;
