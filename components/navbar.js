import { useEffect, useState } from 'react';
import { FiLogIn, FiPhoneCall, FiLogOut } from 'react-icons/fi';
import { RiUserSettingsFill } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { AiOutlineClose, AiOutlineShoppingCart, AiOutlineWhatsApp, AiOutlineUser, AiOutlineHome, AiOutlineInfoCircle, AiOutlineUnorderedList,AiOutlineDashboard } from 'react-icons/ai';
import cookie from 'js-cookie';
import Link from 'next/link';
import Login from './login';
import Register from './register';
import { user } from '../utils/user';
import axios from 'axios';
import url from '../helpers/url';

export default function NavBar() {

  const [toggle, setToggle] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(0);
  const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    if(user!=="no user") {
      setIsLogin(true);

      axios.get(url+'/api/cartUserId/'+user.id)
      .then(function (result) {
        setCartNumber(result.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });

    }

  }, [user]);

  const isHidden = isOpenModel!==0 ? "" : "hidden ";
  
  let bgTabColorLogin = "";
  if(isOpenModel===1){
    bgTabColorLogin = "bg-gray-200";
  }
  else{
    bgTabColorLogin="";
  }

  let bgTabColorRegister = "";
  if(isOpenModel===2){
    bgTabColorRegister = "bg-gray-200";
  }
  else{
    bgTabColorRegister="";
  }

  function Logout(){
    cookie.remove('token');
    window.location.reload(false);
  }

  return (
    <>
      <nav className="fixed top-0 w-full bg-navblue border-b shadow-sm border-gray-200 px-2 sm:px-6 py-2.5">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/">
              <a className="flex items-center">
              {/* <img src="logo.png" className="mr-3 h-6 sm:h-9" alt="Logo"/> */}
              <p className="self-center text-xl font-semibold whitespace-nowrap text-green-200">HMEI</p>
            </a>
          </Link> 
          <div className="flex items-center md:order-2">
            {isLogin ?
              <>
                <AiOutlineWhatsApp className="text-green-500 w-6 h-7 mr-5" />
                <Link href="/cart">
                  <a>
                    <div className="flex justify-center text-2xl text-white mr-5">
                      <AiOutlineShoppingCart className="" />
                      {cartNumber!=0 &&
                        <p className="text-sm"><p className="bg-green-500 rounded-full px-0.5">{cartNumber}</p></p>
                      }
                    </div>
                  </a>
                </Link>
                <div className="relative group">
                  <button type="button">
                    <AiOutlineUser className="text-white w-6 h-7"/>
                  </button>
                  <div className="absolute hidden right-0 bg-white rounded divide-y divide-gray-300 border shadow group-hover:block" id="dropdown">
                    <div className="py-3 px-4">
                      <span className="block text-sm text-gray-900">{user.fName}</span>
                      <span className="block text-sm font-medium text-gray-500 truncate">{user.email}</span>
                    </div>
                    <ul className="py-1" aria-labelledby="dropdown">
                      {user.type=="admin" &&
                        <li>
                          <Link href="/adminDashboard/dashboard"><a className="flex py-2 px-4 text-sm bg-red-700 text-white hover:bg-blue-700 hover:text-white"><AiOutlineDashboard className="mt-0.5 mr-1"/>Admin Zone</a></Link>
                        </li>
                      }
                      <li>
                        <Link href="/"><a className="flex py-2 px-4 text-sm text-gray-700 hover:bg-blue-700 hover:text-white"><FaRegUser className="mt-0.5 mr-1"/>Profile</a></Link>
                      </li>
                      <li>
                        <Link href="/myOrder"><a className="flex py-2 px-4 text-sm text-gray-700 hover:bg-blue-700 hover:text-white"><MdDashboard className="mt-0.5 mr-1"/>My Orders</a></Link>
                      </li>
                      <li>
                        <button onClick={() => Logout()} className="py-2 w-full flex justify-start px-4 text-sm text-gray-700 hover:bg-blue-700 hover:text-white"><FiLogOut className="mt-0.5 mr-1"/>Logout</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            :
              <div>
                <button type="button" onClick={() => setIsOpenModel(1)} className="flex border-2 text-white bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-md">
                  <FiLogIn className="mt-1" />&nbsp;Login
                </button> 
              </div>
            }
            <button type="button" onClick={() => setToggle(!toggle)} className="inline-flex items-center p-2 ml-1 text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div className={toggle ? "justify-between items-center w-full md:flex md:w-auto md:order-1" : "hidden justify-between items-center w-full md:flex md:w-auto md:order-1"}>
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/"><a className="flex py-2 pr-4 pl-3 text-white border-b border-gray-300 hover:bg-blue-700 md:border-0 hover:md:rounded-md hover:text-white md:p-1"><AiOutlineHome className="mt-0.5 mr-1"/> Home</a></Link>
              </li>
              <li>
                <Link href="/products/all"><a className="flex py-2 pr-4 pl-3 text-white border-b border-gray-300 hover:bg-blue-700 md:border-0 hover:md:rounded-md hover:text-white md:p-1"><AiOutlineUnorderedList className="mt-0.5 mr-1"/> Products</a></Link>
              </li>
              <li>
                <Link href="/"><a className="flex py-2 pr-4 pl-3 text-white border-b border-gray-300 hover:bg-blue-700 md:border-0 hover:md:rounded-md hover:text-white md:p-1"><RiUserSettingsFill className="mt-0.5 mr-1"/> Services</a></Link>
              </li>
              <li>
                <Link href="/"><a className="flex py-2 pr-4 pl-3 text-white border-b border-gray-300 hover:bg-blue-700 md:border-0 hover:md:rounded-md hover:text-white md:p-1"><AiOutlineInfoCircle className="mt-0.5 mr-1"/> About</a></Link>
              </li>
              <li>
                <Link href="/"><a className="flex py-2 pr-4 pl-3 text-white border-b border-gray-300 hover:bg-blue-700 md:border-0 hover:md:rounded-md hover:text-white md:p-1"><FiPhoneCall className="mt-0.5 mr-1"/> Contact</a></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={isHidden+"flex flex-col justify-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 items-center h-modal h-full backdrop-brightness-50"}>
        <div className="relative shadow-2xl w-full rounded max-w-xl h-auto bg-white">
          <div className="flex justify-between items-start p-2 rounded-t">
            <button type="button" onClick={() => setIsOpenModel(0)} className="text-gray-800 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" >
              <AiOutlineClose/>
            </button>
          </div>
          <ul className="flex rounded-lg divide-x divide-gray-300 shadow sm:flex border-b border-gray-300-gray-500">
            <li className="w-full">
              <button onClick={() => setIsOpenModel(1)} className={bgTabColorLogin+"inline-block relative py-4 px-4 w-full text-sm font-medium text-center text-gray-800 rounded-l-lg hover:ring-2 hover:ring-green-600 hover:z-20 active"} >Login</button>
            </li>
            <li className="w-full">
              <button onClick={() => setIsOpenModel(2)} className={bgTabColorRegister+"inline-block relative py-4 px-4 w-full text-sm font-medium text-center text-gray-800 rounded-r-lg hover:ring-2 hover:ring-green-600 hover:z-20 active"} >Register</button>
            </li>
          </ul>
          <div className="bg-white rounded-b p-6 flex flex-col w-full">
            {isOpenModel===1 &&
            <>
              <Login/>
              <p className="flex justify-center flex-row align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="/">
                Don't have an account? &nbsp; <button className="text-blue-400" onClick={() => setIsOpenModel(2)}>Register here</button>
              </p>
            </>
            }
            {isOpenModel===2 &&
            <>
              <Register/>
              <p className="flex justify-center flex-row align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="/">
                Already have an account? &nbsp; <button className="text-blue-400" onClick={() => setIsOpenModel(1)}>Login here</button>
              </p>
            </>
            }
          </div>
        </div>
      </div>
    </>
  )
}