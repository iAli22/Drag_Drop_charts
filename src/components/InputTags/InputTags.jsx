import { useContext, useState } from "react";
import style from "./InputTags.module.scss";
import { Store } from "../../context/BodyContextProvider";

function InputTags({ type }) {
  const { store, setStore } = useContext(Store);
  const [isDragEnter, setIsDragEnter] = useState(false);

  const onDragEnter = (e) => {
    const dataType = e.dataTransfer.types[0];
    if (type !== dataType && !isDragEnter) {
      setIsDragEnter(true);
    }
  };

  const onDragLeave = (e) => {
    if (isDragEnter) {
      setIsDragEnter(false);
    }
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDropItem = (e) => {
    if (type === e.dataTransfer.types[0]) {
      setIsDragEnter(false);
      const targetData = JSON.parse(e.dataTransfer.getData(type));
      const newBody = {};
      newBody[targetData.function] = targetData.name;

      setStore((prev) => {
        return {
          ...prev,
          ...newBody,
        };
      });
    }

    setIsDragEnter(false);
  };

  // Clear Input
  const clearTags = (tagType) => {
    const newBody = {};
    newBody[tagType] = "";

    setStore((prev) => {
      return {
        ...prev,
        ...newBody,
      };
    });
  };

  return (
    <div
      className={
        isDragEnter
          ? `${style.inputContainer} ${style.dragWrong}`
          : style.inputContainer
      }
    >
      <div className={style.inputLabel}>{type}</div>
      <div
        className={style.tagContainer}
        onDrop={(e) => onDropItem(e)}
        onDragOver={(e) => onDragOver(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragLeave={(e) => onDragLeave(e)}
      >
        {store[type] && <div className={style.tag}>{store[type]}</div>}

        <button className={style.clearBtn} onClick={() => clearTags(type)}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default InputTags;
