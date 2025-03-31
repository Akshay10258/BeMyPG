import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCreditCard, FaUniversity, FaGooglePay } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { SiPhonepe, SiPaytm } from "react-icons/si";

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { pg } = location.state || {};

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert("Please select a payment option.");
      return;
    }
    navigate("/Userpaymentportal", { state: { selectedOption } });
  };

  const paymentMethods = [
    { id: "credit-card", label: "Credit Card", value: "Credit Card", icon: <FaCreditCard size={24} /> },
    { id: "debit-card", label: "Debit Card", value: "Debit Card", icon: <MdPayment size={24} /> },
    { id: "bank-transfer", label: "Bank Transfer", value: "Bank Transfer", icon: <FaUniversity size={24} /> },
    {
      id: "upi",
      label: "UPI",
      value: "UPI",
      icon: <FaGooglePay size={24} />,
      subOptions: [
        { id: "phonepe", label: "PhonePe", value: "PhonePe", icon: <SiPhonepe size={20} /> },
        { id: "google-pay", label: "Google Pay", value: "Google Pay", icon: <FaGooglePay size={20} /> },
        { id: "paytm", label: "Paytm", value: "Paytm", icon: <SiPaytm size={20} /> },
      ],
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-l from-gray-700 to-black flex items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl text-center text-white font-bold mb-4">
          Reservation Payment for {pg?.PGname || "PG Accommodation"}
        </h2>
        <h3 className="text-xl text-white text-center mb-6">
          Choose Your Payment Method
        </h3>
        {/* Display the selected option */}
        {selectedOption && (
          <div className="mb-6 p-4 bg-gray-700 text-white text-center rounded-lg">
            Selected Payment Option: <span className="font-semibold">{selectedOption}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`relative p-4 border-2 rounded-lg transition-all cursor-pointer ${
                  selectedOption === method.value
                    ? "border-blue-500 bg-gray-700 scale-105"
                    : "border-gray-600 hover:border-blue-500"
                }`}
                onClick={() => handleOptionChange(method.value)}
              >
                <input
                  type="radio"
                  id={method.id}
                  value={method.value}
                  checked={selectedOption === method.value}
                  onChange={() => handleOptionChange(method.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <label htmlFor={method.id} className="flex items-center text-white cursor-pointer">
                  <span className="mr-3">{method.icon}</span>
                  {method.label}
                </label>
                {method.subOptions &&
                  selectedOption === "UPI" && (
                    <div className="mt-4 space-y-2 pl-8">
                      {method.subOptions.map((subOption) => (
                        <div
                          key={subOption.id}
                          className={`flex items-center text-white cursor-pointer transition-all ${
                            selectedOption === subOption.value
                              ? "text-blue-400"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent parent option selection
                            handleOptionChange(subOption.value);
                          }}
                        >
                          <input
                            type="radio"
                            id={subOption.id}
                            value={subOption.value}
                            checked={selectedOption === subOption.value}
                            onChange={(e) => handleOptionChange(subOption.value)}
                            className="absolute opacity-0 w-0 h-0"
                          />
                          <span className="mr-3">{subOption.icon}</span>
                          {subOption.label}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentOptions;

