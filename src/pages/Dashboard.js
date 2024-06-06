import React, { useState, useEffect } from 'react';
import { Button, Table, notification, Modal, Form, DatePicker, TimePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import '../css/Dashboard.css';

const fetchAppointments = async (setAppointments) => {
    try {
        const response = await axios.get('http://localhost:3001/appointments/dashboard', {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            },
        });
        console.log('response.data', response.data);
        setAppointments(response.data.result);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
};

const handleEdit = (record, setModalVisible, setSelectedAppointment) => {
    console.log('Edit clicked for record:', record);
    setSelectedAppointment(record);
    setModalVisible(true);
};

const handleDelete = (record, fetchAppointments) => {
    console.log('Delete clicked for record:', record);
    axios.put(`http://localhost:3001/appointments/dashboard/delete/${record.id}`).then((response) => {
        console.log('response', response);
        notification.success({
            message: 'Success',
            description: response.data.message,
        });
        window.location.reload()
    }).catch((error) => {
        console.error('Error deleting appointment:', error);
        notification.error({
            message: 'Error',
            description: 'Failed to delete appointment. Please try again later.',
        });
    });
};

const columns = (setModalVisible, setSelectedAppointment, fetchAppointments) => [
    {
        title: 'Appointment Date',
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => (
            <span>{new Date(record.date).toLocaleDateString()}</span>
        ),
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (text, record) => (
            <span>{record.time}</span>
        ),
    },
    {
        title: 'Doctor',
        dataIndex: 'doctor',
        key: 'doctor',
        render: (text, record) => (
            <span>Dr. {record.doctor.firstName} {record.doctor.lastName}</span>
        ),
    },
    {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
        render: (text, record) => (
            <span>{record.service.name}</span>
        ),
    },
    {
        title: 'Action',
        render: (text, record) => (
            <span>
                <Button onClick={() => handleEdit(record, setModalVisible, setSelectedAppointment)}>Edit</Button>
                <Button onClick={() => handleDelete(record, fetchAppointments)} style={{ marginLeft: 8 }} danger>Delete</Button>
            </span>
        ),
    },
];

const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        if (i < 8 || i > 17) {
            hours.push(i);
        }
    }
    return hours;
};

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchAppointments(setAppointments);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/users/role/DOCTOR', {
                    headers: {
                        accessToken: localStorage.getItem('accessToken'),
                    },
                });
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedAppointment(null);
    };

    const handleModalOk = async (values) => {
        try {
            const response = await axios.put(`http://localhost:3001/appointments/dashboard/edit/${selectedAppointment.id}`, {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
                time: values.time.format('HH:mm:ss'),
                doctorId: values.doctor,
            });
            notification.success({
                message: 'Success',
                description: response.data.message,
            });
            setModalVisible(false);
            setSelectedAppointment(null);
            fetchAppointments(setAppointments);
        } catch (error) {
            console.error('Error editing appointment:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to edit appointment. Please try again later.',
            });
        }
    };

    return (
        <div className="dashboard-container">
            <div className="table-container">
                <h1>User Appointments</h1>
                <Table
                    columns={columns(setModalVisible, setSelectedAppointment, fetchAppointments)}
                    dataSource={appointments}
                    loading={loading}
                    bordered
                    rowKey="id"
                    scroll={{ x: 500, y: 600 }}
                />
            </div>
            <Modal
                title="Edit Appointment"
                open={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                {selectedAppointment && (
                    <Form
                        form={form}
                        onFinish={handleModalOk}
                        initialValues={{
                            date: moment(selectedAppointment.date),
                            time: moment(selectedAppointment.time, 'HH:mm:ss'),
                            doctor: selectedAppointment.doctor.id,
                        }}
                    >
                        <Form.Item label="Appointment Date" name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time!' }]}>
                            <TimePicker use12Hours format="h:mm a" disabledHours={disabledHours} />
                        </Form.Item>
                        <Form.Item label="Doctor" name="doctor" rules={[{ required: true, message: 'Please select a doctor!' }]}>
                            <Select style={{ width: 200 }}>
                                {doctors.map(doctor => (
                                    <Select.Option key={doctor.id} value={doctor.id}>Dr. {doctor.firstName} {doctor.lastName}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default Dashboard;
