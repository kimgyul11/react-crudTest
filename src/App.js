import "./App.css";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
import DiaryContextProvider from "./context/DiaryDispatch";
import Info from "./components/Info";

function App() {
  return (
    <div className="App">
      <DiaryContextProvider>
        <Info />
        <DiaryEditor />
        <DiaryList />
      </DiaryContextProvider>
    </div>
  );
}

export default App;
