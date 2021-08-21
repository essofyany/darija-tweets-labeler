import { selector } from "recoil";
import { todoListAtom, todoListFilterAtom } from "./atoms";

export const filteredTodoListSelector = selector({
  key: "filteredTodoListSelector",
  get: ({ get }) => {
    const filter = get(todoListFilterAtom);
    const list = get(todoListAtom);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsSelector = selector({
  key: "todoListStatsSelector",
  get: ({ get }) => {
    const todoList = get(todoListAtom);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
