import * as Yup from 'yup'

const SignInSchema = Yup.object().shape({
    email: Yup.string()
    .email('Ivalid email address')
    .required('Required'),
    password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required')
})

export default SignInSchema