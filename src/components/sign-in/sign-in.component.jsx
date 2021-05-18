import React from 'react';

import {auth} from '../../firebase/firebase.utils'

import { Formik} from 'formik';

import SignInSchema from './sign-in.schema'

import {Button, TextField} from '@material-ui/core';

import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';

import './sign-in.styles.scss'

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

class SignIn extends React.Component {
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have account</h2>
                <span>Sign in with your email and password</span>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={values =>  {
                        try{
                        await auth.signInWithEmailAndPassword(values.email, values.password)
                        }catch(error){}
                    }}    
                >
                    {props =>(
                            <form onSubmit={props.handleSubmit}>
                                <ThemeProvider theme={theme}>
                                    <TextField 
                                        name='email' 
                                        label='email' 
                                        value={props.values.email}
                                        helperText={props.errors.email}
                                        onChange={props.handleChange}
                                        error={Boolean(props.errors.email)}
                                        variant="outlined"
                                        fullWidth={true}
                                        width={150}
                                        margin="normal"
                                    />

                                    <TextField 
                                        name='password' 
                                        label='password' 
                                        type='password' 
                                        value={props.values.password} 
                                        onChange={props.handleChange}
                                        helperText={props.errors.password}
                                        error={Boolean(props.errors.password)}
                                        fullWidth={true}
                                        width={150}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </ThemeProvider>
                                <Button type='submit' variant='contained' color="primary"> SIGN IN</Button>
                            </form>
                    )}
                </Formik>

            </div>
        )
    }
}

export default SignIn;