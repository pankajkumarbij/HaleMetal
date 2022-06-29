import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { FaExclamationTriangle, FaRegCheckCircle } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import axios from 'axios';
import url from '../../helpers/url';
import NavBar from '../../components/navbar';

export default function EditCategory() {

  const [category, setCategory]=useState("");
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {

    axios.get(url+'/api/category/'+id)
    .then(function (result) {
      setCategory(result.data[0].category);
    })
    .catch(function (error) {
      console.log(error);
    });

    if(error || success) {
      const timeout=setTimeout(() => {
        setError("");
        setSuccess("");
        console.log("called");
      }, 3000);
      return () => clearTimeout(timeout);
    }

  },[error, success]);
    
  function UpdateCategory() {
    axios.put(url+'/api/category/'+id, {
      category
    })
    .then(function (result) {
      if(result.data.error){
        setError(result.data.error);
      }
      if(result.data.success){
        setSuccess(result.data.success);
        router.push("/adminDashboard/manageCategories");
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  return (
    <>
      <NavBar/>
      <div className="w-full felx justify-center px-4 pt-20 md:px-52 md:pt-32 mt-12 font-serif">
        <div className="border shadow-xl p-6 sm:rounded-lg">
          <p className="text-red-600 text-lg md:text-3xl w-full flex justify-center"><u><b>Edit Category</b></u></p>
          <div className="mb-4 mt-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="category">
              Category Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="category" type="text" placeholder="category name" value={category} onChange={(e)=>setCategory(e.target.value)} />
          </div>
          <button className="mb-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full" type="button" onClick={()=> UpdateCategory()} >
            Update Category
          </button>
          {error &&
            <div id="alert-2" className="flex p-4 mt-4 bg-red-300 rounded-lg" role="alert">
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
            <div id="alert-3" className="flex p-4 mt-4 bg-green-300 rounded-lg" role="alert">
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
  );
}