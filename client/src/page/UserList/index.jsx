import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

const UserList = () => {

  const productList = useSelector((state) => state.productList);
  const { products, loading, success: addSuccess} = productList;




  const allProducts = Array.isArray(products) ? products : [];

  return (
    <div className="w-11/12 mx-auto z-0 h-[700px] p-5 relative">

    {/* <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop> */}

    
    <div className="border border-gray-300 rounded w-full h-[600px] overflow-y-scroll">
      <table className="w-full text-center gap-5">
        <thead>

        </thead>

        <tbody>
      
        </tbody>
      </table>
    </div>

   
  </div>
  )
}

export default UserList