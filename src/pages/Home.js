import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../css/Home.css';


function Home() {
  return (
    <div className="home-container"  data-aos="fade-up">
      <Card className="clinic-card" title="Welcome to Our Dental Clinic">
        <p>
        At RVT Dental Clinic, we're dedicated to providing you with the highest quality dental care in a warm and welcoming environment.
        Our team of experienced and compassionate professionals is committed to helping you achieve and maintain a healthy, beautiful smile for life.
        </p>
        <p>
        From routine cleanings and preventive care to advanced restorative and cosmetic treatments, we offer a comprehensive range of services to meet all of your dental needs.
        Whether you're visiting us for a routine check-up or a complete smile makeover, you can trust that you're in good hands.
        </p>
      </Card>
      <Card className="advertisement-card" title="Book Your Appointment Today!">
        <p>
        Are you ready to achieve the smile of your dreams? Look no further than RVT Dental Clinic! 
        Our team of skilled dentists is here to help you achieve optimal oral health and confidence with our comprehensive range of dental services.
        </p>
        <p>
        ✨ Why Choose Us?
        </p>
        <p>
        👩‍⚕️ Experienced Dentists: Our team consists of highly trained and experienced dental professionals who are dedicated to providing exceptional care.
        </p>
        <p>
        🏥 State-of-the-Art Facilities: We utilize the latest dental technology and techniques to ensure the highest quality of care for our patients.
        </p>
        <p>
        😁 Personalized Treatment: We understand that every patient is unique, which is why we create customized treatment plans tailored to your individual needs and goals.
        </p>
        <p>
        💼 Convenient Appointments: With flexible scheduling options, including evenings and weekends, we make it easy for you to fit dental care into your busy lifestyle.
        </p>
        <p>Call RVT Dental Clinic at '8-7000' or view our services to schedule your appointment online. Your smile transformation starts here!</p>
        <Link to="/services">
          <Button type="primary">Book Now</Button>
        </Link>
      </Card>
    </div>
  );
}

export default Home;
