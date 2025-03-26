import React from "react";
import Home1 from "../assets/3726696.png";

const Home = () => {
  return (
    <section className="relative ">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-12 md:py-20">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Transform Your Old Electronics
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Scan, sell, repair, or recycle your devices with ease. Join us in
            reducing e-waste and promoting a greener planet.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="border border-black py-2 rounded-full px-6 font-medium transition-all duration-300">
              Get Started
            </button>
            <button className="border border-black bg-black text-white py-2 rounded-full px-6 font-medium transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
          <img
            src={Home1}
            alt="E-Waste Hero Illustration"
            className=""
          />
        </div>
      </div>

      {/* Decorative Element */}
    </section>
  );
};

export default Home;
