import React from "react";
import CarouselComponent from "../../Components/Carousel/CarouselComponent";
import {
  FaShippingFast,
  FaMoneyBillAlt,
  FaBoxOpen,
  FaQuestionCircle,
} from "react-icons/fa";
import { TbPackageImport } from "react-icons/tb";
import { PiVaultLight } from "react-icons/pi";

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      <CarouselComponent />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
            <FaShippingFast size={70} className="text-primary" />
            <p className="mt-4 text-base text-center text-gray-700">
              Free shipping sitewide no matter how much or little you order!
            </p>
          </div>

          <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
            <TbPackageImport size={70} className="text-primary" />
            <p className="mt-4 text-base text-center text-gray-700">
              30 days return policy. Return products hassle-free for a full
              refund.
            </p>
          </div>

          <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
            <FaMoneyBillAlt size={70} className="text-primary" />
            <p className="mt-4 text-base text-center text-gray-700">
              Price matching. Get the best value by matching prices with
              competitors.
            </p>
          </div>

          <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
            <PiVaultLight size={70} className="text-primary" />
            <p className="mt-4 text-base text-center text-gray-700">
              Personalized assistance. Receive expert advice before making a
              purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
