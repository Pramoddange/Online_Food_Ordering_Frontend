import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = ({item,order}) => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img className='h-16 w-16'
            src={item.food.images[0]} alt=""/>//"https://cdn.pixabay.com/photo/2022/06/14/18/58/biryani-with-kebab-7262655_640.jpg" 

        <div>
        <p>{item.food.name}</p>
        <p>&{item.totalPrice}</p>
        </div>
    </div>
    <div>
        <Button className='cursor-not-alllowed'>{order.orderStatus}</Button>
    </div>
    </Card>
  )
}

export default OrderCard
