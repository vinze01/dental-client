import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, DatePicker, TimePicker, Row, Col, Form, Select, notification } from 'antd';
import '../css/Services.css';

const { Option } = Select;

function Services() {
  const [listOfService, setListOfService] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form] = Form.useForm();
  const [doctorUsers, setDoctorUsers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/services`).then((response) => {
      setListOfService(response.data);
    });

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/users/role/DOCTOR`)
      .then((response) => {
        setDoctorUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users by role:', error);
      });

  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedDoctor(null);
    form.resetFields();
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    console.log('Selected Date:', dateString);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(time);
    console.log('Selected Time:', timeString);
  };

  const handleDoctorSelectChange = (value) => {
    setSelectedDoctor(value);
    console.log('Selected Doctor:', value);
  };

  const handleFormSubmit = () => {
    form.validateFields()
      .then(values => {
        const formattedTime = selectedTime ? selectedTime.format('HH:mm:ss') : null;
        const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD') : null;

        values.time = formattedTime;
        values.date = formattedDate;
        values.doctorId = selectedDoctor;
        values.serviceId = selectedService.id;
        
        console.log('Form Values:', values);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/appointments/schedule`, values, {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        })
          .then((response) => {
            console.log('response', response);
            if (response.data.error) {
              notification.error({
                message: 'Error',
                description: response.data.error,
              });
            } else {
              notification.success({
                message: 'Success',
                description: 'Appointment successful! Please check your email for more information.',
              });
            }
            closeModal();
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
            notification.error({
              message: 'Error',
              description: 'Failed to submit the form. Please try again later.',
            });
          });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };


  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 8 || i > 17) {
        hours.push(i);
      }
    }
    return hours;
  };

  const disabledMinutes = () => {
    return [];
  };

  return (
    <div className="services-container" data-aos="fade-up">
      {listOfService.map((service, key) => (
        <div className="service" key={key} onClick={() => handleServiceClick(service)}>
          <div className="title">{service.name}</div>
          <div className="body">{service.description}</div>
          <div className="footer">Set an appointment</div>
        </div>
      ))}

      <Modal
        title={selectedService?.name}
        open={isModalOpen}
        onOk={handleFormSubmit}
        onCancel={closeModal}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <p>{selectedService?.description}</p>
          </Col>
          <Col span={24}>
            <Form form={form} layout="vertical">
              <Form.Item
                name="date"
                label="Select Date"
                rules={[{ required: true, message: 'Please select a date!' }]}
              >
                <DatePicker onChange={handleDateChange} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="time"
                label="Select Time"
                rules={[{ required: true, message: 'Please select a time!' }]}
              >
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  onChange={handleTimeChange}
                  style={{ width: '100%' }}
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                />
              </Form.Item>
              <Form.Item
                name="doctor"
                label="Select Doctor"
                rules={[{ required: true, message: 'Please select a doctor!' }]}
              >
                <Select onChange={handleDoctorSelectChange} style={{ width: '100%' }} allowClear>
                  {doctorUsers.map((doctor) => (
                    <Option key={doctor.id} value={doctor.id}>Dr. {doctor.firstName} {doctor.lastName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Services;
