import React, { useState } from "react";

const ItemCard = ({ product, handleDelete, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    handleEdit(product._id, editedProduct);
    setIsEditing(false); // Close the edit mode
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <img
        src={product.image.url}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
      />

      <div className="p-4">
        {isEditing ? (
          <div>
            {/* Edit Inputs */}
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex space-x-2 mt-2">
              {/* Save and Cancel Buttons */}
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Product Details */}
            <h3 className="text-lg font-semibold text-green-700 truncate">{product.name}</h3>
            <p className="text-gray-700 mt-2">Price: ${product.price}</p>
            <p className="text-gray-700 mt-1">Quantity: {product.quantity}</p>
            <div className="flex space-x-2 mt-4">
              {/* Edit and Delete Buttons */}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
