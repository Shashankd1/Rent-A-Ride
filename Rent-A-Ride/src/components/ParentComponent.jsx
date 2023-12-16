// ParentComponent.js
import React from "react";
import BookingForm from "./BookingForm";

const ParentComponent = () => {
  const handleBooking = (bookingData) => {
    
    console.log("Booking Data:", bookingData);
    
  };

  return (
    <div>
      <h1>Car Rental Application</h1>
      <BookingForm onBook={handleBooking} />
    </div>
  );
};

export default ParentComponent;
