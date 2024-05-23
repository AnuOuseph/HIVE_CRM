/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import FormTWO from '../components/Form2';
import FormThree from '../components/Form3';
import FormFour from '../components/Form4';
import FormOne from '../components/Form1';
import { useNavigate } from "react-router-dom";
import {Instance} from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    dob: '',
    age: '',
    email: '',
    number: '',
    country: '',
    passport: '',
    expiryDate: '',
    address: '',
    state: '',
    city: '',
    pinCode: '',
    mailAddress: '',
    mailState: '',
    mailCity: '',
    mailPinCode: '',
    emName: '',
    emContact: '',
    emEmail: '',
    emRelation: '',
    emAddress: '',
    preCountry: '',
    preProgram: '',
    preIntake: '',
    highestEducation: '',
    preEducation: '',
    courseDuration: '',
    preInstitution: '',
    leadStage: 'T3',
    leadStatus: 'Enrolled',
    leadSource: '',
    leadAssigned: '',
    lastFollowed: '',
    followUps: '',
    comments: '',
    sslc: '',
    plusTwo: '',
    diploma: '',
    ug: '',
    pg: '',
    ielts: '',
    graduation: '',
    backlogs: '',
    workExperience: '',
    gap: '',
    visaRefusal: '',
    firstPayment: '',
    secondPayment: '',
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Instance.post("/api/admin/createLead", formData)
      const mess = res?.data?.message;
      setMessage(mess)
      setFormData({
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        maritalStatus: "",
        dob: "",
        age: "",
        email: "",
        number: "",
        country: "",
        passport: "",
        expiryDate: "",
        address: "",
        state: "",
        city: "",
        pinCode: "",
        mailAddress: "",
        mailState: "",
        mailCity: "",
        mailPinCode: "",
        emName: "",
        emContact: "",
        emEmail: "",
        emRelation: "",
        emAddress: "",
        preCountry: "",
        preProgram: "",
        preIntake: "",
        highestEducation: "",
        preEducation: "",
        preInstitution: "",
        courseDuration: '',
        leadStage: "",
        leadStatus: "",
        leadSource: "",
        leadAssigned: "",
        lastFollowed: "",
        followUps: "",
        comments: "",
        sslc: "",
        plusTwo: "",
        diploma: "",
        ug: "",
        pg: "",
        ielts: "",
        graduation: "",
        backlogs: "",
        workExperience: "",
        gap: "",
        visaRefusal: "",
        firstPayment: "",
        secondPayment: "",
      })
      toast.success("Lead Created");
      setTimeout(() => {
          navigate('/applications')
      }, 1000)
    } catch (err) {
      setError(err)
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <FormOne formData={formData} onFormDataChange={handleFormDataChange}/>
      case 2:
        return <FormTWO formData={formData} onFormDataChange={handleFormDataChange}/>;
      case 3:
        return <FormThree formData={formData} onFormDataChange={handleFormDataChange}/>;
      case 4:
        return <FormFour formData={formData} onFormDataChange={handleFormDataChange}/>;
      default:
        return null;
    }
  };

  return (
    <div style={{backgroundColor:"#f1f5f9"}}>
        <div style={{padding:"10px 0px"}} className='md:mx-5'>
        <ToastContainer />
            <div className="bg-white mx-2 my-2 py-4">
                <p className="text-md uppercase text-gray-700 font-medium px-4 py-2">New Student Profile</p>
                <hr className='my-2' />
                <div className="px-4 py-4">
                    {/* Step navigation circles and lines */}
                    <div className="flex items-center justify-between mb-1">
                        <StepCircle
                        step={1}
                        currentStep={currentStep}
                        onClick={handleStepClick}
                        />
                        <StepLine />
                        <StepCircle
                        step={2}
                        currentStep={currentStep}
                        onClick={handleStepClick}
                        />
                        <StepLine />
                        <StepCircle
                        step={3}
                        currentStep={currentStep}
                        onClick={handleStepClick}
                        />
                        <StepLine />
                        <StepCircle
                        step={4}
                        currentStep={currentStep}
                        onClick={handleStepClick}
                        />
                    </div>
                    <div className='bg-white flex justify-between pb-5'>
                        <p className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Personal Information</p>
                        <p className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Residential Address</p>
                        <p className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Emergency Contact</p>
                        <p className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Student Preferences</p>
                    </div>

                    {/* Current form based on the step */}
                    {renderForm()}

                    {/* Next button at the bottom */}
                    {currentStep < 4 ? (
                      <button onClick={handleNext} className="text-white py-1 px-4 bg-gray-800 rounded">
                        Next
                      </button>
                    ):
                      <button onClick={handleSubmit} className="text-white py-1 px-4 bg-gray-800 rounded">
                        Submit
                      </button>
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

const StepCircle = ({ step, currentStep, onClick }) => {
  const isActive = step === currentStep;

  return (
    <>
    <div className=''>
        <div
        className={`rounded-full h-8 w-8 flex ${isActive?`text-white`:`text-black`} font-medium items-center justify-center`}
        style={{backgroundColor:`${isActive? '#333' : 'white'}`, border: '1px solid #333'}}
        onClick={() => onClick(step)}
        >
        <span>{step}</span>
        </div>
    </div>
    </>
  );
};

const StepLine = () => {
  return (
    <div className="flex-1 h-1 bg-white border border-gray-300 mx-0 my-0" />
  );
};

export default FormWizard;
