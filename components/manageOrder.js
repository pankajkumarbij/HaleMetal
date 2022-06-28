import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import url from '../helpers/url';
import { FaExclamationTriangle, FaRegCheckCircle } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';

export default function ManageOrder(props) {

  const status = props.status;

  const [order, setOrder] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {

    axios.get(url+'/api/order')
    .then(function (result) {
      setOrder(result.data);
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

  function cancelOrder(id) {
    axios.put(url+'/api/orderStatusUpdate/'+id, {
      status: 'Cancel',
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

  function deliverOrder(id) {
    axios.put(url+'/api/orderStatusUpdate/'+id, {
      status: 'Delivered',
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
      <div className="w-full felx justify-center">
        <div className="flex justify-center">
        <div className="border shadow-xl pt-4 sm:rounded-lg w-full px-4 md:px-0">
          {status=="Order Placed" ?
            <p className="text-red-600 text-lg md:text-3xl w-full flex justify-center"><u><b>Manage Orders</b></u></p>
          :
            <p className="text-red-600 text-lg md:text-3xl w-full flex justify-center"><u><b>{status} Orders</b></u></p>
          }
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left mt-4">
              <thead className="text-xs text-white uppercase bg-navblue">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View
                  </th>
                  {(status!="Cancel" && status!="Delivered") &&
                    <th scope="col" className="px-6 py-3">
                      Cancel
                    </th>
                  }
                  {(status=="In Transit") &&
                    <th scope="col" className="px-6 py-3">
                      Deliver
                    </th>
                  }
                  {(status=="Order Placed") &&
                    <th scope="col" className="px-6 py-3">
                      Assign
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                {order && 
                  order.map((item, index) => {
                    if(item.status.toUpperCase().search(status.toUpperCase())!=-1)
                    return (
                      <tr key={index} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {index+1}
                        </th>
                        <td className="px-6 py-4">
                          {item.createdAt.substring(8,10)+"/"+item.createdAt.substring(5,7)+"/"+item.createdAt.substring(0,4)}
                        </td>
                        <td className="px-6 py-4">
                          {item.status}
                        </td>
                        <td className="px-6 py-4">
                          {item.payment_status}
                        </td>
                        <td className="px-6 py-4">
                          {item.amount}
                        </td>
                        <td className="px-6 py-4">
                          <Link href={"/order/"+item._id}><button className="flex bg-blue-700 hover:bg-blue-800 text-white py-1 rounded-md px-2"><AiFillEye className="mt-0.5 mr-1"/> View</button></Link>
                        </td>
                        {(status!="Cancel" && status!="Delivered") &&
                          <td className="px-6 py-4">
                            <button onClick={() => cancelOrder(item._id)} className="flex bg-red-700 hover:bg-red-800 text-white py-1 rounded-md px-2"><FaWindowClose className="mt-0.5 mr-1"/> Cancel</button>
                          </td>
                        }
                        {(status=="In Transit") &&
                          <td className="px-6 py-4">
                            <button onClick={() => deliverOrder(item._id)} className="flex bg-green-600 hover:bg-green-800 text-white py-1 rounded-md px-2"><TbTruckDelivery className="mt-0.5 mr-1"/> Deliver Now</button>
                          </td>
                        }
                        {(status=="Order Placed") &&
                          <td className="px-6 py-4">
                            <Link href={"/orderTransportLabour/"+item._id}><button className="flex bg-green-600 hover:bg-green-800 text-white py-1 rounded-md px-2"><TbTruckDelivery className="mt-0.5 mr-1"/> Assign</button></Link>
                          </td>
                        }
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
      </div>
    </>
  )
}
