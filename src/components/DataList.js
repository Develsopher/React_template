import React, { useContext } from "react";
import DataItem from "./DataItem";
import { DataStateContext } from "../App";

const DataList = ({ onEdit, onRemove }) => {
  const data = useContext(DataStateContext);
  return (
    <ul>
      {data.map((it) => (
        <DataItem key={it.id} onEdit={onEdit} onRemove={onRemove} {...it} />
      ))}
    </ul>
  );
};

DataList.defaultProps = {
  data: [],
};

export default DataList;
