import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { FaExclamationTriangle, FaRegCheckCircle } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import url from '../../helpers/url';
import NavBar from '../../components/navbar';

export default function EditProduct() {

  const [category, setCategory]=useState("");
  const [categories, setCategories]=useState();
  const [productName, setProductName]=useState("");
  const [unit, setUnit]=useState("");
  const [price, setPrice]=useState("");
  const [size, setSize]=useState("");
  const [material, setMaterial]=useState("");
  const [brand, setBrand]=useState("");
  const [min_qty, setMinQty]=useState("");
  const [other, setOther]=useState("");
  const [others, setOthers]=useState([]);
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {

    axios.get(url+'/api/category')
    .then(function (result) {
      setCategories(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get(url+'/api/product/'+id)
    .then(function (result) {
      setCategory(result.data[0].category);
      setProductName(result.data[0].productName);
      setUnit(result.data[0].unit);
      setPrice(result.data[0].price);
      setSize(result.data[0].size);
      setMaterial(result.data[0].material);
      setBrand(result.data[0].brand);
      setMinQty(result.data[0].min_qty);
      setOthers(result.data[0].others);
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

  function pushOther() {
    others.push(other);
    setOther("");
  }

  function removeOther(index) {
    const values = [...others];
    values.splice(index, 1);
    setOthers(values);
  }
    
  function UpdateProduct() {
    axios.put(url+'/api/product/'+id, {
      category,
      productName,
      unit,
      price,
      size,
      material,
      brand,
      min_qty,
      others
    })
    .then(function (result) {
      if(result.data.error){
        setError(result.data.error);
      }
      if(result.data.success){
        setSuccess(result.data.success);
        router.push("/adminDashboard/manageProducts")
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  return (
    <>
      <NavBar/>
      <div className="w-full felx justify-center mt-12 font-serif">
        <div className="border shadow-xl p-6 sm:rounded-lg">
          <p className="text-red-600 text-lg md:text-3xl w-full flex justify-center"><u><b>Edit Product</b></u></p>
          <div className="mb-4 mt-6">
            <label htmlFor="category" className="block text-grey-darker text-sm font-bold mb-2">Select Category</label>
            <select id="category" className="shadow bg-white border text-gray-darker rounded block w-full py-2 px-3" value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option selected disabled>Choose Category</option>
              {categories && categories.map((item, index) => {
                return (
                  <option key={index} value={item.category}>{item.category}</option>
                )
              })}
            </select>
          </div>
          <div className="mb-4 mt-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="product name">
              Full Product Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="product name" type="text" placeholder="product name" value={productName} onChange={(e)=>setProductName(e.target.value)} />
          </div>
          <div className="mb-4 mt-6 w-full flex justify-between">
            <div className="w-6/12">
              <label htmlFor="unit" className="block text-grey-darker text-sm font-bold mb-2">Select Unit</label>
              <select id="unit" className="shadow bg-white border text-gray-darker rounded block w-full py-2 px-3" value={unit} onChange={(e)=>setUnit(e.target.value)}>
                <option selected disabled>Choose Unit</option>
                <option value="Meter">Meter</option>
                <option value="Feet">Feet</option>
                <option value="Inch">Inch</option>
                <option value="CM">CM</option>
                <option value="MM">MM</option>
                <option value="KG">KG</option>
                <option value="Gram">Gram</option>
              </select>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="w-6/12">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="price" type="number" placeholder="price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
          </div>
          <div className="mb-4 mt-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="size">
              Size
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="size" type="text" placeholder="size" value={size} onChange={(e)=>setSize(e.target.value)} />
          </div>
          <div className="mb-4 mt-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="material">
              Material
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="material" type="text" placeholder="material" value={material} onChange={(e)=>setMaterial(e.target.value)} />
          </div>
          <div className="mb-4 mt-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Brand">
              Brand
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Brand" type="text" placeholder="brand" value={brand} onChange={(e)=>setBrand(e.target.value)} />
          </div>
          <div className="mb-4 mt-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Min Quantity">
              Min Quantity
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="Min Quantity" type="number" placeholder="min quantity" value={min_qty} onChange={(e)=>setMinQty(e.target.value)} />
          </div>
          {others &&
            <div className="md:flex mb-4 mt-6">
              {others.map((item, index) => {
                return (
                  <button onClick={() => removeOther(index)} key={index} className="flex bg-red-500 text-white font-bold mt-2 md:mt-0 py-2 px-4 rounded-full mx-2">
                    {item}&nbsp;<AiOutlineClose className="mt-1" />
                  </button>
                )
              })}
            </div>
          }
          <div className="mb-4 mt-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="Other">
              Other
            </label>
            <input className="shadow appearance-none border rounded-l w-9/12 py-2 px-3 text-grey-darker" id="Other" type="text" placeholder="other" value={other} onChange={(e)=>setOther(e.target.value)} />
            <button onClick={() => pushOther()} className="mb-2 p-2 text-white bg-green-700 rounded-r hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 w-3/12">+ Add</button>
          </div>
          <button className="mb-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full" type="button" onClick={()=> UpdateProduct()} >
            Update Product
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