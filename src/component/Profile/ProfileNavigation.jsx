import { useDispatch } from 'react-redux';

import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../State/Authentication/Action';

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteIcon /> },
    { title: "Address", icon: <AddReaction /> },
    { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    { title: "Notification", icon: <NotificationsActiveIcon /> },
    { title: "Events", icon: <EventIcon /> },
    { title: "Logout", icon: <LogoutIcon /> }
];
const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen =useMediaQuery('(max-width:900px)');
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleNavigate=(item)=>{
        if(item.title==="Logout") {
             dispatch(logout())
             navigate("/")
        }else
       navigate(`/my-profile/${item.title.toLowerCase()}`)
    }

    return (
        <div>
            <Drawer
             variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                open={isSmallScreen ? open : true}
                 anchor='left'
                 >
                <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl pt-16 gap-6">
                    {menu.map((item,i) => 
                    <React.Fragment key={i}>
                        <div onClick={()=>handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {i !== menu.length - 1 && <Divider />}
                    </React.Fragment>)}
                </div>

            </Drawer>
        </div>
    )
}

export default ProfileNavigation
