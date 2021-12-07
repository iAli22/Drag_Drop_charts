import BodyContextProvider from "../../context/BodyContextProvider";
import { ChartsContainer, InputsContainer } from "../index";
import style from "./MainBody.module.scss";

function MainBody() {
  return (
    <BodyContextProvider>
      <main className={style.main}>
        <InputsContainer />
        <ChartsContainer />
      </main>
    </BodyContextProvider>
  );
}

export default MainBody;
