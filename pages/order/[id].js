import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AiOutlineCaretRight } from 'react-icons/ai';
import axios from 'axios';
import url from '../../helpers/url';
import NavBar from '../../components/navbar';

export default function Order() {

  const [order, setOrder] = useState();
  const [more, setMore] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {

    if(id){
      axios.get(url+'/api/order/'+id)
      .then(function (result) {
        setOrder(result.data[0]);
        result.data[0].product.map((item) => {
          more.push(0);
        })
        console.log(result.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  },[]);

  function changeMore(p, index){
    const values = [...more];
    values[index] = parseInt(p);
    setMore(values);
  }

  return (
    <>
      <NavBar/>
      <div className="w-full felx justify-center mt-12 font-serif">
        <div className="pt-6 pb-6 sm:rounded-lg">
          <p className="text-red-600 text-lg md:text-3xl w-full flex justify-center"><u><b>Order Details</b></u></p>
          {order && order.vehicleType &&
          <div className="bg-white rounded-lg px-4">
            <div className="w-full felx justify-center">
              <div className="container mx-auto md:w-10/12">
                <p className="text-lg font-bold text-gray-700 uppercase bg-gray-200 p-3 rounded-t-lg mt-4">Transport & Labour</p>
                <div className="border shadow-md rounded-lg pb-2 px-2 pt-2 mt-4">
                  <div className="flex justify-between w-full">
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Vehicle Number">
                        Vehicle Number
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Vehicle Number" type="text" placeholder="Vehicle Number" value={order.vehicleNumber} />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Vehicle Type">
                        Vehicle Type
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Vehicle Type" type="text" placeholder="Vehicle Type" value={order.vehicleType} />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Driver Name">
                        Driver Name
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Driver Name" type="text" placeholder="Driver Name" value={order.driverName} />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Driver Mobile">
                        Driver Mobile
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Driver Mobile" type="number" placeholder="Driver Mobile" value={order.driverMobile} />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Transport Charge">
                        Transport Charge
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Transport Charge" type="text" placeholder="Transport Charge" value={order.transportCharge} />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Labour Charge">
                        Labour Charge
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Labour Charge" type="text" placeholder="Labour Charge" value={order.labourCharge} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          <div className="w-full felx justify-center">
            <div className="md:flex container mx-auto md:w-10/12">
              <div className="grid gap-4 pt-4 px-4 md:pt-8 md:px-2 md:w-8/12">
                <p className="text-lg font-bold text-gray-700 uppercase bg-gray-200 p-3 rounded-t-lg">Address</p>
                {order && 
                  <div className="bg-white rounded-lg border shadow-md pb-2 px-2">
                    <div className="flex justify-between w-full">
                      <div className="mb-2 mt-2 w-1/2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Pin Code">
                          Pin Code
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Pin Code" type="number" placeholder="Pin Code" value={order.pinCode}disabled />
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="mb-2 mt-2 w-1/2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Address">
                          Address
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Address" type="text" placeholder="Address" value={order.address}disabled />
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="mb-2 mt-2 w-1/2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Landmark">
                          Landmark
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Landmark" type="text" placeholder="Landmark" value={order.landmark} disabled />
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="mb-2 mt-2 w-1/2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="District">
                          District
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="District" type="text" placeholder="District" value={order.district} disabled />
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="mb-4 mt-2 w-1/2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="State">
                          State
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="State" type="text" placeholder="State" value={order.state} disabled />
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="mb-4 mt-2 w-1/2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Country">
                          Country
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Country" type="text" placeholder="Country" value={order.country} disabled />
                      </div>
                    </div>
                  </div>
                }
                <p className="text-lg font-bold text-gray-700 uppercase bg-gray-200 p-3 rounded-t-lg">Order Items</p>
                {order && order.product.map((item, index) => {
                  return (
                    <div key={index} className="bg-white rounded-lg border shadow-md pb-2 px-2">
                      <div className="flex flex-col items-center md:flex-row md:w-full">
                        <img className="object-cover w-full h-80 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg" src={item.product.image ? item.product.image : "/logo.png"} alt=""/>
                        <div className="flex flex-col justify-between w-full leading-normal">
                          <div className="p-4">
                            <h5 className="flex justify-center mb-2 text-xl font-bold tracking-tight text-gray-800">{item.product.productName}</h5>
                            <div className="flex justify-between">
                              <h5 className="mb-2 text-lg text-gray-600">{item.product.category}</h5>
                              <h5 className="mb-2 text-lg text-gray-600">Min Qty: {item.product.min_qty}</h5>
                            </div>
                            <div className="flex justify-between">
                              <h5 className="mb-2 text-sm text-gray-600">Size: {item.product.size}</h5>
                              <h5 className="mb-2 text-sm text-gray-600">Material: {item.product.material}</h5>
                            </div>
                            <div className="flex justify-between">
                              <h5 className="mb-2 text-lg font-bold text-gray-600">Price: {item.product.price} / {item.product.unit}</h5>
                              <h5 className="mb-2 text-sm text-gray-600">Brand: {item.product.brand}</h5>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                {more[index]==0 ?
                                  <button onClick={() => changeMore(1, index)} className="text-blue-700 flex">View More&nbsp;<AiOutlineCaretRight className="mt-1"/></button>
                                  :
                                  <button onClick={() => changeMore(0, index)} className="text-blue-700 flex">View Less&nbsp;<AiOutlineCaretRight className="mt-1"/></button>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {more[index]==1 &&
                        <div className="container mx-auto pb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.product.others &&
                            item.product.others.map((it, ind) => {
                              return (
                                <button key={ind} className="border border-gray-500 text-gray-500 py-2 px-4 rounded-full">
                                  {it}
                                </button>
                              )
                            })
                          }
                          </div>
                        </div>
                      }
                    </div>
                  )
                })}
              </div>
              <div className="w-full md:w-4/12 pt-4 px-4 md:pt-8 md:px-2">
                <p className="text-lg font-bold text-gray-700 uppercase bg-gray-200 p-3 rounded-t-lg">Personal</p>
                <div className="relative overflow-x-auto sm:rounded-lg mt-4">
                  {order && 
                    <div className="bg-white rounded-lg border shadow-md pb-2 px-2">
                      <div className="mb-4 mt-2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
                          Full Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="name" type="text" placeholder="name" value={order.name} disabled />
                      </div>
                      <div className="mb-4 mt-2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Mobile">
                          Mobile Number
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Mobile" type="text" placeholder="Mobile" value={order.mobileNumber} disabled />
                      </div>
                      <div className="mb-4 mt-2">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Email">
                          Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Email" type="text" placeholder="Email" value={order.email} disabled />
                      </div>
                    </div>
                  }
                  <table className="w-full text-sm text-left text-gray-5000 mt-4">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-200">
                      <tr>
                        <th colSpan="2" scope="col" className="px-6 py-3">
                          Payment Summary
                        </th>
                      </tr>
                    </thead>
                    {order &&
                      <tbody>
                        <tr className="bg-white border-b">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Sub Total
                          </th>
                          <td className="px-6 py-4">
                            {order.amount}
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Shipping Charge
                          </th>
                          <td className="px-6 py-4">
                            0
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Estimated Tax
                          </th>
                          <td className="px-6 py-4">
                            0
                          </td>
                        </tr>
                        <tr className="bg-white border-b border-gray-900">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Other
                          </th>
                          <td className="px-6 py-4">
                            0
                          </td>
                        </tr>
                        <tr className="bg-gray-200">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Total Payable Amount
                          </th>
                          <td className="px-6 py-4">
                            {order.amount}
                          </td>
                        </tr>
                      </tbody>
                    }
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}