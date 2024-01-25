import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function CustomerData() {
        const [customerRecord,setCustomerRecord] = useState([]);
        
        let {filename} = useParams();


        useEffect(() =>{
                const customerLogApi = process.env.REACT_APP_CUSTOMER_LOG_API;
                const fetchFilesData = async() =>{
                    try {
                          let res = await fetch(`${customerLogApi}/${filename}`);
                          res = await res.json();
                          setCustomerRecord(res);
                      } catch (error) {
                        // Handle errors here
                        console.error("Error during fetch:", error);
                      }
                }
        
                fetchFilesData();
        },[])

  return (
           <div className='max-w-[100%] mx-auto'>
                <div className='flex p-5 justify-center gap-5 sticky top-0 bg-[#e8e8e8]'>
                        <Link to="/" type="button" className=" flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100 dark:text-gray-200">
                                <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>Go back</span>
                        </Link>

                        <Link to={`/download/${filename}`} type="button" className="px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100 dark:text-gray-200">
                                <span>Download</span>
                        </Link>
                </div>
                <div className='flex flex-wrap mx-2 my-4 gap-2'>
                {
                        customerRecord.map((user,index) =>{
                                let classes = user.gender === "female" ? 'w-60 text-[12px] bg-pink-200 ps-2 p-2 flex flex-col rounded-md shadow-lg border-2 border-pink-500' : 'w-60 text-[12px] bg-teal-200 ps-2 p-2 flex flex-col rounded-md shadow-lg border-2 border-teal-500'; 
                                return(
                                        <>
                                        <div className={classes} key={index}>
                                                <label title='Birth date and time'>Time: {user.date}</label>
                                                <label title='Customer Name'>{user.name}</label>
                                                <label title='Mobile'>{user.mobile}</label>
                                                <label title='Email'>{user.email}</label>
                                                <label title='Gender'>{user.gender}</label>
                                                <label title='Birth Date'>{user.birth_date}</label>
                                                <label title='Purpose'>{user.purpose}</label>
                                                <label title='Body Weight'>{user.body_weight}</label>
                                                <label title='Location'>{user.birth_place}</label>
                                                <p className='font-semibold border-t-2 mt-auto border-gray-400'>Suggestions: </p>
                                                <div className='font-semibold text-[#861414]'>
                                                 <label>Rudraksha - {user.rudraksh[0].name} <br/> Gems - {user.gems[0].name}<br/> Bracelet - {user.bracelet[0].name}, {user.bracelet[1].name}</label>
                                                </div>
                                        </div>
                                        </>
                                )
                        })
                }
                </div>
           </div>
  )
}
