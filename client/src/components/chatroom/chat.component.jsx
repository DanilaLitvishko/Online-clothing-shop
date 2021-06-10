import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { Formik} from 'formik';
import {TextField} from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';
import CustomButton from '../../components/custom-button/custom-button.component'

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });


const Chat = () => {
    const {id, name} = useParams()
    const [messages, setMessages] = useState([])
    return (
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <Formik
                    initialValues={{
                        message: '',
                    }}
                    onSubmit={values => {
                        setMessages([...messages, values.message])
                    }}    
                >
                    {props =>(
                            <form onSubmit={props.handleSubmit}>
                                <ThemeProvider theme={theme}>
                                    <TextField 
                                        name='message' 
                                        label='Enter a message' 
                                        value={props.values.message}
                                        helperText={props.errors.message}
                                        onChange={props.handleChange}
                                        error={Boolean(props.errors.message)}
                                        variant="outlined"
                                        fullWidth={true}
                                        width={150}
                                        margin="normal"
                                    />
                                </ThemeProvider>
                                <CustomButton type='submit'>SEND MESSAGE</CustomButton>
                            </form>
                    )}
                </Formik>
        </div>
    )
}

export default Chat
