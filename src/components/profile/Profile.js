import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


// === form === //
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useForm from '../../store/form';
import axios from 'axios';


export default function Profile() {

    const useStyles = makeStyles({
        backButton: {
            margin: '1em',
        },
        form: {
            backgroundColor: 'white',
        },
    });

    const profileStyle = useStyles();


    // === categories for 'categories' part of form === //
    const categories = [
        {
            value: 'Accessibility',
            label: 'Accessibility',
        },
        {
            value: 'Web Design',
            label: 'Web Design',
        },
        {
            value: 'Design',
            label: 'Design',
        },
        {
            value: 'Apps',
            label: 'Apps',
        },
        {
            value: 'Tutoring',
            label: 'Tutoring',
        },
        {
            value: 'Misc',
            label: 'Misc',
        }
    ];



    // // handle change for CATEGORY portion of form
    // const handleCategory = (event) => {
    //     setCategory(event.target.value);
    // };

    // const [category, setCategory] = React.useState('CATEGORY');




    // ADD NEW SERVICE TO BACK END
    const { handleChange, handleSubmit, values } = useForm(addItem);

    async function addItem(service) {
        // console.log('service is', service);
        await axios.post('https://backend-virtual-store.herokuapp.com/services', service)
        // setList([...list, item]);
        // console.log(item);
        // item.id = uuid();
        // item.complete = false;
        // setList([...list, item]);
    }

    return (
        <div>
            <Button
                className={profileStyle.backButton}
                size="large"
                color="primary"
                variant="contained"
                startIcon={<ArrowBackIosTwoToneIcon />}
                component={Link} to={'/'}
            >
                Back to Store
            </Button>

            <p>helo this is ur profile page :^)</p>


            <p> upload new services here, sire </p>
            <form onSubmit={handleSubmit}>
                <Box
                    className={profileStyle.form}
                    // component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField name="name" label="Service Name" variant="outlined" onChange={handleChange} />
                    <TextField name="freelancer" label="Freelancer id" variant="outlined" type="number" onChange={handleChange} />
                    <TextField
                        // disabled
                        name="category"
                        onChange={handleChange}
                        variant="outlined"
                        select
                        label="Select"
                        defaultValue="Misc"
                        value={values.category}
                        helperText="Pick a Category">
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* <TextField name="category" label="Category" variant="outlined" onChange={handleChange} /> */}
                    <TextField name="price" label="Price" variant="outlined" type="number" onChange={handleChange} />
                    <TextField
                        onChange={handleChange}
                        name="details"
                        label="Details"
                        variant="outlined"
                        multiline
                        maxRows={4}
                    />
                    <TextField name="image" label="Image URL" variant="outlined" onChange={handleChange} />
                    <Button variant='outlined' type='submit' > Submit </Button>
                </Box>
            </form>



        </div>
    )
}
