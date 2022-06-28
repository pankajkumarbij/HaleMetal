import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdDashboard, MdOutlinePending, MdOutlineCancel, MdOutlineCategory, MdAddToQueue, MdOutlinePlaylistAdd, MdOutlineFormatListBulleted } from 'react-icons/md';
import { AiOutlineCheckCircle, AiOutlineDashboard } from 'react-icons/ai';
import NavBar from '../../components/navbar';
import AddCategory from '../../components/addCategory';
import ManageCategory from '../../components/manageCategory';
import AddProduct from '../../components/addProduct';
import ManageProduct from '../../components/manageProduct';
import ManageOrder from '../../components/manageOrder';

export default function AdminDashboard() {

  const router = useRouter();
  const { dashboard } = router.query;

  return (
    <>
      <NavBar/>
      <div className="w-full flex flex-row h-screen mt-12 font-serif">
        <div className="w-1/6 bg-navblue text-white flex-col pl-4 text-md">
          <ul className="space-y-6 py-8">
            <li>
              <Link href={"/adminDashboard/dashboard"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><AiOutlineDashboard className="mt-0.5 mr-3"/>Dashboard</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/manageOrders"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><MdDashboard className="mt-0.5 mr-3"/>Manage Orders</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/pendingOrders"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><MdOutlinePending className="mt-0.5 mr-3"/>Pending Orders</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/completedOrders"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><AiOutlineCheckCircle className="mt-0.5 mr-3"/>Completed Orders</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/cancelOrders"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><MdOutlineCancel className="mt-0.5 mr-3"/>Cancel Orders</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/newCategory"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><MdAddToQueue className="mt-0.5 mr-3"/>New Category</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/manageCategories"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><MdOutlineCategory className="mt-0.5 mr-3"/>Manage Categories</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/newProduct"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><MdOutlinePlaylistAdd className="mt-0.5 mr-3"/>New Product</button></Link>
            </li>
            <li>
              <Link href={"/adminDashboard/manageProducts"}><button className="flex hover:bg-blue-700 md:border-0 hover:md:rounded-md md:p-2 text-lg" ><MdOutlineFormatListBulleted className="mt-0.5 mr-3"/>Manage Products</button></Link>
            </li>
          </ul>
        </div>
        <div className="w-5/6 p-6 flex justify-center"> 
          {dashboard==="dashboard" &&
            <img src="../dashboard.png" className="w-full md:w-1/2 justify-center" alt="dashboard" />
          }
          {dashboard==="manageOrders" &&
            <ManageOrder status="Order Placed"/>
          }
          {dashboard==="pendingOrders" &&
            <ManageOrder status="In Transit"/>
          }
          {dashboard==="completedOrders" &&
            <ManageOrder status="Delivered"/>
          }
          {dashboard==="cancelOrders" &&
            <ManageOrder status="Cancel"/>
          }
          {dashboard==="newCategory" &&
            <AddCategory/>
          }
          {dashboard==="manageCategories" &&
            <ManageCategory/>
          }
          {dashboard==="newProduct" &&
            <AddProduct/>
          }
          {dashboard==="manageProducts" &&
            <ManageProduct/>
          }
        </div>
      </div>
    </>
  );
}