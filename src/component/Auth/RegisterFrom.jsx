import React from 'react'
import { Button,MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../State/Authentication/Action'
import { useDispatch } from 'react-redux'

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
}
const RegisterFrom = () => {
    const navigate = useNavigate();
    const dispattch=useDispatch();
    const handleSubmit = (values) => {
        dispattch(registerUser({userData:values,navigate}))
    }
    return (
        <div>
            <Typography variant="h5" className='text-center'>
                Register
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="fullName"
                        label="fullName"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Field
                        as={TextField}
                        name="email"
                        label="email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Field
                        as={TextField}
                        name="password"
                        label="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                    />
                      
                        <Field
                        fullWidth
                        margin="normal"
                            as={Select}
                            labelId="role-simple-select-label"
                            id="role-simple-select"
                           name="role"
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant owner</MenuItem>

                        </Field>
                    
                    <Button fullWidth sx={{ mt: 2, padding: "1rem" }} type="submit"
                        variant='contained'>Register</Button>
                </Form>
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                if have an account alredy?
                <Button size='small' onClick={() => navigate("/account/login")}>
                    login
                </Button>
            </Typography>
        </div>
    )
}

export default RegisterFrom
