/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
/* eslint-disable react/no-unknown-property */
function FormThree({ formData, onFormDataChange }) {
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormDataChange({ ...formData, [name]: value });
        setError(null)
    };
  return (
    <div className='mt-5'>
        <form className="w-full">
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Name
                    </label>
                    <input name="emName" value={formData.emName} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Name"/>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Relation
                    </label>
                    <input name="emRelation" value={formData.emRelation} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Relationship"/>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Email Id
                    </label>
                    <input name="emEmail" value={formData.emEmail} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="email" placeholder="Email Id"/>
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Phone number
                    </label>
                    <input name="emContact" value={formData.emContact} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="tel" placeholder="number"/>
                </div>
                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Address
                    </label>
                    <input name="emAddress" value={formData.emAddress} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Address"/> 
                </div>
            </div>
            <div className="flex my-8">
                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold flex items-center justify-center text-blue-500">Educational Qualification</p>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Academics % in 10th
                    </label>
                    <input name="sslc" value={formData.sslc} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Academics % in 10th"/> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Academics % in 12th
                    </label>
                    <input name="plusTwo" value={formData.plusTwo} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Academics % in 12th"/> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Academics % in Diploma
                    </label>
                    <input name="diploma" value={formData.diploma} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Academics % in Diploma"/> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Academics % in UG
                    </label>
                    <input name="ug" value={formData.ug} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Academics % in UG"/> 
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Academics % in PG
                    </label>
                    <input name="pg" value={formData.pg} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Academics % in PG"/> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Ielts or elp
                    </label>
                    <input name="ielts" value={formData.ielts} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Language test" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Highest Education
                    </label>
                    <input name="highestEducation" value={formData.highestEducation} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Highest Education" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Graduation Year
                    </label>
                    <input name="graduation" value={formData.graduation} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder='Passout year' />
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        No Of Backlogs
                    </label>
                    <input name="backlogs" value={formData.backlogs} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="backlogs"/> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Work Experience
                    </label>
                    <input name="workExperience" value={formData.workExperience} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="experience" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Gap If Any
                    </label>
                    <input name="gap" value={formData.gap} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="education gap" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Visa Refusals
                    </label>
                    <input name="visaRefusal" value={formData.visaRefusal} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='visa rejections' />
                </div>
            </div>
        </form>
    </div>
  )
}

export default FormThree
