import CarouselComponent from "../../Components/Carousel/CarouselComponent";
import { FaShippingFast, FaMoneyBillAlt } from "react-icons/fa";
import { TbPackageImport } from "react-icons/tb";
import { PiVaultLight } from "react-icons/pi";

export default function HomePage() {
  return (
    <>
      <CarouselComponent />
      <div className="flex justify-evenly">
        <div className="flex justify-center items-center flex-col">
          <FaShippingFast size={40} />
          <p className="text-lg sm:text-sm flex-wrap break-words">
            Transport gratuit la orice comanda de peste 500 de miliarde de euro
            oriunde in lume chiar daca esti pe titanic fie el vasul sau
            submarinul ca sunteti aproape unul de celalalt
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <TbPackageImport size={40} />
          <p className="text-lg sm:text-sm flex-wrap">
            Transport gratuit la orice comanda de peste 500 de miliarde de euro
            oriunde in lume chiar daca esti pe titanic fie el vasul sau
            submarinul ca sunteti aproape unul de celalalt
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <FaMoneyBillAlt size={40} />
          <p className="text-lg sm:text-sm flex-wrap">
            Transport gratuit la orice comanda de peste 500 de miliarde de euro
            oriunde in lume chiar daca esti pe titanic fie el vasul sau
            submarinul ca sunteti aproape unul de celalalt
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <PiVaultLight size={40} />
          <p className="text-lg sm:text-sm flex-wrap">
            Transport gratuit la orice comanda de peste 500 de miliarde de euro
            oriunde in lume chiar daca esti pe titanic fie el vasul sau
            submarinul ca sunteti aproape unul de celalalt
          </p>
        </div>
      </div>
    </>
  );
}
