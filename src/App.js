import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { dark } from '@mui/material/styles/createPalette';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkThems } from './theme/DarkTheme';
import Home from './component/Home/Home';
import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import ProfileNavigation from './component/Profile/ProfileNavigation';
import CustomerRoute from './Routes/CustomerRoute';
import Profile from './component/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getUser } from './State/Authentication/Action';
import { findCart } from './State/Cart/Action';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store=>store)
  useEffect(()=>{
    dispatch(getUser(auth.jwt||jwt));
    dispatch(findCart(jwt))
  },[auth.jwt])
  return (
    <ThemeProvider theme={darkThems}>
      <CssBaseline/>
   
         {/* <Navbar/>  */}
      {/* <Home/>  */}
        {/* <RestaurantDetails/>   */}
       {/* <Cart/>  */}
        {/* <ProfileNavigation/>    */}
       {/* <Profile/>  */}
       <CustomerRoute/> 
    </ThemeProvider>
  );
}

export default App;
