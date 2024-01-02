import React from "react";
const FAQ = () => {
  const faqsList = [
    {
      q: "How can I make a hotel reservation?",
      a: " To make a reservation, login to your account, select check-in date and check-out date for the room of your choosing, then click pay button. You would be directed to Stripe Checkout page where you can safely make a payment.",
    },
    {
      q: "How do I find information about room amenities?",
      a: "You can find information about the room amenities in the Description section of the room detail page. It lists both amenities and policies, such as whether pets are allowed or not.",
    },
    {
      q: " Is it possible to view room availability and prices for specific dates before making a reservation?",
      a: "Absolutely! The app allows you to check room availability and prices for specific dates before making a reservation. Simply select your desired dates, and the app will show whether the room is available for the selected dates, along with the prices.",
    },
    {
      q: "What payment methods are accepted for booking a hotel room?",
      a: "At the moment, we only accept card payment method which will be processed through Stripe Checkout. More payment methods available soon!",
    },
    {
      q: "Can I refund after I booked a room?",
      a: "No, we do not offer refunds once payment has been successfully completed.",
    },
  ];

  return (
    <div className="container">
      <div className="text-center space-y-3">
        <h3 className="block text-gray-800 text-3xl font-semibold">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-500 max-w-lg mx-auto">
          Answered all frequently asked questions. Can’t find the answer you’re
          looking for? feel free to contact us.
        </p>
      </div>

      <div className="bg-white rounded-md mt-5 shadow-lg">
        <div className="row">
          {faqsList.map((item, idx) => (
            <div className="col-md-6 mt-3 px-4" key={idx}>
              <h5 className="text-gray-800 text-xl font-semibold">{item.q}</h5>
              <p className="text-gray-500">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
