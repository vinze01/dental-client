import React, { useContext, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import '../css/Login.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext';

const { Option } = Select;

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const {setAuthState} = useContext(AuthContext)

    const navigate = useNavigate()
    const handleSubmit = (values) => {
        try {
            if (isSignUp) {
                console.log('Sign-up Data Submitted: ', values);
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, values).then((response) => {
                    console.log('values', values)
                    if(response.data.error) {
                        notification.error({
                            message: 'Error',
                            description: response.data.error,
                        })
                    } else {
                        localStorage.setItem('accessToken', response.data)
                        notification.success({
                            message: 'Success',
                            description: response.data.message,
                        })
                        window.location.reload()
                    }
                })
            } else {
                console.log('Login Data Submitted: ', values);
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, values).then((response) => {
                    console.log('values', values)
                    console.log('response.data', response.data)
                    if (response.data.error) {
                        notification.error({
                            message: 'Error',
                            description: response.data.error,
                        });
                    } else {
                        localStorage.setItem('accessToken', response.data)
                        notification.success({
                            message: 'Success',
                            description: 'Logged in successfully',
                        })
                        setAuthState(true)
                        navigate('/')
                    }
                })
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            values = ''
        }
        
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="login-container" data-aos="fade-up">
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                className="login-form"
                data-aos="fade-up"
            >
                <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                {isSignUp && (
                    <>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your first name!' }]}
                            data-aos="fade-up"
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            name="middleName"
                            rules={[{ required: true, message: 'Please input your middle name!' }]}
                            data-aos="fade-up"
                        >
                            <Input placeholder="Middle Name" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your last name!' }]}
                            data-aos="fade-up"
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                            data-aos="fade-up"
                        >
                            <Input placeholder="Address" />
                        </Form.Item>
                        <Form.Item
                            name="contactNo"
                            rules={[{ required: true, message: 'Please input your contact number!' }]}
                            data-aos="fade-up"
                        >
                            <Input placeholder="Contact Number"/>
                        </Form.Item>
                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Please select your role!' }]}
                            data-aos="fade-up"
                        >
                            <Select placeholder="Select Role">
                                <Option value="USER">User</Option>
                                <Option value="DOCTOR">Doctor</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Invalid email format!' }
                            ]}
                            data-aos="fade-up"
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    data-aos="fade-up"
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    data-aos="fade-up"
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Button>
                </Form.Item>
                {!isSignUp && (
                    <span data-aos="fade-up">
                        Don't have an account? <Button onClick={toggleForm}>Sign Up</Button>
                    </span>
                )}
            </Form>
        </div>
    );
};

export default Login;
