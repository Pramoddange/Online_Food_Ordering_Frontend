import { useSelector } from 'react-redux';
import React from 'react'
import {Card, Chip, IconButton} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToFavorite } from '../../State/Authentication/Action';
import { isPresentInFavorites } from '../Config/logic';

const RestaurantCard = ({item}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector((state)=>state)

  const handleAddToFavorite=()=>{
    dispatch(addToFavorite({restaurantId:item.id,jwt}))
  }
  const handleNavigateToRestaurants=()=>{
    if(item.open){
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
    }
  }
  return (
    <Card className='w-[15rem]' >
      <div className={`${true? "cursor-pointer" : "cursor-not-allowed"} relative`}>
       <img  className="w-full h-[10rem] rounded-t-md object-cover" src={item.images[0]} alt="" />
       <Chip size="small" className="absolute top-2 left-2"
       color={item.open ? "success":"error"}
       label={item.open ? "Open":"Closed"}
      />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className='space-y-1'>
          <p onClick={handleNavigateToRestaurants} className='font-semibold text-lg cursor-pointer'>{item.name}</p>
          <p className='text-gray-500 text-sm'>
           {item.description}
          </p>
        </div>
        <div>
          <IconButton onClick={handleAddToFavorite}>
           {isPresentInFavorites(auth.favorites,item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
          </IconButton>
        </div>

      </div>
    </Card>
  )
}

export default RestaurantCard
