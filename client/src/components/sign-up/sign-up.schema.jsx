import * as Yup from 'yup'

const SignUpSchema = Yup.object().shape({
    displayName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, "Nice try, nobody has a first name that long")
    .required('Required'),
    email: Yup.string()
    .email('Ivalid email address')
    .required('Required'),
    password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
    confirmPassword: Yup.string()
    .min(8, 'Too Short!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required')
})

export default SignUpSchema