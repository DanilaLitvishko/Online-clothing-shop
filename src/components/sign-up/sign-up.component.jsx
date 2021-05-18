import React from 'react'
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import SignUpSchema from './sign-up.schema'
import {Button, TextField} from '@material-ui/core';

import { Formik} from 'formik';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';

import './sign-up.styles.scss'

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

class SignUp extends React.Component{

    render(){
        return(
            <div>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <Formik
                    initialValues={{
                        displayName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={values =>  {
                        const {email, password, displayName} = values
                        try{
                            const {user} = await auth.createUserWithEmailAndPassword(email, password)
                            await createUserProfileDocument(user, {displayName})
                        }catch(error){}
                    }}    
                >
                    {props =>(
                            <form onSubmit={props.handleSubmit}>
                                <ThemeProvider theme={theme}>
                                <TextField 
                                        name='displayName' 
                                        label='displayName' 
                                        type='text' 
                                        value={props.values.displayName} 
                                        onChange={props.handleChange}
                                        helperText={props.errors.displayName}
                                        error={Boolean(props.errors.displayName)}
                                        fullWidth={true}
                                        width={150}
                                        variant="outlined"
                                        margin="normal"
                                    />
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

                                    <TextField 
                                        name='confirmPassword' 
                                        label='Confirm password' 
                                        type='password' 
                                        value={props.values.confirmPassword} 
                                        onChange={props.handleChange}
                                        helperText={props.errors.confirmPassword}
                                        error={Boolean(props.errors.confirmPassword)}
                                        fullWidth={true}
                                        width={150}
                                        variant="outlined"
                                        margin="normal"
                                    />

                                </ThemeProvider>
                                <Button type='submit' variant='contained' color="secondary"> SIGN UP</Button>
                            </form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default SignUp