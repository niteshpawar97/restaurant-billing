// src/components/MenuItemCard.js
import React from 'react';
import samosa from '../images/SamosaAloo.png'
const MenuItemCard = ({ item }) => {
  return (
    <div className="max-w-xs w-full bg-yellow-200 shadow-lg rounded-lg overflow-hidden m-4">
      <img
        className="w-full h-28 object-cover object-center"
        src={samosa}
        alt="Item"
      />
      <div className="p-4">
        <h2 className="text-gray-800 text-lg font-semibold mb-2">{item.name}</h2>
        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
        <p className="text-gray-700 font-bold text-3xl">₹ {item.price}</p>
      </div>
    </div>
  );
};

export default MenuItemCard;
