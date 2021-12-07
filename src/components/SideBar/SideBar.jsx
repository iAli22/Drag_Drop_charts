import { useState, useEffect } from "react";
import style from "./SideBar.module.scss";

function SideBar() {
  const [columns, setColumns] = useState(null);
  // Get Columns Request
  const getColumns = async () => {
    const res = await fetch("https://plotter-task.herokuapp.com/columns");
    const data = await res.json();
    setColumns(data);
  };

  useEffect(() => {
    getColumns();
  }, []);

  const onDragStart = (e, col) => {
    e.dataTransfer.setData(col.function, JSON.stringify(col));
  };

  return (
    <aside className={style.sideBar}>
      <div className={style.header}>
        <h3>Columns</h3>
      </div>
      <ul className={style.colItems}>
        {columns?.map((col, index) => (
          <li draggable key={index} onDragStart={(e) => onDragStart(e, col)}>
            {col.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
