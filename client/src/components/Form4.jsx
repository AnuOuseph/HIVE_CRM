/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
/* eslint-disable react/no-unknown-property */
function FormFour({ formData, onFormDataChange }) {
    const [error, setError] = useState(null)
    const [admin, setAdmin] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormDataChange({ ...formData, [name]: value });
        setError(null)
    }; 
    const leadStages = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","T13","T14","T15","T16","T17","T18","T19"];
    const leadSources = [{name:"LinkedIn",value:"linkedin"},{name:"Instagram",value:"instagram"},{name:"FaceBook",value:"facebook"},{name:"Events",value:"events"},{name:"Referal by friend", value:"referalbyFriend"},{name:"Referal by Alumni", value:"referalbyAlumni"},{name:"Referal by BA", value:"referalbyBA"}];

    useEffect(() => {
        const apiPromises = [
          axios.get("http://localhost:5000/api/admin/getAllAdmins"),
        ];
        Promise.all(apiPromises).then((responses) => {
          const [
            adminData,
          ] = responses;
          setAdmin(adminData?.data?.admins);
        });
      }, []); 
      
  return (
    <div className='mt-5'>
        <form className="w-full">
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Preferred Country
                    </label>
                    <input name="preCountry" value={formData.preCountry} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Country"/>
                    
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Preferred Program
                    </label>
                    <input name="preProgram" value={formData.preProgram} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Program"/>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Preferred Intake
                    </label>
                    <input name="preIntake" value={formData.preIntake} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Intake"/>
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Course Duration
                    </label>
                    <input name="courseDuration" value={formData.courseDuration} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Course Duration"/>
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Preferred Level of Education
                    </label>
                    <input name="preEducation" value={formData.preEducation} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Education level"/>
                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Preferred Institution
                    </label>
                    <input name="preInstitution" value={formData.preInstitution} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" placeholder="Institution"/>
                </div>
            </div>
            <div className="flex my-8">
                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold flex items-center justify-center text-blue-500">Application Analysis</p>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Lead Stage
                    </label>
                    <div className="relative">
                        <select name="leadStage" value={formData.leadStage} onChange={handleChange} className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 md:mb-5 rounded leading-tight focus:outline-none bg-white border-gray-500" >
                            <option value="" disabled> Lead Stage </option>
                            {leadStages.map((item) => (
                                <option key={item} value={item}>
                                {item}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    {/* <input name="leadStage" value={formData.leadStage} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="lead stage Eg:TN3"/> */}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Lead Status
                    </label>
                    <div className="relative">
                        <select name="leadStatus" value={formData.leadStatus} onChange={handleChange} className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white border-gray-500" >
                            <option value="" disabled> Lead Status </option>
                            <option>Hot</option>
                            <option>Cold</option>
                            <option>Warm</option>
                            <option>Enrolled</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Comments
                    </label>
                    <input name="comments" value={formData.comments} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="comments"/>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Lead Source
                    </label>
                    <div className="relative">
                        <select name="leadSource" value={formData.leadSource} onChange={handleChange} className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white border-gray-500" >
                            <option value="" disabled> Lead Source </option>
                            {leadSources.map((item) => (
                                <option key={item.index} value={item.value}>
                                {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    {/* <input name="leadSource" value={formData.leadSource} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="lead source"/>   */}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Lead Assigned
                    </label>
                    <div className="relative">
                        <select name="leadAssigned" value={formData.leadAssigned} onChange={handleChange} className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white border-gray-500" >
                            <option value="" disabled> Lead Assigned </option>
                            {admin.map((item) => (
                                <option key={item._id} value={item._id}>
                                {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    {/* <input name="leadAssigned" value={formData.leadAssigned} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="lead assigned"/> */}
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Follow Ups
                    </label>
                    <input name="followUps" value={formData.followUps} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="tel" placeholder="Follow Ups"/> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Last Followed
                    </label>
                    <input name="lastFollowed" value={formData.lastFollowed} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="last followed"/>
                </div>
            </div>
        </form>
    </div>
  )
}

export default FormFour
