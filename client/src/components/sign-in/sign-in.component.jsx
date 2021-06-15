import React from 'react';
import {useDispatch} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

import { Formik} from 'formik';

import SignInSchema from './sign-in.schema'

import {TextField} from '@material-ui/core';

import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './sign-in.styles';

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

const SignIn = () => {

    const dispatch = useDispatch()

    const handleGoogleSignInStart = () => {
        dispatch(googleSignInStart())
    }

    return (
        <SignInContainer>
            <SignInTitle>I already have account</SignInTitle>
            <span>Sign in with your email and password</span>
            <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={values =>  {
                        dispatch(emailSignInStart(values))
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
                                <ButtonsBarContainer>
                                    <CustomButton type='submit'> SIGN IN</CustomButton>
                                </ButtonsBarContainer>
                            </form>
                    )}
                </Formik>
        </SignInContainer>
    )
}

export default SignIn;