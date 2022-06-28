import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import url from '../helpers/url';
import { FaExclamationTriangle, FaRegCheckCircle } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';

export default function ManageCategory() {

  const [category, setCategory] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {

    axios.get(url+'/api/category')
    .then(function (result) {
      setCategory(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    if(error || success) {
      const timeout=setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timeout);
    }

  },[error, success]);

  function deleteCategory(id) {
    axios.delete(url+'/api/category/'+id)
    .then(function (result) {
      if(result.data.error){
        setError(result.data.error);
      }
      if(result.data.success){
        setSuccess(result.data.success);
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  return (
    <>
      <div className="w-full felx justify-center">
        <div className="border shadow-xl pt-6 sm:rounded-lg">
          <p className="text-red-600 text-lg md:text-3xl w-full flex justify-center"><u><b>Manage Category</b></u></p>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left mt-4">
              <thead className="text-xs text-white uppercase bg-navblue">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {category && 
                  category.map((item, index) => {
                    return (
                      <tr key={index} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {index+1}
                        </th>
                        <td className="px-6 py-4">
                          {item.category}
                        </td>
                        <td className="px-6 py-4">
                          <Link href={"/editCategory/"+item._id}><button className="flex bg-blue-700 hover:bg-blue-800 text-white py-1 rounded-md px-2"><FiEdit className="mt-0.5 mr-1"/> Edit</button></Link>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteCategory(item._id)} className="flex bg-red-700 hover:bg-red-800 text-white py-1 rounded-md px-2"><FaRegTrashAlt className="mt-0.5 mr-1"/> Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          {error &&
            <div id="alert-2" className="flex fixed right-0 bottom-0 p-4 mt-4 bg-red-300 rounded-lg" role="alert">
              <FaExclamationTriangle className="flex-shrink-0 w-5 h-5 text-red-700"/>
              <div className="ml-3 text-sm font-medium text-red-700">
                {error}
              </div>
              <button type="button" className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:text-red-400 inline-flex h-8 w-8" data-collapse-toggle="alert-2" aria-label="Close">
                <FaWindowClose onClick={()=>setError("")} />
              </button>
            </div>
          }
          {success && 
            <div id="alert-3" className="flex fixed right-0 bottom-0 p-4 mt-4 bg-green-300 rounded-lg" role="alert">
              <FaRegCheckCircle className="flex-shrink-0 w-5 h-5 text-green-700"/>
              <div className="ml-3 text-sm font-medium text-green-700">
                {success}
              </div>
              <button type="button" className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:text-red-400 inline-flex h-8 w-8">
                <FaWindowClose onClick={()=>setSuccess("")} />
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}
