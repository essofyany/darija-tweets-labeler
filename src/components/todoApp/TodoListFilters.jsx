import { useRecoilState } from "recoil";
import { todoListFilterAtom } from "../context/atoms";

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterAtom);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

export default TodoListFilters;
