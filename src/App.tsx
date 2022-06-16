import { Outlet, Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";
import "./App.css";

function App() {

  return (
    <div>
      <div className="w-4/5 m-auto mt-12 bg-white rounded-lg drop-shadow-md">
        <div className="pt-4 pl-8 pr-8 pb-4 font-bold italic flex flex-row justify-between ">
          <div className="">
            <Link to="/" reloadDocument={true}><p className="tracking-wide">UPayments Store</p></Link>
          </div>
          <div className="hidden sm:flex"><p>Register</p></div>{" "}
          <UserIcon className="flex w-6 h-6 sm:hidden" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
