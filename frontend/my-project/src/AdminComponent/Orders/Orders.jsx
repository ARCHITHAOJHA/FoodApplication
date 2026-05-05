import React from 'react';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import OrderTable from './OrderTable';

const orderStatus = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'All', value: 'ALL' },
];

export const Orders = () => {
    const [filterValue, setFilterValue] = React.useState('ALL');

    const handleFilter = (e, value) => {
        setFilterValue(value);
    };

    return (
        <div className='px-2'>
            <Card className='p-5'>
                <Typography sx={{ paddingBottom: '1rem' }} variant='h5'>
                    Order Status
                </Typography>
                <FormControl>
                    <RadioGroup
                        onChange={handleFilter}
                        row
                        name='category'
                        value={filterValue}
                    >
                        {orderStatus.map((item) => (
                            <FormControlLabel
                                key={item.label}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                sx={{ color: 'gray' }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
            <OrderTable filterValue={filterValue} />
        </div>
    );
};
