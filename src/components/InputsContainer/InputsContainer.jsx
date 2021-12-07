import style from "./InputsContainer.module.scss";
import { InputTags } from "../index";
function InputsContainer() {
  return (
    <div className={style.main}>
      <InputTags type="dimension" />
      <InputTags type="measure" />
    </div>
  );
}

export default InputsContainer;
