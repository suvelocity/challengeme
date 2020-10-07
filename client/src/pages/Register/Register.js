import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Confirm from './Confirm';

function Register() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  }

  const prevStep = () => {
    setStep(step - 1);
  }

  const handleChange = input => e => {
    switch (input) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'userName':
        setUserName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;
      case 'birthDate':
        setBirthDate(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
    }
  }

  const values = { firstName, lastName, userName, email, password, confirmPassword, birthDate, country, city, phoneNumber };

  switch (step) {
    case 1: return (
      <UserDetails
        nextStep={nextStep}
        handleChange={handleChange}
        values={values}
      />
    );
    case 2: return (
      <PersonalDetails
        nextStep={nextStep}
        prevStep={prevStep}
        handleChange={handleChange}
        values={values}
      />
    );
    case 3: return (
      <Confirm
        prevStep={prevStep}
        values={values}
      />
    );
  }
}

export default Register
