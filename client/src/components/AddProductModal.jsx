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
    <div className=" w-7/12 py-12 px-12 border border-gray-300 bg-white rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h3 className="text-[1.3rem] text-center font-bold pb-4 ">
        {showAdd ? 'Add Product' : showEdit ? 'Update Product' : ''}
      </h3>

      <form
        className="flex flex-col gap-5 grid grid-cols-2"
        onSubmit={handleAddUpdate}
      >
        <input
          type="text"
          name="productName"
          onChange={handleChange}
          value={addProduct.productName}
          placeholder="Product Name"
          className="col-span-2 border border-gray-300 p-2"
        />
        <input
          type="text"
          name="brand"
          onChange={handleChange}
          value={addProduct.brand}
          placeholder="Brand"
          className="border border-gray-300 p-2"
        />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={addProduct.description}
          placeholder="Description"
          className="border border-gray-300 p-2"
        />
        <input
          type="text"
          name="supplier"
          onChange={handleChange}
          value={addProduct.supplier}
          placeholder="Supplier"
          className="border border-gray-300 p-2"
        />
        <input
          type="number"
          name="totalCost"
          onChange={handleChange}
          value={addProduct.totalCost}
          placeholder="Total Cost"
          className="border border-gray-300 p-2"
        />
        <input
          type="number"
          name="costPerUnit"
          onChange={handleChange}
          value={addProduct.costPerUnit}
          placeholder="Cost Per Unit"
          className="border border-gray-300 p-2"
        />
        <input
          type="number"
          name="retailPrice"
          onChange={handleChange}
          value={addProduct.retailPrice}
          placeholder="Retail Price"
          className="border border-gray-300 p-2"
        />
        <input
          type="number"
          name="wholesalePrice"
          onChange={handleChange}
          value={addProduct.wholesalePrice}
          placeholder="Wholesale Price"
          className="border border-gray-300 p-2"
        />
        <input
          type="number"
          name="stock"
          onChange={handleChange}
          value={addProduct.stock}
          placeholder="Stock"
          className="border border-gray-300 p-2"
        />
        <input
          type="text"
          name="unit"
          onChange={handleChange}
          value={addProduct.unit}
          placeholder="Unit"
          className="border border-gray-300 p-2"
        />
        <input
          type="text"
          name="storageLocation"
          onChange={handleChange}
          value={addProduct.storageLocation}
          placeholder="Storage Location"
          className="border border-gray-300 p-2"
        />
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