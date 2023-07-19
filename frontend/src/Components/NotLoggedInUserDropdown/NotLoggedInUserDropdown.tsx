import React, { useState } from 'react'

export default function NotLoggedInUserDropdown() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleUserDropdown = () => {
      setUserDropdownOpen(!isUserDropdownOpen);
    };
  return (
    <>
      {/* User Dropdown */}
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isUserDropdownOpen ? "true" : "false"}
        onClick={toggleUserDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAMFBMVEXk5ueutLersbTN0dPn6eq9wsTY29yzuLvKztC4vcCorrHFycve4eLR1NbU19nb3t90VuxHAAACvUlEQVRoge2Z3c6zIAyAKRRQRL3/u/3EzWXZHLRba/K94TlZspPH8ltaYzqdTqfT6XQ6nc7fBRHvv9eb8zz5seCHcOkHoBlishZu2GT9cpUes0+H+MDa4Qo9msm+qnc9LOp2DPFMveu9tnv+pC72uKq6h4q7sOoNPU4NN1g1ezPuYs9K7tB2byiFTlGDnTTs6EmBQ1LY77gkkhsgiruNGYlusE46dFxog64SOpID30KfhUNf6e4tdFk55Xx5QvaMx8hxWycqzxw3wCg67oy1vocuKWdOuez1Qj1aH/IgKWetN+GdzpYPknKeW/Ze/b/kosPOnXPJW5Vzp+1y0dXezJlf5KI3S+2hciaXdJvAckvnz7zAZdNn3uFuF0k3906VdRvD2OnijxbWZhN/pjMSKdkkqkAPXTSTOKC6NZ6p1XLMM/JqQ93r0nv8AWG76dQGCu0Vb71eOapl13QbzB/rj4WkNuZ3KqtONHM7BQc419uoWH582LM/KTtbUA/70L9UvW2CwVzWbEAz+2iTLSQYp/XaRkuxrYtzc8jmuqBv5lfd+z9a3uBKYynCPuoWYhz9NGwjoPsBiGHwMaX31X6f+0XpAxBXN9rT3s7TJ6Q4BHE/Zhc/HC5vHwCTpB/N4mnmwz/OQjtg29Mj76VW/FHk1MG5epF91sP06+BXenhtvXW/6Msd8q1618fwtR1nzjI710/fyn8L+wg+fxF8I2Ni6PndJuTWIj6TuGkG+XlCgZnLoxN0MzNq0bh3Oz12XIXd27zTS5LSaqB3WLm1TiKkzge31EmFVCyhtej5UB5TSoMOpIIss4PGkTd3O7enwCE11hynTc6mddSg13NDq1CVFQNvdT+EL5Q3qktOedQh1pZcZrawuFQbP7pT3ui3aR2tD3lls6G7VTr0qN0uwSkzV+a8FB5Uqbk7nU7nL/EPS0cfkCEZ18wAAAAASUVORK5CYII="
          alt="user photo"
        />
      </button>
      <div
        className={`${
          isUserDropdownOpen ? "block" : "hidden"
        } absolute right-0 origin-top-right w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 dark:bg-red-900 dark:divide-red-800`}
        id="user-dropdown"
        style={{ top: "calc(100% + 0.9rem)", right: "0" }}
      >
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Register
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
