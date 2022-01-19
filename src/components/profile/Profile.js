import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Snackbar, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { root } from '../../helper'
import { AuthContext } from '../../context/Auth'
// import { loadProducts, getProducts } from '../../store/products';
import { connect } from 'react-redux';
import _ from 'lodash';

// === form === //
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useForm from '../../store/form';

require('dotenv').config();


function Profile(props) {
    // console.log('PROFILE PAGE props', props.products)

    const useStyles = makeStyles({
        backButton: {
            margin: '1em',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        welcomeText: {
            fontFamily: 'Inter',
            fontSize: '2em',
            margin: '.1em',
        },
        header: {
            fontFamily: 'Inter',
            // alignSelf: 'flex-start',
            marginBottom: '1em',
            fontSize: '1.3em',
        },
        offerContainer: {
            // backgroundColor: '#97b2bd',
            backgroundColor: 'white',
            maxWidth: '90%',
        },
        form: {
            // backgroundColor: '#97b2bd',
            backgroundColor: 'white',
        },
        formField: {
            backgroundColor: 'white',
        },
        logoutButton: {
            display: 'block',
            backgroundColor: '#fcba03',
            margin: '0 auto',
            marginTop: '5em',
        },
        cards: {
            fontFamily: 'Inter',
            textAlign: 'center',
            fontSize: '',
            color: 'black',
            height: '20em',
            maxHeight: '23em',
            width: '10em',
            position: 'relative',
        },
    });

    const profileStyle = useStyles();
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const history = useHistory();

    console.log('user is: ', user)

    // scroll window to top at page load
    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/signin")
        }
        window.scrollTo(0, 0)
        // eslint-disable-next-line
    }, [])

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


    // === === === snackbar behavior from MUI docs === === === //
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        history.push("/")
    };

    const action = (
        <>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
            <Button
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                X
            </Button>
        </>

    );


    // ADD NEW SERVICE TO BACK END
    const { handleChange, handleSubmit, values } = useForm(addItem);

    // // OLD ADD HERE
    // async function addItem(service) {
    //     // console.log('service is', service);
    //     // await axios.post('https://backend-virtual-store.herokuapp.com/services', service)
    //     await axios.post('/services', service)
    // }

    async function addItem(service) {

        // const servicesData = await axios.post(root + `/services`, service)

        const servicesData = await axios({
            method: 'post',
            url: `${root}/services`,
            data: service,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        });

        // console.log('response data', res.data)
        if (!!servicesData.data.success) {
            // if (res.data.deleted === 1) {
            console.log('front end RES', servicesData.data);
            setOpen(true);
        } else {
            alert(`ALERT: ${servicesData.data.message}`);
        }
    }


    const productImage = (image) => {
        if (!image) {
            return 'https://images.unsplash.com/photo-1581922814484-0b48460b7010?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
        }
        return image
    }

    const renderedProducts = props.products.productList.filter(item => item.freelancer === user.id)
    console.log('rendered products', renderedProducts)

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

            <div className={profileStyle.container}>
                <p className={profileStyle.welcomeText}>Hello, {user.username}</p>
                <p className={profileStyle.header}> Your current offerings </p>
                <Grid spacing={4} container justifyContent="center" alignItems="flex-start" className={profileStyle.offerContainer} elevation={20}>
                    {/* {_.map(props.products.productList, shownService => { */}
                    {_.map(renderedProducts, shownService => {
                        return (
                            <Grid item key={shownService.id}>

                                <Card className={profileStyle.cards} elevation={5}>
                                    <CardMedia
                                        image={productImage(shownService.image)}
                                        style={{ height: 5, paddingTop: '100%' }}
                                    />
                                    <CardContent>{shownService.name}</CardContent>
                                    <CardContent>${shownService.price}</CardContent>
                                    <Button
                                        component={Link}
                                        to={{ pathname: `/products/${shownService.id}`, state: { shownItem: shownService } }}>
                                        Edit
                                    </Button>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>

                <p className={profileStyle.header}> Upload new service </p>
                <form onSubmit={handleSubmit} >
                    <Box
                        className={profileStyle.form}
                        // component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField className={profileStyle.formField} name="name" label="Service Name" variant="outlined" onChange={handleChange} />
                        {/* <TextField name="freelancer" label="Freelancer id" variant="outlined" type="number" onChange={handleChange} /> */}
                        <TextField
                            // disabled
                            className={profileStyle.formField}
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
                        <TextField className={profileStyle.formField} name="price" label="Price" variant="outlined" type="number" onChange={handleChange} />
                        <TextField
                            className={profileStyle.formField}
                            onChange={handleChange}
                            name="details"
                            label="Details"
                            variant="outlined"
                            multiline
                            maxRows={4}
                        />
                        <TextField className={profileStyle.formField} name="image" label="Image URL" variant="outlined" onChange={handleChange} />
                        <Button className={profileStyle.formField} variant='outlined' type='submit' > Submit </Button>
                    </Box>
                </form>
                <Button className={profileStyle.logoutButton} onClick={logout}>Logout</Button>
            </div>

            <Snackbar
                severity="error"
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Service Deleted!"
                action={action}
            >
                <MuiAlert action={action} onClose={handleClose} severity="success">Service Created!</MuiAlert>
            </Snackbar>

        </div >
    )
}


const mapStateToProps = (state) => {
    // console.log('🎲 state.cart ', state.cart)
    return {
        products: state.products,
    }
}

export default connect(mapStateToProps)(Profile);