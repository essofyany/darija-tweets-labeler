import React from "react";
import { useRecoilValue } from "recoil";
import TodoItem from "../components/TodoItem ";
import TodoItemCreator from "../components/TodoItemCreator";
import TodoListFilters from "../components/TodoListFilters";
import TodoListStats from "../components/TodoListStats";
import { filteredTodoListSelector } from "../context/selectors";

function recoilPage() {
  const todoList = useRecoilValue(filteredTodoListSelector);

  return (
    <>
      <section>
        <h1>Recoil: Learning</h1>
        <TodoListStats />
        <TodoListFilters />
        <TodoItemCreator />
        <div>
          {todoList.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
      </section>
      <style jsx>{`
        section {
          width: 95vw;
          height: 95vh;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: felx-end;
        }
        section div {
          width: 80%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: felx-end;
          border: 1px solid #eee;
        }
      `}</style>
    </>
  );
}

export default recoilPage;
