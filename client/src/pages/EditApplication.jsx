/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import FormTWO from '../components/Form2';
import FormThree from '../components/Form3';
import FormFour from '../components/Form4';
import FormOne from '../components/Form1';
import { useNavigate, useParams } from "react-router-dom";
import {Instance} from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditApplication() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Instance.get(`/api/admin/getLeadById/${id}`);
        const leadData = res?.data?.lead;
        const dobDate = leadData?.dob ? new Date(leadData.dob).toISOString().split('T')[0] : null;
        const expDate = leadData?.expiryDate ? new Date(leadData.expiryDate).toISOString().split('T')[0] : '';
        const lastFollowDate = leadData?.lastFollowed ? new Date(leadData.lastFollowed).toISOString().split('T')[0] : '';
        setFormData({
          title: leadData?.title || "",
          firstName: leadData?.firstName || "",
          middleName: leadData?.middleName || "",
          lastName: leadData?.lastName || "",
          gender: leadData?.gender || "",
          maritalStatus: leadData?.maritalStatus || "",
          dob: dobDate || "",
          age: leadData?.age || "",
          email: leadData?.email || "",
          number: leadData?.number || "",
          country: leadData?.country || "",
          passport: leadData?.passport || "",
          expiryDate: expDate || "",
          address: leadData?.address || "",
          state: leadData?.state || "",
          city: leadData?.city || "",
          pinCode: leadData?.pinCode || "",
          mailAddress: leadData?.mailAddress || "",
          mailState: leadData?.mailState || "",
          mailCity: leadData?.mailCity || "",
          mailPinCode: leadData?.mailPinCode || "",
          emName: leadData?.emName || "",
          emContact: leadData?.emContact || "",
          emEmail: leadData?.emEmail || "",
          emRelation: leadData?.emRelation || "",
          emAddress: leadData?.emAddress || "",
          preCountry: leadData?.preCountry || "",
          preProgram: leadData?.preProgram || "",
          preIntake: leadData?.preIntake || "",
          highestEducation: leadData?.highestEducation || "",
          preEducation: leadData?.preEducation || "",
          courseDuration: leadData?.courseDuration || "",
          preInstitution: leadData?.preInstitution || "",
          leadStage: leadData?.leadStage || "",
          leadStatus: leadData?.leadStatus || "",
          leadSource: leadData?.leadSource || "",
          leadAssigned: leadData?.leadAssigned || "",
          lastFollowed: lastFollowDate || "",
          followUps: leadData?.followUps || "",
          comments: leadData?.comments || "",
          sslc: leadData?.sslc || "",
          plusTwo: leadData?.plusTwo || "",
          diploma: leadData?.diploma || "",
          ug: leadData?.ug || "",
          pg: leadData?.pg || "",
          ielts: leadData?.ielts || "",
          graduation: leadData?.graduation || "",
          backlogs: leadData?.backlogs || "",
          workExperience: leadData?.workExperience || "",
          gap: leadData?.gap || "",
          visaRefusal: leadData?.visaRefusal || "",
          firstPayment: leadData?.firstPayment || "",
          secondPayment: leadData?.secondPayment || "",
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
    }, [id]);

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
    leadStage: '',
    leadStatus: '',
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
      const res = await Instance.patch(`/api/admin/updateLead/${id}`, formData);
      const mess = res?.data?.message;
      toast.success("Lead updated succesfully");
      setTimeout(() => {
        navigate(`/applications/profile/${id}`)
      }, 1000)
      setMessage(mess)
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
                  <p className="text-xl font-medium md:px-10 px-4 py-4 md:py-8">Edit Student Profile</p>
                  <div className="md:px-10 px-4 py-2">
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
                          <button onClick={handleNext} className="text-white py-2 px-4 rounded" style={{backgroundColor:'#151f49'}}>
                              Next
                          </button>
                      ):
                      <button onClick={handleSubmit} className="text-white py-2 px-4 rounded" style={{backgroundColor:'#151f49'}}>
                          Submit
                      </button>
                      }
                  </div>
              </div>
          </div>
      </div>
    )
  }
  
  const StepCircle = ({ step, currentStep, onClick }) => {
    const isActive = step === currentStep;
  
    return (
      <>
      <div className=''>
        <div
          className={`rounded-full h-8 w-8 flex ${isActive?`text-white`:`text-black`} font-medium items-center justify-center`}
          style={{backgroundColor:`${isActive? '#151f49' : '#e2e8f0'}`}}
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
      <div className="flex-1 h-1 bg-gray-200 mx-0 my-2" />
    );
  };

export default EditApplication
