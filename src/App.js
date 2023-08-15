import Shop from './routes/shop/shop.component'
import { Route, Routes } from 'react-router-dom'
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
// import { createUserDocumentFromAuth, getCurrentUser, onAuthStateChangedListener } from './routes/utils/firebase.utils';
import { useDispatch } from 'react-redux'
import { checkUserSession, setCurrentUser } from './store/user/user.action';
import { useEffect } from 'react';
import Address from './routes/address/address.component';
import AuthRoute from './components/auth-route/auth-route.component';

function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(checkUserSession())
  },[])

  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index element={<Home></Home>}></Route>
        {/* 路由 多级嵌套
          shop/* : 只要匹配到 "/shop/" 时，都会渲染 <Shop /> */}
        <Route path="shop/*" element={<AuthRoute><Shop></Shop></AuthRoute>}></Route>
        <Route path='auth' element={<Authentication></Authentication>}></Route>
        <Route path='checkout' element={<AuthRoute><Checkout></Checkout></AuthRoute>}></Route>
        <Route path='address' element={<AuthRoute><Address></Address></AuthRoute>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
