import { useParams } from 'react-router-dom'

import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../../State/Restaurant/Action';
import {getRestaurantCategory} from '../../State/Restaurant/Action';
import { GetMenuItemsBYRestaurantID } from '../../State/Menu/Action';
// const categories = [
//     "pizza",
//     "biryani",
//     "burger",
//     "chicken",
//     "mutton"

// ]
const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian",value: "vegetarian" },
    { label: "Non_Vegetarian", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" }
]
const menu=[1,1,1,1,1]

const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")
    const {auth,restaurant,menu}=useSelector((state)=>state)
    const [selectedCategory,setSelectedCategory]=useState("")

    const {id,city}=useParams();

    const handleFilter = (e) => {
        setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }

    const handleFilterCategory= (e,value) => {
        setSelectedCategory(value)
        console.log(e.target.value, e.target.name,value)
    }

   console.log("restaurant", restaurant);
    useEffect(() => {
        dispatch(getRestaurantById({jwt,restaurantId:id}))
        dispatch(getRestaurantCategory({jwt, restaurantId:id}))
       
    },[])
    useEffect(()=>{
        dispatch(GetMenuItemsBYRestaurantID({
            jwt,
            id,
            vegetarian:foodType==="vegetarian",
            nonveg:foodType==="non_vegetarian",
            seasonal:foodType==="seasonal",
            foodCategory:selectedCategory}))
        },[selectedCategory,foodType])

    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/india/indian fast food/3</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            { <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[0]} alt="" /> }
                        </Grid>

                        <Grid item xs={12} lg={6} >
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[1]} alt="" />
                        </Grid>

                        <Grid item xs={12} lg={6} >
                            <img className='w-full h-[40vh] object-cover' src="https://b.zmtcdn.com/data/pictures/2/18938882/278f07a40256b48705b351f9a8ca1798.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*" alt="" />
                        </Grid>
                    </Grid>

                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>
                        {restaurant.restaurant?.description}
                    </p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>
                                Mumbai,Maharashtra
                            </span>
                        </p>

                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />

                            <span>
                                Mon-Sun: 9:00 AM - 9:00 PM (Today)
                            </span>
                        </p>
                    </div>

                </div>
            </section>
            <Divider />
            <section className="pt-[2rem] lg:flex relative">
                <div className='space-y-10 lg:w-[20%] filter'>
                    <div className=' box space-y-5 lg:sticky top-28 '>
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name='food-type' value={foodType}>
                                    {foodTypes.map((item, index) =>
                                        <FormControlLabel value={item.value}
                                            key={index} control={<Radio />}
                                            label={item.label} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilterCategory} name='food-category' 
                                value={selectedCategory}
                                >
                                    {restaurant.categories.map((item, index) =>
                                        <FormControlLabel value={item.name}
                                            key={index} control={<Radio />}
                                            label={item.name} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                </div>
                   
                <div className='space-y-5 lg:w-[100%] lg:pl-10'>
                    {menu.menuItems.map((item,index)=><MenuCard key={index} item={item}/>)}
                   
                </div>
            </section>

        </div>
    )
}

export default RestaurantDetails
