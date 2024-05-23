/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

/* eslint-disable react/no-unknown-property */
function FormOne({ formData, onFormDataChange }) {
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormDataChange({ ...formData, [name]: value });
        setError(null)
    };
  return (
    <div className='mt-5'>
        <form className="w-full">
            <div className="flex text-sm flex-wrap -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Title
                    </label>
                    <div className="relative">
                        <select name="title" value={formData.title} onChange={handleChange} className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white border-gray-500" placeholder='Title'>
                            <option value="" disabled> Title </option>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Miss</option>
                            <option>Mrs.</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        First Name
                    </label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500" type="text" placeholder="First Name"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Middle Name
                    </label>
                    <input name="middleName" value={formData.middleName} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500" type="text" placeholder="Middle Name"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Last Name
                    </label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500"  type="text" placeholder="Last Name"/>
                </div>
            </div>
            <div className="flex text-sm flex-wrap -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Gender
                    </label>
                    <div className="relative">
                        <select name="gender" value={formData.gender} onChange={handleChange} className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white border-gray-500"  placeholder='Title'>
                            <option value="" disabled> Gender </option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Marital Status
                    </label>
                    <div className="relative">
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white border-gray-500" id="grid-state" placeholder='Title'>
                            <option value="" disabled> Marital Status </option>
                            <option>Common-law</option>
                            <option>Divorced</option>
                            <option>Married</option>
                            <option>Separated</option>
                            <option>Single</option>
                            <option>Widowed</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Date of Birth
                    </label>
                    <input name="dob" value={formData.dob} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500"  type="date" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Age
                    </label>
                    <input name="age" value={formData.age} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500"  type="tel" placeholder="Age"/>
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Email Address
                    </label>
                    <input name="email" value={formData.email} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white"  type="email" placeholder="Email Id"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Contact Number
                    </label>
                    <input name="number" value={formData.number} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500"  type="tel" placeholder="Number"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Country of Citizenship
                    </label>
                    <input name="country" value={formData.country} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500"  type="text" placeholder="Country"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Passport Number
                    </label>
                    <input name="passport" value={formData.passport} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Passport No"/>
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Expiry Date
                    </label>
                    <input name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="date" placeholder="Expiry Date"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        First Payment
                    </label>
                    <input name="expiryDate" value={formData.firstPayment} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="tel" placeholder="First Payment"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Second Payment
                    </label>
                    <input name="expiryDate" value={formData.secondPayment} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="tel" placeholder="Second Payment"/>
                </div>
            </div>
        </form>
    </div>
  )
}

export default FormOne
