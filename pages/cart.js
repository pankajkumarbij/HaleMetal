import axios from "axios";
import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaRegCheckCircle, FaRegTrashAlt, FaWindowClose, FaAddressBook } from 'react-icons/fa';
import { MdOutlinePayments, MdPayment } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineCaretRight, AiOutlineShoppingCart, AiOutlineCheckCircle, AiFillEye } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import NavBar from "../components/navbar";
import url from "../helpers/url";
import { user } from "../utils/user";
import Link from "next/link";

export default function Cart() {

  const [carts, setCarts] = useState();
  const [cartNumber, setCartNumber] = useState(0);
  const [pinCode, setPinCode] = useState();
  const [address, setAddress] = useState();
  const [landmark, setLandmark] = useState();
  const [landmarks, setLandmarks] = useState();
  const [district, setDistrict] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [more, setMore] = useState([]);
  const [steps, setSteps] = useState("cart");
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    axios.get(url+'/api/cartUserId/'+user.id)
    .then(function (result) {
      setCarts(result.data);
      setCartNumber(result.data.length);
      var p=0;
      result.data.map((item) => {
        more.push(0);
        p=parseInt(p)+(parseInt(item.product.price)*parseInt(item.qty));
      })
      setAmount(p);
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

  function changeMore(p, index){
    const values = [...more];
    values[index] = parseInt(p);
    setMore(values);
  }

  function changeQty(p, index, id){
    const values = [...carts];
    values[index].qty = parseInt(values[index].qty) + parseInt(p);
    setCarts(values);

    axios.put(url+'/api/cart/'+id, {
      qty:carts[index].qty
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

  function inputQty(p, index, id){
    const values = [...carts];
    values[index].qty = parseInt(p);
    setCarts(values);

    axios.put(url+'/api/cart/'+id, {
      qty:carts[index].qty
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

  function deleteProduct(id) {
    axios.delete(url+'/api/cart/'+id)
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

  function getAddress(pincode){
    setPinCode(pincode);
    axios.get('https://api.postalpincode.in/pincode/'+pincode)
    .then(res => {
        setLandmarks(res.data[0].PostOffice);
        setDistrict(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
    }).catch(err => console.log(err))
  }

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async (amount) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const data = await fetch("/api/razorpay", { 
      method: "POST",
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        amount:parseInt(amount)
      })
    })
    .then((t) =>
      t.json()
    );
    
    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Hale Metal And Electro India",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Payment for your order",
      image: "https://5.imimg.com/data5/SELLER/Logo/2022/4/AI/YU/GL/101648536/hale-logo-final-18-april-copy-120x120.png",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        submit("Payment Done", response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
      },
      prefill: {
        name: user.fName+" "+user.lName,
        email: user.email,
        contact: user.mobile,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  function submit(razorpay_status, razorpay_payment_id, razorpay_order_id, razorpay_signature){
    axios.post(url+'/api/order', {
      userId: user.id,
      name: user.fName+" "+user.lName,
      email: user.email,
      mobileNumber: user.mobile,
      pinCode,
      address,
      landmark,
      district,
      state,
      country,
      product: carts,
      status: "Order Placed",
      payment_status: razorpay_status,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      razorpay_signature: razorpay_signature,
      amount,
    })
    .then(function (result) {
      if(result.data.error){
        setError(result.data.error);
      }
      if(result.data.success){
        setSuccess(result.data.success);
        setSteps("finished");
        carts.map(item => {
          deleteProduct(item._id);
        })
        setOrderId(result.data.data._id);
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  return (
    <>
      <NavBar/>
      <div className="w-full py-6 mt-12 font-serif">
        <div className="flex">
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-white w-full">
                  <AiOutlineShoppingCart className="w-full fill-current"/>
                </span>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">Cart Items</div>
          </div>
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center w-[calc(100%-2rem-1rem)] top-2/4 -translate-y-2/4 -translate-x-2/4">
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className={((steps=="address" || steps=="payment" || steps=="finished") ? "bg-green-300 " : "")+"w-full py-1 rounded"}></div>
                </div>
              </div>
              <div className={((steps=="address" || steps=="payment" || steps=="finished") ? "bg-green-500 " : "border-2 border-gray-200 ")+"w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"}>
                <span className={((steps=="address" || steps=="payment" || steps=="finished") ? "text-white " : "text-gray-600 ")+"text-center w-full"}>
                  <FaAddressBook className="w-full fill-current"/>
                </span>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">Add Address</div>
          </div>
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center w-[calc(100%-2rem-1rem)] top-2/4 -translate-y-2/4 -translate-x-2/4">
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className={((steps=="payment" || steps=="finished") ? "bg-green-300 " : "")+"w-full py-1 rounded"}></div>
                </div>
              </div>
              <div className={((steps=="payment" || steps=="finished") ? "bg-green-500 " : "border-2 border-gray-200 ")+"w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"}>
                <span className={((steps=="payment" || steps=="finished") ? "text-white " : "text-gray-600 ")+"text-center w-full"}>
                  <MdOutlinePayments className="w-full fill-current"/>
                </span>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">Payment</div>
          </div>
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center w-[calc(100%-2rem-1rem)] top-2/4 -translate-y-2/4 -translate-x-2/4">
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className={((steps=="finished") ? "bg-green-300 " : "")+"w-full py-1 rounded"}></div>
                </div>
              </div>
              <div className={((steps=="finished") ? "bg-green-500 " : "border-2 border-gray-200 ")+"w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center"}>
                <span className={((steps=="finished") ? "text-white " : "text-gray-600 ")+"text-center w-full"}>
                  <AiOutlineCheckCircle className="w-full fill-current"/>
                </span>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">Finished</div>
          </div>
        </div>
      </div>
      <div className="w-full felx justify-center">
        <div className="md:flex container mx-auto md:w-10/12">
        {steps=="cart" &&
          <>
            <div className="grid gap-4 pt-4 px-4 md:pt-8 md:px-2 md:w-8/12">
              <p className="text-lg font-bold text-gray-700 uppercase bg-gray-200 p-3 rounded-t-lg">Cart Items</p>
              {carts && carts.map((item, index) => {
                return (
                  <div key={index} className="bg-white rounded-lg border shadow-md pb-2 px-2">
                    <div className="flex flex-col items-center md:flex-row md:w-full">
                      <img className="object-cover w-full h-80 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg" src="/cabletray.png" alt=""/>
                      <div className="flex flex-col justify-between w-full leading-normal">
                        <button onClick={() => deleteProduct(item._id)} className="flex justify-end text-red-700 hover:text-red-800 py-1 rounded-md px-2"><FaRegTrashAlt className="mt-0.5 mr-1"/> Remove</button>
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
                            <div className="flex justify-center w-1/2">
                              <button onClick={() => changeQty(-1, index, item._id)} className="flex justify-center p-1 bg-gray-400 hover:bg-gray-500 text-white rounded-l-md w-3/12"><AiOutlineMinus className="mt-1" /></button>
                              <input value={item.qty} onChange={(e) => inputQty(e.target.value, index, item._id)} type="number" className="shadow pl-2 text-gray-900 bg-gray-50 border border-gray-300 w-6/12" />
                              <button onClick={() => changeQty(+1, index, item._id)} className="flex justify-center p-1 bg-gray-400 hover:bg-gray-500 text-white rounded-r-md w-3/12"><AiOutlinePlus className="mt-1"/></button>
                            </div>
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
          </>
          }
          {(steps=="address" || steps=="payment") && 
            <>
              <div className="grid pt-4 px-4 md:pt-8 md:px-2 md:w-8/12">
                <p className="text-lg font-bold text-gray-700 uppercase bg-gray-200 p-3 rounded-t-lg">Add Address</p>
                <div className="bg-white rounded-lg border shadow-md pb-2 px-4 pt-2 mt-2">
                  <div className="mb-4 mt-2">
                    <label className="block text-grey-darker text-sm font-bold mb-2" for="Pin Code">
                      Pin Code
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Pin Code" type="number" placeholder="Pin Code" onChange={(e)=>getAddress(e.target.value)} />
                  </div>
                  <div className="mb-4 mt-2">
                    <label className="block text-grey-darker text-sm font-bold mb-2" for="Address">
                      Address
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Address" type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)} />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="mb-4 mt-2 w-1/2">
                      <label for="category" className="block text-grey-darker text-sm font-bold mb-2">Landmark</label>
                      <select id="category" className="shadow bg-white border text-gray-darker rounded block w-full py-2 px-3" onChange={(e)=>setLandmark(e.target.value)}>
                        <option selected disabled>Choose Landmark</option>
                        {landmarks && landmarks.map((item, index) => {
                          return (
                            <option key={index} value={item.Name}>{item.Name}</option>
                          )
                        })}
                      </select>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" for="District">
                        District
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="District" type="text" placeholder="District" value={district} onChange={(e)=>setDistrict(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" for="State">
                        State
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="State" type="text" placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="mb-4 mt-2 w-1/2">
                      <label className="block text-grey-darker text-sm font-bold mb-2" for="Country">
                        Country
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Country" type="text" placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
          {(steps=="cart" || steps=="address" || steps=="payment") && 
          <>
          <div className="w-full md:w-4/12 pt-4 px-4 md:pt-8 md:px-2">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-5000">
                <thead className="text-lg text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th colspan="2" scope="col" className="px-6 py-3">
                      Order Summary ({cartNumber} Items)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Sub Total
                    </th>
                    <td className="px-6 py-4">
                      {amount}
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
                      {amount}
                    </td>
                  </tr>
                </tbody>
              </table>
              {steps=="cart" &&
                <button onClick={() => setSteps("address")} className="flex justify-center mt-4 mb-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full" type="button"><BsCartCheck className="mt-0.5 mr-2"/>Checkout Now</button>
              }
              {(steps=="address" || steps=="payment") &&
                <>
                  <button onClick={() => {setSteps("payment"),  makePayment(amount)}} className="flex justify-center mt-4 mb-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full" type="button"><MdOutlinePayments className="mt-0.5 mr-2"/>Payment</button>
                  <button onClick={() => submit("Payment Pending", 0, 0, 0)} className="flex justify-center mt-1 mb-2 p-2 hover:text-white border-2 border-blue-700 text-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full" type="button"><MdPayment className="mt-0.5 mr-2"/>Pay Later</button>
                </>
              }
            </div>
          </div>
          </>
          }
        </div>
        {steps=="finished" &&
          <div>
            <div className="w-full flex justify-center">
              <img src="success.gif" alt="success" /><br/>
            </div>
            <div className="w-full flex justify-center">
              <Link href={"/order/"+orderId}><button className="flex justify-center mt-4 mb-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full md:w-2/12"><AiFillEye className="mt-1 mr-2"/>View Order Details</button></Link>
            </div>
          </div>
        }
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