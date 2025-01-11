import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import AppHeader from './compoents/mainPage/Header';
import Slider from './compoents/mainPage/Slider';
import Popular from './compoents/mainPage/Popular';
import New from './compoents/mainPage/Popular';
import About from './compoents/mainPage/About';
import AppFooter from './compoents/mainPage/Footer';


function App() {
  return (
    <Layout>
    <AppHeader />
    <Slider />
    <div style={{ padding: "20px" }}>
      <Popular />
      <New />
      <About />
    </div>
    <AppFooter />
  </Layout>
  );
}

export default App;
