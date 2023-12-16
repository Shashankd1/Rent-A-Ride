import React from "react";
import { useNavigate } from "react-router-dom";

const CarList = () => {
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      price: 1000,
      imageUrl:
        "https://s1.cdn.autoevolution.com/images/gallery/TOYOTA-Camry-5881_37.jpg",
      description:
        "The Toyota Camry is a reliable and fuel-efficient sedan with advanced safety features.",
    },
    {
      id: 2,
      name: "Swift",
      price: 1200,
      imageUrl:
        "https://gaadiwaadi.com/wp-content/uploads/2017/04/2017-Swift-dzire-launched.jpg",
      description:
        "The Swift is a compact and stylish car known for its agility and fuel efficiency.",
    },
    {
      id: 3,
      name: "Mahindra Bolero",
      price: 800,
      imageUrl:
        "https://www.carblogindia.com/wp-content/uploads/2019/10/Bolero-Special-Edition.jpg",
      description:
        "The Bolero is a powerful and iconic muscle car with a classic design.",
    },
    {
      id: 4,
      name: "Hyundai Creta",
      price: 1000,
      imageUrl:
        "https://th.bing.com/th/id/OIP.btcH9qHhXCa00cMqHrvbYQHaE5?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      description: "A versatile and spacious MPV suitable for family trips.",
    },
    {
      id: 5,
      name: "Tata Nexon",
      price: 1300,
      imageUrl:
        "https://www.autobics.com/wp-content/uploads/2017/09/2017-tata-nexon-top-studio-moroccan-blue.jpg",
      description:
        " A compact SUV with a modern design and safety features..",
    },
    {
      id: 6,
      name: "Mahindra Scorpio",
      price: 1500,
      imageUrl:
        "https://dekhnews.com/wp-content/uploads/2018/11/39564_Mahindra_Scorpio001.jpg",
      description:
        "A rugged SUV with a strong presence, suitable for off-road adventures",
    },
  ];

  const navigate = useNavigate();
  const handleRentClick = (carId) => {
    {

    }
    navigate("/BookingForm");
    console.log(`Rent button clicked for car with ID ${carId}`);
  };

  return (
    <div className="container">
      <h2 className="text-center">Available Cars for Rent</h2>
      <div className="row bg-dark">
        {cars.map((car) => (
          <div key={car.id} className="col-lg-4 mb-4">
            <div className="card h-100">
              <img
                src={car.imageUrl}
                alt={car.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h3 className="card-title">{car.name}</h3>
                <p className="card-text">
                  Price: Rs {car.price.toLocaleString()} Per Day
                </p>
              </div>
              <div className="card-footer">
                <p className="card-text text-muted text-center mt-2">
                  {car.description}
                </p>
                <button
                  className="btn btn-success btn-block mx-auto"
                  style={{ display: "block" }}
                  onClick={() => handleRentClick(car.id)}
                >
                  Rent Car
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
