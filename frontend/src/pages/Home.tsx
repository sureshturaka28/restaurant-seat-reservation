import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">
          🍽️ Welcome to SeatBook
        </h1>

        <p className="text-gray-600 mb-6">
          Reserve your restaurant seat easily.  
          No waiting. No hassle.
        </p>

        <Link to="/login">
          <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition">
            Book Your Seat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
