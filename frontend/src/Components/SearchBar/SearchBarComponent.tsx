import { useRef } from "react";

export default function SearchBarComponent({
  handleSearch
}: {
  handleSearch: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    const input = inputRef.current;
    if (input) {
      const name = input.value;
      handleSearch(name);
      console.log(name)
    }
  };

  return (
    <div className="lg:flex md:order-1 md:flex w-full">
      <div className="relative flex w-full flex-wrap items-stretch">
        <input
          type="search"
          ref={inputRef}
          className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-red-700 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-red-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-red-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-red-800 dark:text-red-700 dark:placeholder:text-red-700 dark:focus:border-red"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

