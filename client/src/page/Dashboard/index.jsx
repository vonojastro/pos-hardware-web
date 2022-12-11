import React from 'react'
import { useState } from 'react'

const AdminDashboard = () => {

  const [showAdd, setShowAdd] = useState(false)
  const [addProduct, setAddProduct] = useState({
    productName: null,
    brand: null,
    description: null,
    supplier: null,
    totalCost: null,
    costPerUnit: null,
    retailPrice: null,
    wholesalePrice: null,
    qty: null,
    unit: null
  })

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="w-11/12 mx-auto z-0 h-[700px] p-5 relative">

      <div className='flex justify-end gap-5 my-4 items-center'>
        <input className='px-4 h-[40px] border border-gray-300' placeholder='Search Item' />
        <button className='h-[40px] px-3 border border-gray-300 my-3' onClick={() => setShowAdd(true)}>Add Product</button>
      </div>
      <div className='border border-gray-300 rounded w-full h-[600px]'>
        <table className="w-full text-center gap-5">
          <thead>
            <tr className='border-b-[1px]'>
              <th className="py-3">Product Name</th>

              <th>Description</th>
              <th>Supplier</th>
              <th>Total Cost</th>
              <th>Cost per unit</th>
              <th>Retail Price</th>
              <th>Wholesale Price</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>

          <tbody>
            <tr className=' border-b-[1px]' >
              <td className='flex flex-col'>
                <div>Pako</div>
                <div>None</div>
              </td>

              <td>None</td>
              <td>Supplier</td>
              <td>5000</td>
              <td>20</td>
              <td>25</td>
              <td>0</td>
              <td>30</td>
              <td>1kg</td>
            </tr>
          </tbody>

        </table>

      </div>

      {showAdd ? (
        <div className=' w-6/12 py-8 px-12 border border-gray-300 bg-white rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h3 className='text-center font-bold pb-4'>Add Product</h3>

          <form className='flex flex-col gap-5 grid grid-cols-2' onSubmit={submitHandler}>
            <input type='text' placeholder='Product Name' className='border border-gray-300 p-2' />
            <input type='text' placeholder='Brand' className='border border-gray-300 p-2' />
            <input type='text' placeholder='Description' className='border border-gray-300 p-2' />
            <input type='text' placeholder='Supplier' className='border border-gray-300 p-2' />
            <input type='number' placeholder='Total Cost' className='border border-gray-300 p-2' />
            <input type='number' placeholder='Cost Per Unit' className='border border-gray-300 p-2' />
            <input type='number' placeholder='Retail Price' className='border border-gray-300 p-2' />
            <input type='number' placeholder='Wholesale Price' className='border border-gray-300 p-2' />
            <input type='number' placeholder='Quantity' className='border border-gray-300 p-2' />
            <input type='text' placeholder='Unit' className='border border-gray-300 p-2' />
            <button className='border border-gray-300 py-3'>Add</button>
            <button className='border border-gray-300 py-3' onClick={() => setShowAdd(false)}>Cancel</button>
          </form>

        </div>
      ) : ''}

    </div>
  )
}

export default AdminDashboard