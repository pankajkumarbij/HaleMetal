import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import url from '../../helpers/url';
import { FaExclamationTriangle, FaRegCheckCircle } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import { AiOutlineArrowRight, AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart, AiOutlineCaretRight, AiFillCheckCircle } from 'react-icons/ai';
import NavBar from '../../components/navbar';
import { user } from '../../utils/user';

export default function Product() {

  const [category, setCategory]=useState("");
  const [categories, setCategories]=useState();
  const [productName, setProductName]=useState("");
  const [product, setProduct] = useState();
  const [qty, setQty] = useState([]);
  const [more, setMore] = useState([]);
  const [carts, setCarts] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {

    axios.get(url+'/api/category')
    .then(function (result) {
      setCategories(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get(url+'/api/product')
    .then(function (result) {
      setProduct(result.data);
      result.data.map((item) => {
        qty.push(0);
        more.push(0);
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get(url+'/api/cartUserId/'+user.id)
    .then(function (result) {
      setCarts(result.data);
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

  function changeQty(p, index){
    const values = [...qty];
    values[index] = parseInt(values[index]) + parseInt(p);
    setQty(values);
  }

  function inputQty(p, index){
    const values = [...qty];
    values[index] = parseInt(p);
    setQty(values);
  }

  function changeMore(p, index){
    const values = [...more];
    values[index] = parseInt(p);
    setMore(values);
  }

  function AddToCart(product, qty){
    axios.post(url+'/api/cart', {
      userId: user.id,
      product,
      qty
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

  function isCart(id){
    for(var i = 0; i < carts.length; i++) {
      if (carts[i].product._id == id) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <NavBar/>
      <div className="w-full felx justify-center mt-12 font-serif">
        <div className="pt-6 sm:rounded-lg flex justify-center">
          <form className="w-full md:flex px-4 md:w-10/12 md:px-2">   
            <select id="category" className="w-full md:w-3/12 shadow bg-white border text-gray-600 md:rounded-l-lg block p-4" onChange={(e)=>setCategory(e.target.value)}>
              <option selected disabled>Choose Category</option>
              {categories && categories.map((item, index) => {
                return (
                  <option key={index} value={item.category}>{item.category}</option>
                )
              })}
            </select>
            <div className="relative w-full md:w-9/12">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" onChange={(e) => setProductName(e.target.value)} id="default-search" className="block shadow p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 md:rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Products..." required />
              <button type="submit" className="flex text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search&nbsp;<AiOutlineArrowRight className="mt-0.5" /></button>
            </div>
          </form>
        </div>
        <div className="container mx-auto md:w-10/12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 px-4 md:pt-8 md:px-2">
            {product && product.map((item, index) => {
              if(item.category.toUpperCase().search(category.toUpperCase())!=-1 && item.productName.toUpperCase().search(productName.toUpperCase())!=-1)
              return (
                <div key={index} className="bg-white rounded-lg border shadow-md pb-2 px-2">
                  <div className="flex flex-col items-center md:flex-row md:w-full">
                    <img className="object-cover w-full h-80 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg" src="/cabletray.png" alt=""/>
                    <div className="flex flex-col justify-between w-full p-4 leading-normal">
                      <h5 className="flex justify-center mb-2 text-xl font-bold tracking-tight text-gray-800">{item.productName}</h5>
                      <div className="flex justify-between">
                        <h5 className="mb-2 text-lg text-gray-600">{item.category}</h5>
                        <h5 className="mb-2 text-lg text-gray-600">Min Qty: {item.min_qty}</h5>
                      </div>
                      <div className="flex justify-between">
                        <h5 className="mb-2 text-sm text-gray-600">Size: {item.size}</h5>
                        <h5 className="mb-2 text-sm text-gray-600">Material: {item.material}</h5>
                      </div>
                      <div className="flex justify-between">
                        <h5 className="mb-2 text-lg font-bold text-gray-600">Price: {item.price} / {item.unit}</h5>
                        <h5 className="mb-2 text-sm text-gray-600">Brand: {item.brand}</h5>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex justify-center w-1/2">
                          <button onClick={() => changeQty(-1, index)} className="flex justify-center p-1 bg-gray-400 hover:bg-gray-500 text-white rounded-l-md w-3/12"><AiOutlineMinus className="mt-1" /></button>
                          <input value={qty[index]} onChange={(e) => inputQty(e.target.value, index)} type="number" className="shadow pl-2 text-gray-900 bg-gray-50 border border-gray-300 w-6/12" />
                          <button onClick={() => changeQty(+1, index)} className="flex justify-center p-1 bg-gray-400 hover:bg-gray-500 text-white rounded-r-md w-3/12"><AiOutlinePlus className="mt-1"/></button>
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
                  {more[index]==1 &&
                    <div className="container mx-auto pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.others &&
                        item.others.map((it, ind) => {
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
                  <div className="flex justify-between">
                    {carts && isCart(item._id) ?
                      <Link href="/cart"><button className="flex justify-center border p-2 bg-green-400 hover:bg-green-500 text-white rounded-lg w-full"><AiFillCheckCircle className="mt-1"/>&nbsp;&nbsp;Go to Cart</button></Link>
                    :
                      <button onClick={() => AddToCart(item, qty[index])} className="flex justify-center border p-2 bg-orange-500 hover:bg-orange-700 text-white rounded-lg w-full"><AiOutlineShoppingCart className="mt-1"/>&nbsp;&nbsp;Add to Cart</button>
                    }
                  </div>
                </div>
              )
            })}
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
