import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Listings from "./pages/Listings";
import Details from "./pages/Details";
import AddItem from "./pages/AddItem";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Listings />} />
        <Route path="Details" element={<Details />}>
          <Route path=":ItemId" />
        </Route>
        <Route path="AddItem" element={<AddItem />} />
        <Route
          path="*"
          element={
            <main className="m-64 justify-center items-center">
              <div>
                <p className="text-center text-xl">There is nothing here!</p>
                <p className="text-center text-lg font-bold text-teal-500">
                  <Link to="listings">Get me somewhere safe</Link>
                </p>
              </div>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);