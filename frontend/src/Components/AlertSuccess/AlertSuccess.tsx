import { AiFillCheckSquare } from "react-icons/ai";

export default function AlertSuccess({ message }: { message: string }) {
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 z-50">
      <div
        className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 animate-fade-in-down-out w-96"
        role="alert"
      >
        <AiFillCheckSquare size={30} color="light-green" />
        <p className="ml-12">{message}</p>
      </div>
    </div>
  );
}
