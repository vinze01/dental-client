import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal, notification } from 'antd';
import axios from 'axios';
import '../css/Profile.css';

const { Item } = Form;

const Profile = () => {
    const [form] = Form.useForm();
    const [userProfile, setUserProfile] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
                    headers: {
                        accessToken: localStorage.getItem('accessToken'),
                    },
                });
                setUserProfile(response.data.result);
                form.setFieldsValue(response.data.result); // Set form values after fetching user profile
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [form]);

    const handleDeleteAccount = async () => {
        try {
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/auth/profile/delete/${userProfile.id}`,
                {
                    headers: {
                        accessToken: localStorage.getItem('accessToken'),
                    },
                }
            );
            notification.success({
                message: 'Account Deleted',
                description: 'Your account has been deleted successfully.',
            });
            localStorage.removeItem('accessToken');
            navigate('/login');
            window.location.reload(); // Reload the page to ensure state is cleared
        } catch (error) {
            console.error('Error deleting account:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to delete account. Please try again later.',
            });
        }
        setDeleteModalVisible(false);
    };

    const handleUpdateProfile = async () => {
        try {
            const values = await form.validateFields(); // Get the values from the form
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/auth/profile/edit/${userProfile.id}`,
                values,
                {
                    headers: {
                        accessToken: localStorage.getItem('accessToken'),
                    },
                }
            );
            setUserProfile(values); // Update local state with new values
            notification.success({
                message: 'Profile Updated',
                description: 'Your profile has been updated successfully.',
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to update profile. Please try again later.',
            });
        }
    };

    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    return (
        <div className="profile-container">
            <h1>Manage My Profile</h1>
            {userProfile && (
                <Form
                    form={form}
                    initialValues={userProfile}
                    className="profile-form"
                    layout="vertical"
                >
                    <Form.Item label="First Name" name="firstName">
                        <Input />
                    </Form.Item>
                    <Item label="Middle Name" name="middleName">
                        <Input />
                    </Item>
                    <Item label="Last Name" name="lastName">
                        <Input />
                    </Item>
                    <Item label="Address" name="address">
                        <Input />
                    </Item>
                    <Item label="Contact No" name="contactNo">
                        <Input />
                    </Item>
                    <Item label="Email" name="email">
                        <Input />
                    </Item>
                    <Item label="Username" name="username">
                        <Input />
                    </Item>
                    {/* Render the Password field conditionally */}
                    {userProfile.password ? (
                        <Item label="Password" name="password">
                            <Input.Password />
                        </Item>
                    ) : null}
                    <Item>
                        <Button type="primary" onClick={showDeleteModal} danger>
                            Delete Account
                        </Button>
                        <Button
                            type="primary"
                            style={{ display: 'flex', justifyContent: 'space-between', margin: '0 auto' }}
                            onClick={handleUpdateProfile}
                        >
                            Update
                        </Button>
                    </Item>
                </Form>
            )}
            <Modal
                title="Confirm Deletion"
                open={deleteModalVisible}
                onOk={handleDeleteAccount}
                onCancel={handleCancelDelete}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to proceed?</p>
            </Modal>
        </div>
    );
};

export default Profile;
