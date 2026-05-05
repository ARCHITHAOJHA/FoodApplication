import React from 'react'
import { Accordion,AccordionDetails,AccordionActions, Button, Divider, FormGroup, FormControl, FormControlLabel, Checkbox } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const demo = [
    {
        category: "Nuts & seeds",
        ingredients: ["cashews"]
    },
    {
        category : "Protein",
        ingredients : ["Ground beef","Bacon strips"]
    },

]

const MenuCard = () => {
    const handleCheckBoxChange=(value)=>{
        console.log("value")
    }
    return (

        <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
            <div className='lg:flex items-center justify-between'>
                <div className='lg:flex items-center lg:gap-5'>
                    <img className='w-[7rem] h-[7rem]'
                    src = "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg" 
                    alt=""
                    />

                    <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                        <p className='font-semibold text-xl'>Burger</p>
                        <p> ₹499 </p>
                        <p className='text-gray-400'> NICE AND FABULOUS TASTE...</p>
                    </div>

                </div>

            </div>
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <form>
                <div className='flex gap-5 flex-wrap'>
                    {demo.map((item) => (
                        <div>
                            <p>{item.category}</p>
                            <FormGroup>
                                {item.ingredients.map((item) => (
                                    <FormControlLabel control={<Checkbox onChange={() => handleCheckBoxChange(item)}/>} label ={item}/>
                                ))}
                            </FormGroup>
                        </div>
                    ))} 
                </div>
                <div className='pt-5'>
                    <Button  variant="contained" disabled={false} type="submit">{true? "Add to cart" : "Out of stock"}</Button>
                </div>
            </form>
          </Typography>
        </AccordionDetails>
      </Accordion>

    )
}
export default MenuCard