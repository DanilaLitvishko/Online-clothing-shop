import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { Formik} from 'formik';
import {TextField} from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';
import {useSelector} from 'react-redux'

import CustomButton from '../../components/custom-button/custom-button.component'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import Message from '../message/message.component'
import {socket} from '../../utils/socket.utils'

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

const Chat = () => {
    const {id, name} = useParams()
    const [messages, setMessages] = useState([])
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        socket.emit('get-messages-history', id)
        socket.on('output-messages', res => {
            setMessages(res)
        })
    }, [])
    useEffect(() => {
        socket.on('message', message =>{
            setMessages([...messages, message])
        })
    }, [messages])

    return (
        <div>
            <p>{name}</p>
            <Formik
                    initialValues={{
                        message: '',
                    }}
                    onSubmit={values => {
                        socket.emit('send-message', values.message, id, currentUser.id, currentUser.displayName)
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
                {
                    messages.map(({id, ...otherSectionProps}) => <Message key={id} {...otherSectionProps}/>)
                }
        </div>
    )
}

export default Chat
