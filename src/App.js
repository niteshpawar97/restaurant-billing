import React, { useState } from "react";
import MenuItemCard from "./components/MenuItemCard";

const App = () => {
  const menuItems = [
    { id: 1, name: "Samosa", description: "Delicious samosa", price: 50 },
    { id: 2, name: "Kachodi", description: "Tasty kachodi", price: 60 },
    { id: 3, name: "Chai", description: "Refreshing chai", price: 30 },
    { id: 4, name: "Biryani", description: "Flavorful biryani", price: 320 },
    { id: 5, name: "Pav Bhaji", description: "Spicy pav bhaji", price: 240 },
    {
      id: 6,
      name: "Paneer Tikka",
      description: "Grilled paneer tikka",
      price: 280,
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const storeName = "Garba Sweets";
  const address =
    "Stadium complex, Opp. BSNL Exchange, Parasia Rd, Chhindwara, M P 480001";
  const contactNumber = "123-456-7890";
  const invoiceNumber = Math.floor(Math.random() * 1000000); // Generate a random invoice number

  const addToInvoice = (item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.item.id === item.id
    );
    if (existingItem) {
      existingItem.quantity++;
      setSelectedItems([...selectedItems]);
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
  };

  const removeFromInvoice = (itemId) => {
    const updatedItems = selectedItems
      .map((selectedItem) => {
        if (selectedItem.item.id === itemId) {
          selectedItem.quantity--;
        }
        return selectedItem;
      })
      .filter((selectedItem) => selectedItem.quantity > 0);
    setSelectedItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce(
      (subtotal, selectedItem) =>
        subtotal + selectedItem.item.price * selectedItem.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxRate = 0.1; // 10% tax rate
    const taxAmount = subtotal * taxRate;
    return (subtotal + taxAmount).toFixed(2);
  };

  const printInvoice = () => {
    const printableContent = selectedItems
      .map((selectedItem, index) => {
        const totalItemPrice = (
          selectedItem.item.price * selectedItem.quantity
        ).toFixed(2);
        return `
        <div style="margin-bottom: 10px;">
          <p style="margin-bottom: 5px;">#${index + 1}# ${
          selectedItem.item.name
        } ${selectedItem.item.price.toFixed(2)} x (${
          selectedItem.quantity
        })  ₹ ${totalItemPrice}</p>
          
        </div>
      `;
      })
      .join("");

    const printableStyles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.5;
        }
        p {
          margin: 0;
        }
      </style>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          ${printableStyles}
         
        </head>
        <body>
          <div style="width: 3in; margin: 0 auto; padding: 10px;">
            <h1 style="text-align: center; margin-bottom: 10px;">Token Invoice</h1>
            <div style="margin: 0; text-align: center; font-weight: bold;">#${invoiceNumber}</div>
            <div>Date: ${currentDate}  ${currentTime}</div>
            
            <hr style="margin: 10px 0;">
            <div>#------Item----------Rate------QTY-----Total</div>
            ${printableContent}
            <hr style="margin: 0px 0;">
            <div style="margin-top: 10px;">
              <p>Subtotal: ₹ ${calculateSubtotal()}</p>
              <p>Tax (10%): ₹ ${(calculateSubtotal() * 0.1).toFixed(2)}</p>
              <p>Total Amount: ₹ ${calculateTotal()}</p>
            </div>

            <hr style="margin: 0; text-align: center;">
            <div style="margin: 0; text-align: center; font-weight: bold;">${storeName}</div>
            <div style="margin: 0; text-align: center; font-weight: bold;">${address}</div>
            <div style="margin: 0; text-align: center; font-weight: bold;">${contactNumber}</div>

          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();

    // Close the print window after printing
    printWindow.close();

    // Reset selected items after printing
    setSelectedItems([]);
  };

  return (
    <div className="flex">
      <div className="bg-gray-100 p-4 w-2/3">
        <h2 className="text-lg font-semibold">Store Name: {storeName}</h2>
        <p className="text-base font-light mb-4">{address}</p>
        <h2 className="text-lg font-semibold mb-4">Menu Items</h2>
        <div className="flex flex-wrap justify-center">
          {menuItems.map((item) => (
            <div key={item.id} className="m-4 ">
              <MenuItemCard item={item} />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => addToInvoice(item)}
              >
                Add to Invoice
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 bg-gray-200 p-4 fixed inset-y-0 right-0 overflow-hidden">
        <h2 className="text-lg font-semibold mb-4">Selected Items</h2>
        {selectedItems.map((selectedItem) => (
          <div
            key={selectedItem.item.id}
            className="mb-2 p-2 bg-white rounded-lg flex justify-between items-center shadow"
          >
            <p>
              {selectedItem.item.name}{" "}
              {selectedItem.quantity > 1 && `(${selectedItem.quantity})`}
            </p>
            <p>
              {" "}
              ₹{selectedItem.item.price.toFixed(2)} x {selectedItem.quantity} =
              ₹{(selectedItem.item.price * selectedItem.quantity).toFixed(2)}
            </p>
            <button
              className="text-red-500 font-semibold"
              onClick={() => removeFromInvoice(selectedItem.item.id)}
            >
              Remove
            </button>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Subtotal: ₹{calculateSubtotal()}
            </p>
            <p className="text-lg font-semibold">
              Tax (10%): ₹{(calculateSubtotal() * 0.1).toFixed(2)}
            </p>
            <p className="text-lg font-semibold">
              Total Amount: ₹{calculateTotal()}
            </p>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={printInvoice}
            >
              Print Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
