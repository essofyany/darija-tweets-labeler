import { useRecoilValue } from "recoil";
import { todoListStatsSelector } from "../context/selectors";

function TodoListStats() {
  const { totalUncompletedNum, percentCompleted, totalCompletedNum, totalNum } =
    useRecoilValue(todoListStatsSelector);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

export default TodoListStats;
