import React from "react";
import { useRecoilState } from "recoil";
import { todoListAtom } from "../../context/atoms";
import { removeItemAtIndex, replaceItemAtIndex } from "../../utils/arrayCrud";

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };
  return (
    <>
      <div>
        <input type="text" value={item.text} onChange={editItemText} />
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={toggleItemCompletion}
        />
        <button onClick={deleteItem}>X</button>
      </div>
      <style jsx>{`
        div {
          width: 90%;
          background-color: #f4f4f4;
          border-radius: 15px;
          paddinf: 10px 0;
          margin: 5px 0;
        }
      `}</style>
    </>
  );
}

export default TodoItem;
