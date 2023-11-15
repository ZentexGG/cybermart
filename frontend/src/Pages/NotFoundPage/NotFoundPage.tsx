import { TbZoomQuestion } from "react-icons/tb";

export default function NotFoundPage() {
  return (
    <div className="h-max my-24 flex flex-col items-center text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl px-7">
      <div className="flex gap-3 text-8xl text-red-700">
        <TbZoomQuestion />
      </div>
      <h1 className="text-7xl text-red-700 font-extrabold text-center">404</h1>
      <h2 className="text-5xl font-bold text-center">Not found</h2>
      <h3 className="text-xl font-medium text-center">
        The page you're trying to access was not found
      </h3>
      <a href="/" className="text-xl text-red-700 italic hover:underline font-medium text-center">Take me home</a>
    </div>
  );
}
