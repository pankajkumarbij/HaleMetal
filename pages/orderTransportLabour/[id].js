import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from '../../components/navbar';
import url from "../../helpers/url";
import { FaExclamationTriangle, FaRegCheckCircle, FaWindowClose } from 'react-icons/fa';

export default function OrderTransportLabour(){

  const [vehicleType, setVehicleType] = useState();
  const [vehicleNumber, setVehicleNumber] = useState();
  const [driverName, setDriverName] = useState();
  const [driverMobile, setDriverMobile] = useState();
  const [transportCharge, setTransportCharge] = useState();
  const [labourCharge, setLabourCharge] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const router = useRouter();
  const { id } = router.query;

  function Submit(){
    axios.put(url+'/api/orderTransportLabour/'+id, {
      vehicleType,
      vehicleNumber,
      driverName,
      driverMobile,
      transportCharge,
      labourCharge 
    })
    .then(function (result) {
      if(result.data.error){
        setError(result.data.error);
      }
      if(result.data.success){
        setSuccess(result.data.success);
        router.push('/adminDashboard/manageOrders');
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 

    axios.put(url+'/api/orderStatusUpdate/'+id, {
      status: 'In Transit',
    })
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
      <NavBar/>
      <div className="w-full flex justify-center mt-12 font-serif">
        <div className="grid pt-4 px-4 md:pt-8 md:px-2 md:w-8/12">
          <p className="text-lg font-bold text-gray-700 uppercase bg-gray-200 p-3 rounded-t-lg">Add Transport Labour</p>
          <div className="bg-white rounded-lg border shadow-md pb-2 px-4 pt-2 mt-2">
            <div className="mb-4 mt-2">
              <label for="Vehicle Type" className="block text-grey-darker text-sm font-bold mb-2">Vehicle Type</label>
              <select id="Vehicle Type" className="shadow bg-white border text-gray-darker rounded block w-full py-2 px-3" onChange={(e)=>setVehicleType(e.target.value)}>
                <option selected disabled>Choose Vehicle Type</option>
                <option value="Truck">Truck</option>
                <option value="Mini Truck">Mini Truck</option>
                <option value="Car">Car</option>
                <option value="Auto/Tampo">Auto/Tampo</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4 mt-2">
              <label className="block text-grey-darker text-sm font-bold mb-2" for="Vehicle Number">
                Vehicle Number
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Vehicle Number" type="text" placeholder="Vehicle Number" onChange={(e)=>setVehicleNumber(e.target.value)} />
            </div>
            <div className="flex justify-between w-full">
              <div className="mb-4 mt-2 w-1/2">
                <label className="block text-grey-darker text-sm font-bold mb-2" for="Driver Name">
                  Driver Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Driver Name" type="text" placeholder="Driver Name" onChange={(e)=>setDriverName(e.target.value)} />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="mb-4 mt-2 w-1/2">
                <label className="block text-grey-darker text-sm font-bold mb-2" for="Driver Mobile">
                  Driver Mobile
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Driver Mobile" type="number" placeholder="Driver Mobile" onChange={(e)=>setDriverMobile(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="mb-4 mt-2 w-1/2">
                <label className="block text-grey-darker text-sm font-bold mb-2" for="Transport Charge">
                  Transport Charge
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Transport Charge" type="text" placeholder="Transport Charge" onChange={(e)=>setTransportCharge(e.target.value)} />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="mb-4 mt-2 w-1/2">
                <label className="block text-grey-darker text-sm font-bold mb-2" for="Labour Charge">
                  Labour Charge
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Labour Charge" type="text" placeholder="Labour Charge" onChange={(e)=>setLabourCharge(e.target.value)} />
              </div>
            </div>
            <button className="mb-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full" type="button" onClick={()=> Submit()} >
              Assign
            </button>
          </div>
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
          <div id="alert-3" className="flex fixed right-0 bottom-0 w-full md:w-1/3 mb-2 md:mr-2 p-4 mt-4 bg-green-300 rounded-lg" role="alert">
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
    </>
  )
}