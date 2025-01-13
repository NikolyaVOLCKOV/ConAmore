import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppHeader from "./compoents/Header";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage";
// import CartPage from "./pages/CartPage";


function App() {
  return (
    <>
    <AppHeader />
    <Routes>
      <Route path="/" element = {<HomePage />} />
      <Route path="/login" element = {<LoginPage/>} />
      <Route path="/register" element = {<RegisterPage />} />
      {/* <Route path="/cart" element = {<CartPage />} /> */}

      
    </Routes>

    </>
  );
}

export default App;
