import React from 'react'
import Room from '../room/room.component'
import {Link} from 'react-router-dom'

const RoomList = ({rooms}) => {
    return (
        <div>
            {
                rooms && rooms.map(room => (
                    <Link key={room.id} to={'/chat/' + room.id + '/' + room.name}>
                        <Room  name={room.name}/>
                    </Link>
                ))
            }
        </div>


    )
}

export default RoomList
