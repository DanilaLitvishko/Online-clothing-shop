import React, { useEffect, useState } from 'react'
import { Formik} from 'formik';
import {TextField} from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors';

import RoomList from '../../components/room-list/room-list.component'
import {useSelector} from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import CustomButton from '../../components/custom-button/custom-button.component'
import {socket} from '../../utils/socket.utils'

import ChatSchema from './chat.schema'

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

const ChatPage = () => {
    const user = useSelector(selectCurrentUser)
    const [rooms, setRooms] = useState([])

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
                <RoomList rooms={rooms}/>
        </div>
    )
}

export default ChatPage
