import React from 'react';
import Instamojo from 'instamojo-payment-nodejs';

Instamojo.isSandboxMode(true); // For testing

Instamojo.setKeys(
  'test_2abc8a1244900e58d43e43fedad',
  'test_6b0622b70f02742ec5f4188677f'
);

export default function Course1({ user }) {
  const handleButtonClick = async () => {
    const options = {
      purpose: 'Product name',
      amount: 200,
      currency: 'INR',
      // Fill in the buyer's information here
      buyer_name: "",
      email: "",
      phone: "",
      send_email: false,
      send_sms: false,
      allow_repeated_payments: false,
      webhook: '',
      redirect_url: 'https://test.instamojo.com/@pranavhole050610',
    };

    const paymentData = Instamojo.PaymentData(options);

    try {
      const response = await Instamojo.createNewPaymentRequest(paymentData);
      console.log(response); // Handle the response as needed
    } catch (error) {
      console.error('Error creating payment request:', error);
    }
  };

  // ... rest of your component code ...

  return (
    <>
      {/* ... your JSX ... */}
      <button
        className="bg-[#327E36] hover:bg-[#1E2A55] text-white font-bold py-2 px-4 border-b-4 border-[#327E36] hover:border-[#1E2A55] rounded-xl"
        onClick={handleButtonClick()}
      >
        Buy Now
      </button>
      {/* ... rest of your JSX ... */}
    </>
  );
}
