import Shop from './routes/shop/shop.component'
import {Route,Routes} from 'react-router-dom'
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index element={<Home></Home>}></Route>
        {/* 路由 多级嵌套
          shop/* : 只要匹配到 "/shop/" 时，都会渲染 <Shop /> */}
        <Route path="shop/*" element={<Shop></Shop>}></Route>
        <Route path='auth' element={<Authentication></Authentication>}></Route>
        <Route path='checkout' element={<Checkout></Checkout>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
