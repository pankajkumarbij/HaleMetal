import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineCaretRight } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { RiUserSettingsFill } from 'react-icons/ri';
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Cable Trays",
  "GI Strips",
  "Copper Lugs",
  "Storage Racks"
];

export default function Landing(){

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      2000
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-serif">
      <div className="flex justify-center mt-8 w-full pt-4 pb-4 md:pt-8 md:pb-8">
        <div className="md:flex justify-center w-full">
          <div className="w-full md:px-0 md:w-1/2 flex justify-center">
            <div className="flex-col w-10/12 flex justify-center md:pl-8 pt-16 md:pt-0">
              <p className="text-orange-400 text-lg md:text-4xl font-bold my-0.5 md:my-1 flex justify-center md:justify-start">Hale Metal and Electro India</p>
              <div className="flex justify-center md:justify-start">
                <p className="text-white text-lg md:text-4xl font-bold my-0.5 md:my-1">We Manufacturer of </p>&nbsp;&nbsp;&nbsp;
                <TextTransition className="text-gray-800 text-lg md:text-4xl font-bold my-0.5 md:my-1" springConfig={presets.wobbly}>
                  {TEXTS[index%TEXTS.length]}
                </TextTransition>
              </div>
              <p className="text-green-400 text-lg md:text-4xl font-bold my-0.5 md:my-1 flex justify-center md:justify-start">Buy Your Needs at The Best Deal</p>
              <Link href="/products/all">
                <form className="w-full md:w-3/4 md:px-0 mt-12">   
                  <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Products..." required />
                    <button type="submit" className="flex text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search&nbsp;<AiOutlineArrowRight className="mt-0.5" /></button>
                  </div>
                </form>
              </Link>
            </div>
          </div>
          <div className="w-full mt-8 md:mt-0 px-2 md:px-0 md:w-1/2 flex justify-center">
            <img src="home.png" className="w-9/12" alt="home img" />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full pl-8 pr-8 mt-8">
        <p className="flex md:text-2xl text-white"><BiCategory className="mt-1 md:mt-0.5"/>&nbsp;Product Categories</p>
        <Link href="/products/all">
          <button className="text-blue-700 flex">View More&nbsp;<AiOutlineCaretRight className="mt-1"/></button>
        </Link>
      </div>
      <div className="md:flex justify-center w-full pl-2 pr-2">
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="cabletray.jpeg" alt="" />
            </div>
            <div className="pt-3 flex justify-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">Cable Trays</h5>
            </div>
            <div className="p-5 flex justify-center">
              <Link href="/products/all">
                <button className="w-full inline-flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Explore All &nbsp;<AiOutlineArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="gi.jpg" alt="" />
            </div>
            <div className="pt-3 flex justify-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">GI Strips</h5>
            </div>
            <div className="p-5 flex justify-center">
              <Link href="/products/all">
                <button className="w-full inline-flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Explore All &nbsp;<AiOutlineArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="copperlug.jpg" alt="" />
            </div>
            <div className="pt-3 flex justify-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">Copper Lugs</h5>
            </div>
            <div className="p-5 flex justify-center">
              <Link href="/products/all">
                <button className="w-full inline-flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Explore All &nbsp;<AiOutlineArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="ironrack.jpeg" alt="" />
            </div>
            <div className="pt-3 flex justify-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">Iron Storage Rack</h5>
            </div>
            <div className="p-5 flex justify-center">
              <Link href="/products/all">
                <button className="w-full inline-flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Explore All &nbsp;<AiOutlineArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 w-full pl-8 pr-8">
        <p className="flex md:text-2xl text-white"><RiUserSettingsFill className="mt-1 md:mt-0.5"/>&nbsp;Our Services</p>
        <button className="text-blue-700 flex">View More&nbsp;<AiOutlineCaretRight className="mt-1"/></button>
      </div>
      <div className="md:flex justify-center w-full pl-2 pr-2">
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="delivery.png" alt="" />
            </div>
            <div className="pt-3 flex justify-center pb-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">Fast Delivery</h5>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="contact.jpeg" alt="" />
            </div>
            <div className="pt-3 flex justify-center pb-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">Customer Support</h5>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="quality.jpeg" alt="" />
            </div>
            <div className="pt-3 flex justify-center pb-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">Premium Quality</h5>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <div className="max-w-sm rounded-lg border border-gray-200 shadow-lg bg-white">
            <div className="w-full flex justify-center h-48 p-2">
              <img className="rounded-t-lg" src="payment.jpeg" alt="" />
            </div>
            <div className="pt-3 flex justify-center pb-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">Multiple Payment Options</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

{/* <div className="flex justify-center">
              <h5 className="flex mb-2 text-lg font-bold tracking-tight text-gray-600"><FaRupeeSign className="mt-1"/> 250/&nbsp;<p className="text-sm text-gray-500 mt-1">Meter</p></h5>
            </div>*/}
