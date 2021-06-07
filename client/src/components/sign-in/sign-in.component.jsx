import React, { useState } from 'react';
import {useDispatch} from 'react-redux'

import FormInput from '../form-input/form-input.component'

import CustomButton from '../custom-button/custom-button.component'

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './sign-in.styles';

const SignIn = () => {

    const [userCredentials, setCredentials] = useState({
        email: '', 
        password: ''
    })

    const {email, password} = userCredentials

    const handleChange = event => {
        const {value, name } = event.target;
        setCredentials({...userCredentials, [name]: value})
    }

    const dispatch = useDispatch()

    const handleGoogleSignInStart = () => {
        dispatch(googleSignInStart())
    }

    const handleEmailSignInStart = () =>{
        dispatch(emailSignInStart({email, password}))
    }

    return (
        <SignInContainer>
            <SignInTitle>I already have account</SignInTitle>
            <span>Sign in with your email and password</span>
            <form>
                <FormInput 
                    name='email' 
                    type='email' 
                    handleChange={handleChange} 
                    value={email}
                    label='email'
                    required
                />
                <FormInput 
                    name='password' 
                    type='password' 
                    value={password} 
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <ButtonsBarContainer>
                    <CustomButton type='button' onClick={handleEmailSignInStart}> Sign in </CustomButton>
                    <CustomButton type='button' onClick={handleGoogleSignInStart} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    )
}

export default SignIn;