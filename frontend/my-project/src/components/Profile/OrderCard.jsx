import { Button, Card } from '@mui/material'
import React from 'react'

export const OrderCard = () => {
    return(
        <Card className='flex justify-between items-center p-5'>
            <div className='flex items-center space-x-5'>
                <img 
                className='h-16 w-16'
                src='https://www.pexels.com/photo/seafood-pizza-melting-cheese-365459/'
                alt=''/>
                <div>
                    <p>Biryani</p>
                    <p>$99</p>
                </div>
            </div>
            <div>
                <Button className='cursor-not-allowed'> comppleted</Button>
            </div>

        </Card>
    )
}