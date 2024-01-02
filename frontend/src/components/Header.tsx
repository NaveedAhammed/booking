import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-semibold tracking-tight">
          <Link to="/">Booking.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-medium rounded-sm hover:bg-blue-700"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-medium rounded-sm hover:bg-blue-700"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="flex items-center text-blue-500 bg-white px-3 py-2 font-medium rounded-sm border border-blue-500 hover:bg-gray-100"
              >
                Register
              </Link>
              <Link
                to="/sign-in"
                className="flex items-center text-blue-500 bg-white px-3 py-2 font-medium rounded-sm border border-blue-500 hover:bg-gray-100"
              >
                Sign In
              </Link>
            </>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
