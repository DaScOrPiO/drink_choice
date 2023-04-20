import React from "react";
import Item from "./item";
import { ImExit } from "react-icons/im";

export default function UserDashboard() {
  return (
    <>
      <main className="w-full h-full user-pagebg">
        <header className="w-full h-1/4 p-2 header-gradient flex flex-col justify-center items-center">
          <h2 className="text-2xl">Good Morning user</h2>
          <h2 className="text-center text-4xl font-bold mt-4">
            Make choice now
          </h2>
          <button
            className="lg:absolute top-18 right-20 md:static flex justify-center 
          items-center flex-col hover:text-gray-200 transition-colors duration-500 ease-in mt-6"
          >
            <ImExit size="35px" />
            Logout
          </button>
        </header>

        <section className="flex flex-col justify-center items-center h-3/4 w-full">
          <div className="w-full flex justify-center items-center">
            <input type="text" className="input-2" />
            <select name="" id="" className="selct mx-6">
              <option value="Choose" className="opt">
                Choose
              </option>
            </select>
          </div>
          <h2 className="mt-6 font-bold text-2xl">Your Selection</h2>
        </section>

        <section className="w-full h-auto bg-black px-4 py-4 flex flex-col flex-wrap">
          <h2 className="text-center text-2xl radial-text">
            Recent selections
          </h2>
          <div className="md:h-3/4 sm:h-1/4 w-full flex flex-wrap justify-center">
            <Item />
          </div>
        </section>
      </main>
    </>
  );
}
