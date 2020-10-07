import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Confirm from './Confirm';

function Register() {
  const [errors, setErrors] = useState([]);
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
    const validateEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const onlyLettersRegex = /^[a-zA-Z]*$/;
    const onlyLettersAndNumbersRegex = /^[A-Za-z0-9]*$/;
    const onlyNumbersRegex = /^[0-9]*$/;

    let tempErrs = [];
    if (step === 1) {
      if (firstName.length < 1 || !onlyLettersRegex.test(firstName)) tempErrs.push("First name  must contain only letters");
      if (lastName.length < 1 || !onlyLettersRegex.test(lastName)) tempErrs.push( "Last name  must contain only letters.");
      if (userName.length < 1 || !onlyLettersAndNumbersRegex.test(userName)) tempErrs.push( "Username  must contain only letters and numbers.");
      if (email.length < 1) tempErrs.push( "Email required.");
      if (!validateEmailRegex.test(email)) tempErrs.push( "Email invalid.");
      if (password.length < 6) tempErrs.push( "Password needs to be at least 6 characters.");
      if (password !== confirmPassword) tempErrs.push( "Passwords must be identical.");
      
    } else if (step === 2) {
      if (birthDate.length < 1) tempErrs.push("Birth date required");
      if (country.length < 1 || !onlyLettersRegex.test(country)) tempErrs.push("Country must contain only letters");
      if (city.length < 1 || !onlyLettersRegex.test(city)) tempErrs.push("City must contain only letters");
      if (phoneNumber.length < 1 || !onlyNumbersRegex.test(phoneNumber)) tempErrs.push("Only numbers allowed in phone number.");
    }
    if (tempErrs.length === 0) {
      setStep(step + 1);
      setErrors([])
    } else {
      setErrors(tempErrs)
    }
    
  }

  const prevStep = () => {
    setStep(step - 1);
    setErrors([]);
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

  const multiForm = () => {
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

  const values = { firstName, lastName, userName, email, password, confirmPassword, birthDate, country, city, phoneNumber };

  return (
    <div>
      {multiForm()}
      <div>
        {errors && errors.map(err => (
          <p key={err}>{err}</p>
        ))}
      </div>
    </div>
  )
}

export default Register



 // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      //   email,
      
      // (/[^a-zA-Z -]/.test(fieldValue))