import React from 'react'
import dayjs from "dayjs";

const ProductDetailsModal = ({ allProducts, selectedId, setShowDetails }) => {

    const product = allProducts.filter(item => item._id === selectedId)

    return (
        <div className=" w-6/12 py-12 px-12 border border-gray-300 flex flex-col items-center gap-12 bg-white rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-[1.3rem] text-center font-bold ">
                Product Details
            </h3>

            {product.map((item, index) => (

                <div className='grid grid-cols-2 justify-items-center gap-12' key={index}>
                    <div className='flex flex-col'>
                        <h3><strong>Product Name: </strong>{item.productName}</h3>
                        <h3><strong>Brand: </strong>{item.brand}</h3>
                        <h3><strong>Description: </strong>{item.description}</h3>
                        <h3><strong>Supplier: </strong>{item.supplier}</h3>
                        <h3><strong>Cost Per Unit: </strong>{item.costPerUnit}</h3>

                    </div>
                    <div className='flex flex-col'>

                        <h3><strong>Retail Price: </strong>{item.retailPrice.toLocaleString()}</h3>
                        <h3><strong>Wholesale Price: </strong>{item.wholesalePrice.toLocaleString()}</h3>
                        <h3><strong>Quantity: </strong>{item.stock}</h3>
                        <h3><strong>Unit: </strong>{item.unit}</h3>
                        <h3><strong>Storage Location: </strong>{item.storageLocation}</h3>
                        <h3><strong>Updated: </strong>{dayjs(item.createdAt).format("MMMM DD, YYYY")}</h3>
                    </div>

                </div>

            ))}

                <button
                    className="border w-2/12 border-gray-300 py-3 bg-white hover:bg-green-500 hover:text-white ease-in-out duration-200"
                    onClick={() => setShowDetails(false)}
                >
                    Close
                </button>

        </div>
    )
}

export default ProductDetailsModal