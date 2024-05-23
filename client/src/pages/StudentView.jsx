/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Instance } from "../App";

function StudentView() {
    const [lead, setLead] = useState({})
    const [dob, setDob] = useState()
    const [expDate, setExpDate] = useState()
    const [lastFollow, setLastFollow] = useState()
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Instance.get(`/api/admin/getLeadById/${id}`);
                setLead(res?.data?.lead)
                const leadData = res?.data?.lead;
                //dobdate
                const dobDate = leadData?.dob;
                const dobObject = new Date(dobDate);
                const year = dobObject.getFullYear();
                const month = String(dobObject.getMonth() + 1).padStart(2, '0'); 
                const day = String(dobObject.getDate()).padStart(2, '0');
                const formattedDob = `${day}-${month}-${year}`;
                setDob(formattedDob)
                //expirydate
                const expDate = leadData?.expiryDate;
                const expObject = new Date(expDate);
                const expYear = expObject.getFullYear();
                const expMonth = String(expObject.getMonth() + 1).padStart(2, '0'); 
                const expDay = String(expObject.getDate()).padStart(2, '0');
                const formattedExp = `${expDay}-${expMonth}-${expYear}`;
                setExpDate(formattedExp)
                //last followed
                const lastFollowDate = leadData?.lastFollowed;
                const lastObject = new Date(lastFollowDate);
                const lastYear = lastObject.getFullYear();
                const lastMonth = String(lastObject.getMonth() + 1).padStart(2, '0'); 
                const lastDay = String(lastObject.getDate()).padStart(2, '0');
                const formattedLast = `${lastDay}-${lastMonth}-${lastYear}`;
                setLastFollow(formattedLast)
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };
        fetchData();
    }, [id]);
  return (
    <div className="" style={{backgroundColor:"#f1f5f9"}}>
        <div className="md:flex justify-center" style={{padding:"20px 10px"}}>
            <div className="mx-4 my-2 md:w-[55%]">
                <div className="bg-white py-4">
                    <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2 px-10">{lead?.firstName} {lead?.middleName} {lead?.lastName}</p>
                    <hr className="my-2 mx-10"/>
                    <div className="px-10 py-2 bg-white">
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Name</p>
                            <p className="col-start-3 col-end-7">: {lead?.firstName} {lead?.middleName} {lead?.lastName}</p>
                        </div>
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Gender</p>
                            <p className="col-start-3 col-end-7">: {lead?.gender}</p>
                        </div>
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Marital Status</p>
                            <p className="col-start-3 col-end-7">: {lead?.maritalStatus}</p>
                        </div>
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> DOB</p>
                            <p className="col-start-3 col-end-7">: {lead?.dob ? dob : null} </p>
                        </div>
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Age</p>
                            <p className="col-start-3 col-end-7">: {lead?.age} </p>
                        </div>
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Email</p>
                            <p className="col-start-3 col-end-7">: {lead?.email}</p>
                        </div>
                        {/* <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Number</p>
                            <p className="col-start-3 col-end-7">: {lead?.number}</p>
                        </div> */}
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Country</p>
                            <p className="col-start-3 col-end-7">: {lead?.country}</p>
                        </div>
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Passport Number</p>
                            <p className="col-start-3 col-end-7">: {lead?.passport}</p>
                        </div>
                        <div className="grid grid-cols-6 font-medium py-1 text-sm">
                            <p className="col-start-1 col-end-3 font-light"> Expiry Date</p>
                            <p className="col-start-3 col-end-7">: {lead?.expiryDate ? expDate : null}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-4 px-10 my-4">
                    <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2">Emergency contact</p>
                    <hr className="my-2 "/>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Name</p>
                        <p className="col-start-3 col-end-7">: {lead?.emName} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Relation</p>
                        <p className="col-start-3 col-end-7">: {lead?.emRelation} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Email</p>
                        <p className="col-start-3 col-end-7">: {lead?.emEmail} </p>
                    </div>
                    {/* <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Number</p>
                        <p className="col-start-3 col-end-7">: {lead?.emContact} </p>
                    </div> */}
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Address</p>
                        <p className="col-start-3 col-end-7">: {lead?.emAddress} </p>
                    </div>
                </div>
                <div className="bg-white py-4 px-10 my-4">
                    <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2">Educational Qualification</p>
                    <hr className="my-2 "/>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Academics % in 10th</p>
                        <p className="col-start-3 col-end-7">: {lead?.sslc} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Academics % in 12th</p>
                        <p className="col-start-3 col-end-7">: {lead?.plusTwo} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Academics % in Diploma</p>
                        <p className="col-start-3 col-end-7">: {lead?.diploma} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Academics % in UG</p>
                        <p className="col-start-3 col-end-7">: {lead?.ug} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Academics % in PG</p>
                        <p className="col-start-3 col-end-7">: {lead?.pg} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Highest Level of Education</p>
                        <p className="col-start-3 col-end-7">: {lead?.highestEducation} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> IELTS or ELP</p>
                        <p className="col-start-3 col-end-7">: {lead?.ielts} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Graduation Year</p>
                        <p className="col-start-3 col-end-7">: {lead?.graduation} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> No of Backlogs</p>
                        <p className="col-start-3 col-end-7">: {lead?.backlogs} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Work Experience</p>
                        <p className="col-start-3 col-end-7">: {lead?.workExperience} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Gap If Any</p>
                        <p className="col-start-3 col-end-7">: {lead?.gap} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Visa Refusal</p>
                        <p className="col-start-3 col-end-7">: {lead?.visaRefusal} </p>
                    </div>
                </div>
            </div>
            <div className="mx-2 my-2">
                <div className="bg-white md:px-12 px-4 py-4 w-[100%]">
                    <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2">Lead Analysis</p>
                    <hr className="my-2"/>
                    <div className="grid grid-cols-3">
                        <div className="mx-1 md:px-4 px-2 py-2 my-1 rounded-lg text-semibold" style={{border:"1px solid #0068ff"}}>
                            <p style={{color:"#222"}} className="text-xs capitalize">Lead Stage:</p>
                            <p className="md:mx-1 py-1 rounded-lg text-white md:text-md text-sm text-bold text-center" style={{color:"#0068ff"}}>{lead?.leadStage}</p>
                        </div>
                        <div className=" mx-1 md:px-4 px-2 py-2 my-1 rounded-lg text-semibold" style={{border:"1px solid #0068ff"}}>
                            <p className="text-xs capitalize">Lead Status:</p>
                            <p className="md:mx-1 py-1 capitalize rounded-lg text-white md:text-md text-sm text-bold text-center" style={{color:"#0068ff"}}>{lead?.leadStatus}</p>
                        </div>
                        <div className=" mx-1 md:px-4 px-2 py-2 my-1 rounded-lg text-semibold" style={{border:"1px solid #0068ff"}}>
                            <p className="text-xs capitalize">Lead Source:</p>
                            <p className="md:mx-1 py-1 capitalize rounded-lg text-white md:text-md text-sm text-bold text-center" style={{color:"#0068ff"}}>{lead?.leadSource}</p>
                        </div>
                        <div className=" mx-1 md:px-4 px-2 py-2 my-1 rounded-lg text-semibold" style={{border:"1px solid #0068ff"}}>
                            <p className="text-xs capitalize">Assigned To:</p>
                            <p className="md:mx-1 py-1 capitalize rounded-lg text-white md:text-md text-sm text-bold text-center" style={{color:"#0068ff"}}>Test</p>
                        </div>
                        <div className=" mx-1 md:px-4 px-2 py-2 my-1 rounded-lg text-semibold" style={{border:"1px solid #0068ff"}}>
                            <p className="text-xs capitalize">Follow Ups:</p>
                            <p className="md:mx-1 py-1 capitalize rounded-lg text-white md:text-md text-sm text-bold text-center" style={{color:"#0068ff"}}>{lead?.followUps}</p>
                        </div>
                        <div className=" mx-1 md:px-4 px-2 py-2 my-1 rounded-lg text-semibold" style={{border:"1px solid #0068ff"}}>
                            <p className="text-xs capitalize">Last Follow:</p>
                            <p className="md:mx-1 py-1 capitalize rounded-lg text-white md:text-md text-sm text-bold text-center" style={{color:"#0068ff"}}>{lead?.lastFollowed ? lastFollow : null}</p>
                        </div>
                    </div>
                    <div className=" mx-1 md:px-4 px-2 py-2 my-1 rounded-lg text-semibold border" style={{border:"1px solid #0068ff"}}>
                        <p className="text-xs capitalize">Remarks:</p>
                        <p className="mx-1 py-0 rounded-lg text-white md:text-md text-sm text-bold text-center" style={{color:"#0068ff"}}><p>{lead?.comments}</p></p>
                    </div>
                </div>
                <div className="bg-white md:px-12 px-4 my-4 py-4 w-[100%]">
                    <div className="flex justify-between">
                        <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2">Documents</p>
                        <div className='flex items-center border border-gray-500 bg-gray-200 px-2 rounded-sm mx-2'>
                            <input type="file" id="fileInput" className='hidden absolute w-full h-full cursor-pointer' accept=".xlsx" />
                            <label htmlFor="fileInput" className="text-xs italic px-1 cursor-pointer" >Select Documents</label>
                            <button className='px-2 rounded cursor-pointer my-1' ><FontAwesomeIcon icon={faUpload} size="xs" /></button>
                        </div>
                    </div>
                    <hr className="my-2"/>
                    <div className=" mx-1 px-4 py-2 my-1 rounded-lg uppercase text-semibold border" style={{border:"1px solid #0068ff"}}>
                        <p className="text-xs mx-1 py-0 rounded-lg mx-1 py-0 rounded-lg italic">Remarks</p>
                    </div>
                </div>
                <div className="bg-white md:px-12 px-4 my-4 py-4 w-[100%]">
                    <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2">RESIDENTIAL ADDRESS AS IN PASSPORT</p>
                    <hr className="my-2"/>
                    <div className="mx-1 md:px-4 py-2 my-1">
                        <p className="text-xs md:text-sm md:mx-1 py-0 rounded-lg">{lead?.address}, {lead?.city}, {lead?.state}, {lead?.country}, {lead?.pinCode}</p>
                    </div>
                </div>
                <div className="bg-white md:px-12 px-4 my-4 py-4 w-[100%]">
                    <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2">CURRENT ADDRESS (MAILING)</p>
                    <hr className="my-2"/>
                    <div className="mx-1 md:px-4 py-2 my-1">
                        <p className="text-xs md:text-sm md:mx-1 py-0 rounded-lg">{lead?.mailAddress}, {lead?.mailCity}, {lead?.mailState}, {lead?.country}, {lead?.mailPinCode}</p>
                    </div>
                </div>
                <div className="bg-white py-4 md:px-10 px-4 my-4">
                    <p className="block uppercase tracking-wide text-sm font-semibold uppercase py-2">Student Preferrences</p>
                    <hr className="my-2 "/>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Preferred Country</p>
                        <p className="col-start-3 col-end-7">: {lead?.preCountry} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Preferred Program</p>
                        <p className="col-start-3 col-end-7">: {lead?.preProgram} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Preferred Intake</p>
                        <p className="col-start-3 col-end-7">: {lead?.preIntake} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Preferred University</p>
                        <p className="col-start-3 col-end-7">: {lead?.preInstitution} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Course Duration</p>
                        <p className="col-start-3 col-end-7">: {lead?.courseDuration} </p>
                    </div>
                    <div className="grid grid-cols-6 font-medium py-1 text-sm">
                        <p className="col-start-1 col-end-3 font-light"> Preferred Level of Education</p>
                        <p className="col-start-3 col-end-7">: {lead?.preEducation} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentView
