import paymentApi from 'api/paymentApi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 *
 */
const TestCheckout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ordertype: '',
    amount: '',
    orderDescription: '',
    name: ''
  });
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Access values from the formData object
    const { ordertype, amount, orderDescription, name } = formData;
    console.log(formData);
    const paymentUrl = await paymentApi.testPayment({
      OrderType: ordertype,
      Amount: amount,
      OrderDescription: orderDescription,
      Name: name
    });
    console.log(paymentUrl);
    window.location.replace(paymentUrl.data);

    // Now you can use these values as needed, e.g., submit them to an API, process them, etc.
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ordertype"
          id=""
          value={formData.ordertype}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          id=""
          value={formData.amount}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="orderDescription"
          id=""
          value={formData.orderDescription}
          onChange={handleInputChange}
        />
        <input type="text" name="name" id="" value={formData.name} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestCheckout;
