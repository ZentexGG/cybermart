import { useState } from "react";

export default function SignoutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignout = () => {
    setLoading(true);
    setTimeout(() => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setLoading(false);
      window.location.reload();
    }, 1500);
  };

  return (
    <li>
      <a
        className={`cursor-pointer block px-4 py-2 text-sm ${
          loading ? "text-gray-400" : "text-gray-700"
        } hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
        onClick={loading ? undefined : handleSignout}
      >
        {loading ? (
          <>
            <span className="mr-2">Signing out...</span>
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm9-1.646A7.962 7.962 0 0020 12h-4c0-3.042-1.135-5.824-3-7.938l-3 1.647z"
              ></path>
            </svg>
          </>
        ) : (
          "Sign out"
        )}
      </a>
    </li>
  );
}
