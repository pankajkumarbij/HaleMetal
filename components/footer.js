import { AiOutlineInfoCircle, AiOutlineWhatsApp } from 'react-icons/ai';
import { FaSuitcase, FaUserShield, FaGavel, FaPaperPlane, FaFacebookSquare, FaLinkedin, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

export default function Footer(){

  return (      
    <>
      <nav className="bg-navblue border-t">
        <div className="md:flex px-2 md:px-16">
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <center>
              <img src="logo.png" className="mr-3 h-8 sm:h-9" alt="Logo"/>
              {/* <p className="text-4xl text-green-200 font-semibold">HMEI</p> */}
              <p className="text-white italic mt-2">Plot No 461</p>
              <p className="text-white italic mt-2">Sector-52, Industrial Area</p>
              <p className="text-white italic mt-1">Chandigarh, India - 432321</p>
            </center>
            <div className="mt-6">
              <button className="flex justify-center border-2 p-2 text-white bg-green-500 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full mt-4"><AiOutlineWhatsApp className="mt-1" /> &nbsp; WhatsApp</button>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <div className="flex md:justify-center">
              <div className=" flex-col">
                <p className="px-2 text-xl underline text-green-200 font-bold">Company</p>
                <button className="text-white flex justify-center mt-5"><AiOutlineInfoCircle className="mt-0.5 mr-2 text-lg" /> About</button>
                <button className="text-white flex justify-center mt-5"><FaSuitcase className="mt-0.5 mr-2 text-lg" /> Carrers</button>
                <button className="text-white flex justify-center mt-5"><FaUserShield className="mt-0.5 mr-2 text-lg" /> Privacy Policy</button>
                <button className="text-white flex justify-center mt-5"><FaGavel className="mt-0.5 mr-2 text-lg" /> Terms & Conditions</button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <div className="flex md:justify-center">
              <div className=" flex-col">
                <p className="px-2 text-xl underline text-green-200 font-bold">Social Media</p>
                <button className="text-white flex justify-center mt-5"><FaFacebookSquare className="mt-0.5 mr-2 text-lg" /> Facebook</button>
                <button className="text-white flex justify-center mt-5"><FaLinkedin className="mt-0.5 mr-2 text-lg" /> Linkedin</button>
                <button className="text-white flex justify-center mt-5"><FaInstagramSquare className="mt-0.5 mr-2 text-lg" /> Instagram</button>
                <button className="text-white flex justify-center mt-5"><FaTwitterSquare className="mt-0.5 mr-2 text-lg" /> Twitter</button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <div className="flex md:justify-center">
              <div className=" flex-col">
                <p className="px-2 text-xl underline text-green-200 font-bold">Contact</p>
                <input className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="enter email" />
                <textarea className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" rows="2" placeholder="enter message" />
                <button className="flex justify-center p-2 border-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full"><FaPaperPlane className="mt-1" /> &nbsp; Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full">
        <p className="flex justify-center py-2 italic text-lg text-white">Copyright © 2022. All rights reserve</p>
      </nav>
    </>
  )
}