import { Layout } from 'antd';
import Slider from '../compoents/mainPage/Slider';
import Popular from '../compoents/mainPage/Popular';
import New from '../compoents/mainPage/Popular';
import About from '../compoents/mainPage/About';
import AppFooter from '../compoents/mainPage/Footer';


function HomePage() {
  return (
    <Layout>
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

export default HomePage;
