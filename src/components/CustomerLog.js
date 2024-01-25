import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CustomerLog() {
    const [fileList,setFileList] = useState([]);
    useEffect(() =>{
        const customerLogApi = process.env.REACT_APP_CUSTOMER_LOG_API;
        
        const fetchFiles = async() =>{
            try {
                  let res = await fetch(`${customerLogApi}`);
                  res = await res.json();
                  setFileList(res);
              } catch (error) {
                // Handle errors here
                console.error("Error during fetch:", error);
              }
        }

        fetchFiles();
    },[])
  return (
    <>
        <div className='w-[100%] mx-auto my-6'>
            <div className='flex flex-wrap'>
                {
                    fileList.map((file,index) => {
                        let fileName = file.split("/");
                        fileName = fileName[1];
                        return(
                            <Link to={`/customer-record/${fileName}`} className='relative pb-5' key={index}>
                                <svg className='drop-shadow-lg' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                    <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path><path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
                                </svg>
                                <div className='absolute left-[18px] bottom-12 text-xs font-bold text-gray-600'>
                                    {fileName.replace(".json"," ")}
                                </div>
                            </Link>
                        ) 
                    })
                }
                
            </div>
        </div>
    </>
  )
}
