import React from "react";
import { Box, Button, Card, Divider, Grid, Modal, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { CartItem } from "./CartItem";
import { AddressCard } from "./AddressCard";

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object({
  streetAddress: Yup.string().required('Street address is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().required('Pincode is required'),
  city: Yup.string().required('City is required'),
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const items = [1, 1, 1];

  return (
    <>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          {items.map((item, index) => (
            <CartItem key={index} />
          ))}
          <Divider />
          <div className='billDetails px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'><p>Item Total</p><p>Rs.599</p></div>
              <div className='flex justify-between text-gray-400'><p>Delivery Fee</p><p>Rs.21</p></div>
              <div className='flex justify-between text-gray-400'><p>GST</p><p>Rs.21</p></div>
              <Divider />
            </div>
            <div className='flex justify-between text-gray-400'><p>Total pay</p><p>Rs.642</p></div>
          </div>
        </section>

        <Divider orientation='vertical' flexItem />

        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {[1, 1, 1].map((item, index) => (
                <AddressCard key={index} item={item} showButton handleSelectAddress={() => {}} />
              ))}
              <Card className='flex gap-5 w-64 p-5'>
                <AddLocationAltIcon />
                <div className='space-y-3 text-gray-500'>
                  <h1 className='font-semibold text-lg text-white'>Add new Address</h1>
                  <Button variant='outlined' fullWidth onClick={() => setOpen(true)}>Add</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => setOpen(false)}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}><Field as={TextField} name='streetAddress' label='Street Address' fullWidth /></Grid>
                <Grid item xs={12}><Field as={TextField} name='city' label='City' fullWidth /></Grid>
                <Grid item xs={12}><Field as={TextField} name='state' label='State' fullWidth /></Grid>
                <Grid item xs={12}><Field as={TextField} name='pincode' label='Pincode' fullWidth /></Grid>
                <Grid item xs={12}><Button fullWidth variant='contained' type='submit'>Deliver Here</Button></Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
