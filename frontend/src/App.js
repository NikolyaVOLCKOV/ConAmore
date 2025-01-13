import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppHeader from "./compoents/Header";


function App() {
  return (
    <>
    <AppHeader />
    <Routes>
      <Route path="/" element = {<HomePage />} />
    </Routes>

    </>
  );
}

export default App;
