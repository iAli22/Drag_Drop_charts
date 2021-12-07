import "./styles.css";
import { SideBar, MainBody } from "./components";

/**
 * https://plotter-task.herokuapp.com/data POST
 * https://plotter-task.herokuapp.com/columns GET
 */

export default function App() {
  return (
    <section className="app">
      <SideBar />
      <MainBody />
    </section>
  );
}
