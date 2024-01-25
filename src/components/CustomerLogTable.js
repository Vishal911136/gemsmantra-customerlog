import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function CustomerLogTable() {
  const tableRef = useRef(null);
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



  const downloadCsv = () => {
    // Step 1: Capture HTML table data
    const table = tableRef.current;

    // Step 2: Convert table data to CSV format
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvData = rows
      .map((row) =>
        Array.from(row.querySelectorAll('td, th'))
          .map((cell) => cell.innerText)
          .join(',')
      )
      .join('\n');

    // Step 3: Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    // Step 4: Create a download link for the Blob
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename.replace(".json","")}.csv`);

    // Step 5: Trigger a click event on the download link
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);


  };

  
  return (
    <>
    <div className='w-[95%] mx-auto'>
        <div className='flex p-5 justify-center gap-5 sticky top-0 bg-gray-200'>
          <Link to={`/Customer-record/${filename}`} type="button" className=" flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100 dark:text-gray-200">
                  <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                  </svg>
                  <span>Go back</span>
          </Link>

          <button className='px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100 dark:text-gray-200' onClick={downloadCsv}>
            Export to CSV
          </button>
        </div>
        <div className="flex flex-col overflow-x-auto ">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto " >
                <table ref={tableRef} className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium bg-white dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Name</th>
                      <th scope="col" className="px-6 py-4">Gender</th>
                      <th scope="col" className="px-6 py-4">DOB</th>
                      <th scope="col" className="px-6 py-4">TOB</th>
                      <th scope="col" className="px-6 py-4">Mobile</th>
                      <th scope="col" className="px-6 py-4">Email</th>
                      <th scope="col" className="px-6 py-4">Rudraksha</th>
                      <th scope="col" className="px-6 py-4">Gems</th>
                      <th scope="col" className="px-6 py-4">Bracelet</th>
                      <th scope="col" className="px-6 py-4">Address</th>
                    </tr>
                  </thead>
                  <tbody className='text-base bg-[#ffffff]'>
                    {
                      customerRecord.map((user,index) =>{
                        return (
                            <tr className="border-b dark:border-neutral-500" key={index}>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[150px] text-wrap">{user.name}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[150px] text-wrap">{user.gender}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[200px] text-wrap">{user.birth_date}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[150px] text-wrap">{user.birth_time}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[200px] text-wrap">{user.mobile}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[250px] text-wrap">{user.email}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[250px] text-wrap">{user.rudraksh[0].name}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[200px] text-wrap">{user.gems[0].name}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[300px] text-wrap">{user.bracelet[0].name} and {user.bracelet[1].name}</td>
                              <td className="whitespace-nowrap px-6 py-4 min-w-[300px] text-wrap">{user.birth_place}</td>
                            </tr>
                        )
                      })
                    }
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
