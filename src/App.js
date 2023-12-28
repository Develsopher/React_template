import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";

import FormCard from "./components/FormCard";
import DataList from "./components/DataList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      const created_at = new Date().getTime();
      const newItem = {
        ...action.data,
        created_at,
      };
      return [newItem, ...state];
    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it,
      );
    case "REMOVE":
      return state.filter((it) => it.id !== action.targetId);
    default:
      return state;
  }
};

export const DataStateContext = React.createContext();
export const DataDispatchContext = React.createContext();

function App() {
  const dataId = useRef(0);
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await res.json();

    const initData = data.slice(0, 20).map((it) => {
      return {
        title: it.name,
        content: it.body,
        score: Math.floor(Math.random() * 5) + 1,
        created_at: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });
  };

  const handleAddData = useCallback((title, content, score) => {
    dispatch({
      type: "CREATE",
      data: { title, content, score, id: dataId.current },
    });
  }, []);

  const handleEditData = useCallback((targetId, newContent) => {
    dispatch({ type: "UPDATE", targetId, newContent });
  }, []);

  const handleRemoveData = useCallback((targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  }, []);

  const getDataAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.score >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDataAnalysis;

  const memoizedDispatch = useMemo(() => {
    return { handleAddData, handleEditData, handleRemoveData };
  }, []);
  return (
    <div className="app">
      <DataStateContext.Provider value={data}>
        <DataDispatchContext.Provider value={memoizedDispatch}>
          <FormCard />
          <div>전체 데이터 개수 : {data.length}</div>
          <div>3점이상 데이터 개수: {goodCount}</div>
          <div>3점미만 데이터 개수: {badCount}</div>
          <div>3점이상 데이터 비율: {goodRatio.toFixed(2)}%</div>
          <DataList onEdit={handleEditData} onRemove={handleRemoveData} />
        </DataDispatchContext.Provider>
      </DataStateContext.Provider>
    </div>
  );
}

export default App;
