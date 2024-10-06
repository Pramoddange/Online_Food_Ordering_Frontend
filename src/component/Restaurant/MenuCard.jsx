import { useDispatch } from 'react-redux'
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import categorizeIngredients from '../utils/categorizeIngredients';
import { addItemToCart } from '../../State/Cart/Action';

const demo = [
    {
        category: "Nuts & seeds",
        ingredients: ["Cashews"]
    },
    {
        category: "Protein",
        ingredients: ["Ground beef", "Bacon strips"]
    }

]
const MenuCard = ({item}) => {
    const [selectedIngredients,setSelectedIngredients]=useState([]);
    const dispatch=useDispatch();
    console.log(item);
    const handleCheckBoxChange = (itemName) => {
        console.log(itemName);
        if(selectedIngredients.includes(itemName)){
            setSelectedIngredients(selectedIngredients.filter((item)=>item!==itemName));
        }else{
            setSelectedIngredients([...selectedIngredients,itemName]);
        }
    }

    const handledAddItemToCart=(e)=>{
        e.preventDefault();
        const reqData={
            token:localStorage.getItem("jwt"),
            cartItem:{
                foodId:item.id,
                quantity:1,
                ingredients:selectedIngredients,
                
            },
            
        };
        dispatch(addItemToCart(reqData))
        console.log("req data",reqData);
    };

   
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img className="w-[7rem] h-[7rem] object-cover" src={item.images[0]} alt="" />{/*"https://media.istockphoto.com/id/1041137232/photo/100-gluten-free-low-carb-hamburger-and-bun.webp?b=1&s=612x612&w=0&k=20&c=E_VrRWeGLkLwDFfhJkxLywfUFEvHsk3xC-kGOGfaeUw="*/}
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className='font-semibold text-xl'>{item.name}</p>
                            <p className="text-lg"> <CurrencyRupeeIcon/>{item.price}</p>
                            <p className="text-gray-400">{item.description}</p>

                        </div>
                    </div>

                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handledAddItemToCart}>
                    <div className='flex flex-wrap gap-5'>
                        {
                            Object.keys(categorizeIngredients(item.ingredients)).map((category, index) =>
                                <div key={index}>
                                    <p>{category}</p>
                                    <FormGroup>
                                        {categorizeIngredients(item.ingredients)[category].map((item,index) => <FormControlLabel key={index} control={<Checkbox onChange={()=>
                                        handleCheckBoxChange(item.name)} />} label={item.name} />
                                        )
                                        }

                                    </FormGroup>
                                </div>
                            )
                        }
                    </div>
                    <div className='pt-5'>
                        <Button  disabled={false} variant="contained" type="submit">{true?"Add to Cart":"Out of Stock"}</Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}

export default MenuCard
