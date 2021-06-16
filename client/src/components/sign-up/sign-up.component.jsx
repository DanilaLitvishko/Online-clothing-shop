import React from 'react'
import { useDispatch } from 'react-redux'

import SignUpSchema from './sign-up.schema'
import CustomButton from '../custom-button/custom-button.component'

import {signUpStart} from '../../redux/user/user.actions'

import {TextField} from '@material-ui/core';

import { Formik} from 'formik';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

const SignUp = () => {
    
    const dispatch = useDispatch()
        return(
            <SignUpContainer>
                <SignUpTitle>I do not have a account</SignUpTitle>
                <span>Sign up with your email and password</span>
                <Formik
                    initialValues={{
                        displayName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={values => {
                        dispatch(signUpStart( values))
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
                                <CustomButton type='submit'> SIGN UP</CustomButton>
                            </form>
                    )}
                </Formik>
        </SignUpContainer>
    )
}

export default SignUp