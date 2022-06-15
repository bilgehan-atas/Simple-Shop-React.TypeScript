import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";
import "./App.css";

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/listings");
  }, []);

  return (
    <div>
      <div className="w-4/5 m-auto mt-12 bg-white rounded-md drop-shadow-md">
        <div className="pt-4 pl-8 pr-8 pb-4 font-bold italic flex flex-row justify-between ">
          <div className="">
            <Link to="listings">UPayments Store</Link>
          </div>
          <div className="hidden sm:flex">Register</div>{" "}
          <UserIcon className="flex w-6 h-6 sm:hidden" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
