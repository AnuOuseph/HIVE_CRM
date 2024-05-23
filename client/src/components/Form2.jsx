/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
/* eslint-disable react/no-unknown-property */
function FormTWO({ formData, onFormDataChange }) {
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormDataChange({ ...formData, [name]: value });
        setError(null)
    };
  return (
    <div className='mt-5'>
        <form className="w-full">
            <div className="flex my-6">
                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold flex items-center justify-center text-blue-500">Address as in passport</p>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Address
                    </label>
                    <input name="address" value={formData.address} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Address"/> 
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Country
                    </label>
                    <input name="country" value={formData.country} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Contry" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Province/ State
                    </label>
                    <input name="state" value={formData.state} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="state" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        City/ Town
                    </label>
                    <input name="city" value={formData.city} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="city" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Postal/ Zip Code
                    </label>
                    <input name="pinCode" value={formData.pinCode} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='Pin code' />
                </div>
            </div>
            <div className="flex my-8">
                <p className="block uppercase tracking-wide text-gray-700 text-sm font-bold flex items-center justify-center text-blue-500">Mailing Address (Current Residence)</p>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4 flex items-center justify-center text-blue-500">
                    <input type="checkbox"className="mx-2" />
                    Same as above
                </label>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Address
                    </label>
                    <input name="mailAddress" value={formData.mailAddress} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Address"/> 
                </div>
            </div>
            <div className="flex flex-wrap text-sm -mx-3 md:mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Country
                    </label>
                    <input name="country" value={formData.country} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Contry" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Province/ State
                    </label>
                    <input name="mailState" value={formData.mailState} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="state" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        City/ Town
                    </label>
                    <input name="mailCity" value={formData.mailCity} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="city" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Postal/ Zip Code
                    </label>
                    <input name="mailPinCode" value={formData.mailPinCode} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='Pin code' />
                </div>
            </div>
        </form>
    </div>
  )
}

export default FormTWO
