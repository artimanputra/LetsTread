import React, { useEffect } from 'react';
import axios from 'axios';


export default function Course1({user}) {
  const handlePayment = async () => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set('allow_repeated_payments', 'true');
      encodedParams.set('send_email', 'true');
      encodedParams.set('amount', '5000');
      encodedParams.set('purpose', 'Course1');
      encodedParams.set('buyer_name',user.name );
      const options = {
        method: 'POST',
        url: 'https://api.instamojo.com/v2/payment_requests/',
        headers: {
          accept: 'application/json',
          Authorization: 'dda922edbdabc83b78bf29dabd8e248e', // Replace with your access token
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      const paymentUrl = response.data.payment_request.longurl;

      // Redirect the user to the payment page
      window.location.href = paymentUrl;
    } catch (error) {
      console.error(error);
    }
  };
  const containerStyles = {
    width: "950px",
    height: "300px",
    margin: "0 auto",
  };
 
  return (
    <>
      <div className="relative inline-flex w-full justify-evenly ">
        <div className=" flex flex-col justify-center space-y-4">
          <div className="py-4">
            <div style={containerStyles}>
              <img
                src="http://localhost:3000/Images/image9.png"
                alt="course1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col  justify-center items-center">
          <div className="text-xl w-5/6">
            <p className="py-4 text-center">
              This course is designed for those who want to become a full-time
              trader and earn money by regular trading in the stock market.
            </p>
            <p className="py-4 text-center">
              The course includes pure technical analysis with sector
              correlation, position size, risk management, wholesale/retail
              price, demand & supply, in-depth analysis on chart, advanced day
              trading strategy, how to read live price action, gaps, indicators,
              market traps, advanced stock scanning techniques, trading
              psychology, advanced trend analysis and much more. Specially
              designed for those who want to make a career in the stock market.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-around pb-4 py-8 pt-20">
        <div class="flex items-center pl-24">
          <img
            src={process.env.PUBLIC_URL + "/Images/image8.png"}
            className="rounded-2xl w-96"
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap p-3">
            <img
              src="http://localhost:3000/Images/image10.png"
              className="w-10 h-10 mx-4 inline-block pt-1"
              alt="duration"
            ></img>
            <div className="text-xl font-medium pt-2 text-[#000000]">
              Duration : <span className="px-20 font-normal">3 Months</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3">
            <img
              src="http://localhost:3000/Images/image11.png"
              className="w-10 h-10 mx-4 inline-block pt-1"
              alt="duration"
            ></img>
            <div className="text-xl font-medium pt-2 text-[#000000]">
              Language : <span className="px-20 font-normal">English</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3">
            <img
              src="http://localhost:3000/Images/image12.png"
              className="w-10 h-10 mx-4 inline-block pt-1"
              alt="duration"
            ></img>
            <div className="text-xl font-medium pt-2 text-[#000000]">
              Total Charges :{" "}
              <span className="px-10 text-[#216825] font-medium">₹ 15,000</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3 pt-6">
            <button className="bg-[#327E36] hover:bg-[#1E2A55] text-white font-bold py-2 px-4 border-b-4 border-[#327E36] hover:border-[#1E2A55] rounded-xl" onClick={handlePayment}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col p-12 ">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold px-24">Content:</h2>
          <p className="text-xl font-medium px-24 pt-4">
            Why we need Technical Analysis
          </p>
          <ul className="text-xl font-normal px-28 list-disc pt-8">
            <li>Candlestick Explanation And Patterns</li>
            <li>Study of Price Action</li>
            <li>Demand Supply</li>
            <li>Trading on Multiple Time Frame (How to pick a perfect time frame based on your trading style)</li>
            <li>How to scan stock in live market</li>
            <li>Trend Analysis (Trading In The Zone Special)</li>
            <li>Trend Analysis (Trading In The Zone Special)</li>
            <li>Moving Average (Simple, Exponential, Linearly Weighted)</li>
            <li>Algo Trader (How we can take advantage from them)</li>
            <li>Market Traps</li>
            <li>Trading against the Trend (Trading In The Zone Special)</li>
          </ul>
        </div>
      </div>
    </>
  );
}
