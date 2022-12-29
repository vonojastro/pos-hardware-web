import React from 'react'

const ProductModal = ({ handleAddUpdate, handleChange, setShowAdd,setAddProduct, addProduct, showAdd, showEdit, setShowEdit }) => {

  const handleClose = () => {
    if (showAdd) {
      setShowAdd(false)
    } else if (showEdit) {
      setShowEdit(false)
    }
  }

  return (
    <div className=" w-8/12 py-12 px-12 border border-gray-300 bg-white rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h3 className="text-[1.3rem] text-center font-bold pb-4 ">
        {showAdd ? 'Add Product' : showEdit ? 'Update Product' : ''}
      </h3>

      <form
        className="flex flex-col gap-5 grid grid-cols-2"
        onSubmit={handleAddUpdate}
      >
        <div className='flex flex-col w-full gap-1'>
          <label>Product Name</label>
        <input
          type="text"
          name="productName"
          onChange={handleChange}
          value={addProduct.productName}
          className=" border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Brand</label>
        <input
          type="text"
          name="brand"
          onChange={handleChange}
          value={addProduct.brand}
          className="border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={addProduct.description}
          className="border border-gray-300 p-2"
        />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <label>Supplier</label>
        <input
          type="text"
          name="supplier"
          onChange={handleChange}
          value={addProduct.supplier}
          className="border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Unit Cost</label>
        <input
          type="number"
          name="costPerUnit"
          onChange={handleChange}
          value={addProduct.costPerUnit}
          className="border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Retail Price</label>
        <input
          type="number"
          name="retailPrice"
          onChange={handleChange}
          value={addProduct.retailPrice}
          className="border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Wholesale Price</label>   
        <input
          type="number"
          name="wholesalePrice"
          onChange={handleChange}
          value={addProduct.wholesalePrice}
          className="border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Stock</label>  
        <input
          type="number"
          name="stock"
          onChange={handleChange}
          value={addProduct.stock}
          className="border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Unit</label>   
        <input
          type="text"
          name="unit"
          onChange={handleChange}
          value={addProduct.unit}
          className="border border-gray-300 p-2"
        />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label>Storage Location</label>       
        <input
          type="text"
          name="storageLocation"
          onChange={handleChange}
          value={addProduct.storageLocation}
          className="border border-gray-300 p-2"
        />
        </div>
        <button
          className="border border-gray-300 py-3 bg-white hover:bg-green-500 hover:text-white ease-in-out duration-200"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="border border-gray-300 py-3 bg-white hover:bg-green-500 hover:text-white ease-in-out duration-200"
          onClick={handleAddUpdate}
        >
         {showAdd ? 'Add' : showEdit ? 'Update' : ''}
        </button>
     

      </form>
    </div>
  )
}

ProductModal.propTypes = {}

export default ProductModal