import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Formik} from 'formik';
import {TextField} from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';

import RoomList from '../../components/room-list/room-list.component'
import {useSelector} from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import CustomButton from '../../components/custom-button/custom-button.component'

import ChatSchema from './chat.schema'

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

let socket

const ChatPage = () => {
    const ENDPOINT = 'localhost:5000'
    const user = useSelector(selectCurrentUser)
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        socket = io(ENDPOINT)
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT])

    useEffect(() => {
        socket.on('output-rooms', rooms =>{
            setRooms(rooms)
        })
    }, [])

    return (
        <div>
            ChatPage
            <p>Welcome {user ? user.displayName : ''}</p>
            <Formik
                    initialValues={{
                        roomName: '',
                    }}
                    validationSchema={ChatSchema}
                    onSubmit={values => {
                        socket.emit('create-room', values.roomName)
                    }}    
                >
                    {props =>(
                            <form onSubmit={props.handleSubmit}>
                                <ThemeProvider theme={theme}>
                                    <TextField 
                                        name='roomName' 
                                        label='Enter a room name' 
                                        value={props.values.roomName}
                                        helperText={props.errors.roomName}
                                        onChange={props.handleChange}
                                        error={Boolean(props.errors.roomName)}
                                        variant="outlined"
                                        fullWidth={true}
                                        width={150}
                                        margin="normal"
                                    />
                                </ThemeProvider>
                                <CustomButton type='submit'>CREATE CHATROOM</CustomButton>
                            </form>
                    )}
                </Formik>
                <RoomList/>
        </div>
    )
}

export default ChatPage
