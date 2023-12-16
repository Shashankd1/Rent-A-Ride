import { Container } from "react-bootstrap";
import { Header } from "./Header";
import React, { useState } from 'react';
import { NavigationBar } from "./NavigationBar";
import Cards from './Cards';
import Footer from './Footer';
import BookingForm from './BookingForm';

export function Dashboard() {
    const [bookings, setBookings] = useState([]);

  const handleBook = (bookingData) => {
    // Update the list of bookings
    setBookings([...bookings, bookingData]);
  };
    return (
        <>
            <div className='container'></div>
            <BookingForm onBook={handleBook} />


            <div className="mt-4 mb-4">
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            Pickup: {booking.pickupDate}, Return: {booking.returnDate}, Type: {booking.carType}
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <Cards className="mt-4" />
            <Footer />

        </>

    );
}