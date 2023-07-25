import Shop from './routes/shop/shop.component'
import { Route, Routes } from 'react-router-dom'
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './routes/utils/firebase.utils';
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './store/user/user.action';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async user => {
      // 如果采用 Google账号 登录，就需要 在数据库创建一个新的 用户信息
      if (user) {
        await createUserDocumentFromAuth(user)
      }

      dispatch(setCurrentUser(user))
    })

    return () => unsubscribe()
  }, [])

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
