# Dental Clinic Management System

Welcome to the Dental Clinic Management System! This application allows users to manage their dental appointments and profiles with ease. Below are the key functionalities that users can perform within this application.

## Features

### 1. User Signup
New users can create an account by signing up on the platform. This process requires filling out a form with their personal details such as username, password, first name, last name, address, contact number, email, and role (patient or doctor).

### 2. User Login
Registered users can log in to their account using their username and password. This grants them access to various features based on their role.

### 3. Manage Appointments
Users can view, edit and delete their scheduled appointments. This helps them keep track of their upcoming and past appointments with the dental clinic.

### 4. Manage Profile
Users can manage their profile information, including:
- **Edit Credentials:** Users can update their personal information such as name, address, contact number, email, and password.
- **Delete Account:** Users have the option to delete their account. Upon deletion, a confirmation email is sent to the user.

### 5. Schedule an Appointment
Users can schedule appointments through the offered dental services. This involves selecting a service, choosing a preferred date and time, and confirming the appointment.

### 6. Email Notifications
- **Signup Confirmation:** After successfully signing up, users will receive a confirmation email.
- **Appointment Confirmation:** Upon scheduling an appointment, both the patient and the selected doctor will receive a confirmation email with the appointment details.

## How to Use

### Signup
1. Navigate to the Signup page.
2. Fill in the required details.
3. Submit the form.
4. Check your email for a confirmation message.

### Login
1. Navigate to the Login page.
2. Enter your username and password.
3. Click on the "Login" button to access your account.

### View Appointments
1. After logging in, navigate to the "Dashboard" section.
2. View your scheduled appointments.

### Manage Profile
1. Navigate to the "Profile" section.
2. To edit your profile, update the desired fields and click the "Update" button.
3. To delete your account, click the "Delete Account" button and confirm the action. An email will be sent to you upon successful deletion.

### Schedule an Appointment
1. Navigate to the "Services" section.
2. Select the desired service.
3. Choose a preferred date, time and doctor.
4. Confirm the appointment. Both you and the selected doctor will receive an email confirmation.

## Technologies Used

- **Frontend:** React, Ant Design
- **Backend:** Node.js, Express.js
- **Database:** Sequelize ORM with MySQL
- **Email Service:** Nodemailer with SendGrid

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables for database connection and email service.
4. Run the application using `npm start`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
