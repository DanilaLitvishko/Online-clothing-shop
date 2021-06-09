import * as Yup from 'yup'

const ChatSchema = Yup.object().shape({
    roomName: Yup.string()
    .min(4, 'Too Short')
    .required('Required'),
})

export default ChatSchema