/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import axios from "axios";
import { faTasks, faCalendarDay, faCalendarWeek, faCalendarAlt, faArrowTrendUp, faArrowTrendDown, faCheck, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie,Line } from 'react-chartjs-2';
import {LinearScale,CategoryScale,BarElement,PointElement,LineElement,} from 'chart.js';
import { useSelector } from 'react-redux';
import AdminAnalysis from '../components/AdminAnalysis';
import {Instance} from '../App'


ChartJS.register(ArcElement, Tooltip, Legend,LinearScale,CategoryScale,BarElement,PointElement,LineElement);

function Dashboard() {
  const {user} = useSelector((state)=>state.user)

  // leads
  const [leadsToday, setLeadsToday] = useState(null);
  const [leadsThisMonth, setLeadsThisMonth] = useState(null);
  const [leadsThisWeek, setLeadsThisWeek] = useState(null);
  const [leads, setLeads] = useState([]);
  const [leadsPerMonth, setLeadsPerMonth] = useState([]);
  const [leadsPerStage, setLeadsPerStage] = useState([])
  const [leadSource, setLeadSource] = useState([])

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const leadsPerData = labels.map(month => {
    const matchingMonth = leadsPerMonth?.totalLeadsPerMonth?.find(entry => labels.indexOf(month) === entry._id.month - 1);
    return matchingMonth ? matchingMonth.total : 0;
  });
   
  const chartStageData = {
  labels: labels,
    datasets: [
      {
        type: 'line',
        label: 'Leads Per Stage',
        pointBackgroundColor: '#afdf36',
        borderColor: '#333',
        pointRadius: 5,
        borderWidth: 1,
        data: leadsPerData
      },
    ]
  }

  const stagelabels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12','T13','T14','T15','T16','T17','T18','T19'];
  const leadStageData = stagelabels.map(stage => {
  const matchingStage = leadsPerStage?.result?.find(entry => entry._id === stage);
    return matchingStage ? matchingStage.count : 0;
  });

  const colorCode = '#275347';
  const state = {
    data: {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12','T13','T14','T15','T16','T17','T18','T19'],
      datasets: [
        {
          fill: true,
          label: null,
          backgroundColor: colorCode,
          borderColor: colorCode,
          barPercentage: 0.5,
          categoryPercentage: 0.7,
          borderWidth: 2,
          borderRadius: 10,
          data: leadStageData
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          beginAtZero: false,
          ticks: {
            color: '#333',
          }
        },
        y: {
          grid: {
            display: false,
          },
          beginAtZero: true,
          ticks: {
            color: '#333',
          }
        }
      },
    }
  }

  // source pie chart
  const sourceData = {
    labels: ['LinkedIn', 'Facebook', 'Instagram', 'events', 'By Friend', 'By Alumni', 'By BA'],
    datasets: [
      {
        label: 'No of Leads',
        data: [
          leadSource?.inLeadCount,
          leadSource?.fbLeadCount,
          leadSource?.igLeadCount,
          leadSource?.evLeadCount,
          leadSource?.rbfLeadCount,
          leadSource?.rbaLeadCount,
          leadSource?.rbbLeadCount
        ],
        backgroundColor: [
          '#8b77ea',
          '#fbd3f5',
          '#74a0d5',
          '#c3d876',
          'rgba(138, 43, 226, 0.5)',
          'rgba(0, 104, 139, 0.5)',
          'rgba(255, 192, 203, 0.5)'
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
    options: {
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }
  };

  //status pie chart
  const data = {
    labels: ['Hot', 'Cold', 'Enrolled', 'Warm'],
    datasets: [
      {
        label: 'No of Leads',
        data: [
          leads?.hotLeadCount,
          leads?.coldLeadCount,
          leads?.enrolledLeadCount,
          leads?.warmLeadCount
        ],
        backgroundColor: [
          '#397968',
          '#d9f2ee',
          '#4fc4b1',
          '#9fd222',
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
    options: {
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }
  };

  useEffect(() => {
    const apiPromises = [
      Instance.get("/api/admin/totalLeads"),
      Instance.get("/api/admin/totalLeadsToday"),
      Instance.get("/api/admin/totalLeadsThisMonth"),
      Instance.get("/api/admin/totalLeadsThisWeek"),
      Instance.get("/api/admin/leadsPerMonth"),
      Instance.get("/api/admin/leadsPerStage"),
      Instance.get("/api/admin/leadSource"),
    ];
    Promise.all(apiPromises).then((responses) => {
      const [
        leadsData,
        leadsTodayData,
        leadsMonthData,
        leadsWeekData,
        leadsPerMnthData,
        leadsPerStageData,
        leadSources
      ] = responses;
      setLeads(leadsData?.data);
      setLeadsToday(leadsTodayData?.data);
      setLeadsThisMonth(leadsMonthData?.data);
      setLeadsThisWeek(leadsWeekData?.data);
      setLeadsPerMonth(leadsPerMnthData?.data);
      setLeadsPerStage(leadsPerStageData?.data);
      setLeadSource(leadSources?.data);
    });
  }, []);
  
  return (
    <div className="h-auto mb-5" style={{backgroundColor:"#f9fafc"}}>
      {user?.admin === true ?
      <>
      <div className="grid md:grid-cols-4" style={{padding:"10px 0px"}} >
        <div className="mx-2">
          <div className="rounded bg-white shadow border border-gray-300 mx-2 my-2 px-6 py-4" style={{}}>
            <div className='rounded-full h-10 w-10 flex justify-center items-center' style={{backgroundColor: '#FBEAE4'}}>
              <FontAwesomeIcon className='text-orange-600' icon={faTasks} style={{width:"16px",height:"16px"}}/>
            </div>
            <div className="flex justify-between">
              <div className="pt-2">
                <p className='text-xs font-medium uppercase text-gray-500 py-1'>Total Leads</p>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-4xl font-semibold text-gray-800'>{leads?.totalLeadCount}</p>
              <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faArrowUp} style={{width:"12px",height:"12px", color:'#fe6e49'}}/>
                <p className='text-orange-600 text-sm'>20%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <div className="rounded bg-white shadow border border-gray-300 mx-2 my-2 px-6 py-4" style={{}}>
            <div className='rounded-full h-10 w-10 flex justify-center items-center' style={{backgroundColor: '#FBEAE4'}}>
              <FontAwesomeIcon className='text-orange-600' icon={faCalendarDay} style={{width:"16px",height:"16px"}}/>
            </div>
            <div className="flex justify-between">
              <div className="pt-2">
                <p className='text-xs font-medium uppercase text-gray-500 py-1'>Daily Leads</p>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-4xl font-semibold text-gray-800'>{leadsToday?.totalLeadToday}</p>
              <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faArrowUp} style={{width:"12px",height:"12px", color:'#fe6e49'}}/>
                <p className='text-orange-600 text-sm'>20%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <div className="rounded bg-white shadow border border-gray-300 mx-2 my-2 px-6 py-4" style={{}}>
            <div className='rounded-full h-10 w-10 flex justify-center items-center' style={{backgroundColor: '#FBEAE4'}}>
              <FontAwesomeIcon className='text-orange-600' icon={faCalendarWeek} style={{width:"16px",height:"16px"}}/>
            </div>
            <div className="flex justify-between">
              <div className="pt-2">
                <p className='text-xs font-medium uppercase text-gray-500 py-1'>Weekly Leads</p>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-4xl font-semibold text-gray-800'>{leadsThisWeek?.totalLeadsThisWeek}</p>
              <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faArrowUp} style={{width:"12px",height:"12px", color:'#fe6e49'}}/>
                <p className='text-orange-600 text-sm'>20%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <div className="rounded bg-white shadow border border-gray-300 mx-2 my-2 px-6 py-4" style={{}}>
            <div className='rounded-full h-10 w-10 flex justify-center items-center' style={{backgroundColor: '#FBEAE4'}}>
              <FontAwesomeIcon className='text-orange-600' icon={faCalendarAlt} style={{width:"16px",height:"16px"}}/>
            </div>
            <div className="flex justify-between">
              <div className="pt-2">
                <p className='text-xs font-medium uppercase text-gray-500 py-1'>Monthly Leads</p>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-4xl font-semibold text-gray-800'>{leadsThisMonth?.totalLeadsThisMonth}</p>
              <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faArrowUp} style={{width:"12px",height:"12px", color:'#fe6e49'}}/>
                <p className='text-orange-600 text-sm'>20%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-2 md:flex'>
        <div className='p-4 md:w-[50%] h-[60%] bg-white border border-gray-300 shadow mx-2 my-2 rounded'>
            <p className='px-4 py-2 uppercase font-medium text-gray-600 mb-2'>Lead Status </p>
            <Bar
            type={"bar"}
            data={state.data}
            options={state.options}
          />
        </div>
        <div className='md:w-[50%] h-[60%] p-5 bg-white border border-gray-300 shadow mx-2 my-2 rounded'>
          <p className='px-4 py-2 uppercase font-medium text-gray-600 mb-2'>Leads Per Stages</p>
          <Line data={chartStageData} />
        </div>
      </div>
      <div className='px-2 md:flex'>
        <div className='p-5 md:w-[30%] bg-white shadow-md mx-2 my-2 rounded'>
          <p className='px-4 py-2 uppercase font-medium text-gray-600 mb-2'>Leads Per Stages</p>
           <Pie data={data} options={data.options} /> 
        </div>
        <div className='p-5 md:w-[30%] bg-white shadow-md mx-2 my-2 rounded'>
          <p className='px-4 py-2 uppercase font-medium text-gray-600 mb-2'>Leads Per Stages</p>
          <Pie data={sourceData} options={sourceData.options}/>
        </div>
        <div className="md:w-[40%]" style={{padding:"0px 10px",paddingBottom:"10px"}}>
        <div className="">
            <div className="bg-white rounded shadow shadow-md mx-4 my-2 px-6 py-4">
                <div className="flex justify-between">
                    <div className="">
                        <p className='text-sm font-medium uppercase text-gray-500 pt-2'> Leads Converted</p>
                        <p></p>
                    </div>
                    <div className='rounded-full h-12 w-12 flex justify-center items-center' style={{backgroundColor:"#a7f3d0"}}>
                        <FontAwesomeIcon icon={faCheck} style={{width:"20px",height:"20px"}}/>
                    </div>
                </div>
                <div>
                    <p className='text-3xl font-medium'>{leads?.perConvert} %</p>
                </div>
            </div>
        </div>
        <div className="">
            <div className="bg-white rounded shadow shadow-md mx-4 my-4 px-6 py-4">
                <div className="flex justify-between">
                    <div className="">
                      <p className='text-sm font-medium uppercase text-gray-500 pt-2'>Leads Upgraded</p>
                      <p></p>
                    </div>
                    <div className='rounded-full h-12 w-12 flex justify-center items-center' style={{backgroundColor:"#facaca"}}>
                        <FontAwesomeIcon icon={faArrowTrendUp} style={{width:"20px",height:"20px"}}/>
                    </div>
                </div>
                <div>
                    <p className='text-3xl font-medium'>{leads?.perUpgrad} %</p>
                </div>
            </div>
        </div>
        <div className="">
            <div className=" bg-white rounded shadow shadow-md mx-4 my-2 px-6 py-4">
                <div className="flex justify-between">
                    <div className="">
                        <p className='text-sm font-medium uppercase text-gray-500 pt-2'>Leads Degraded</p>
                        <p></p>
                    </div>
                    <div className='rounded-full h-12 w-12 flex justify-center items-center' style={{backgroundColor:"#ffe8b2"}}>
                        <FontAwesomeIcon icon={faArrowTrendDown} style={{width:"20px",height:"20px"}}/>
                    </div>
                </div>
                <div>
                    <p className='text-3xl font-medium'>{leads?.perDegrad} %</p>
                </div>
            </div>
        </div>
      </div>
    </div>
      </>
      :
      <>
      <div className="" style={{padding:"40px 30px"}}>
        <div className="px-10 py-2">
          <div className="">
            <AdminAnalysis/>
          </div>
        </div>
      </div>
      </>
    }
    </div>
  )
}

export default Dashboard
