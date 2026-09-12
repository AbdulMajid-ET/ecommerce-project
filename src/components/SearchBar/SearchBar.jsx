import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import "./SearchBar.css"

function SearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchInputRef = useRef(null)

  const urlSearchTerm = searchParams.get("search") || ""

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm)

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    setSearchTerm(urlSearchTerm)
  }, [urlSearchTerm])

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    setSearchTerm("")
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    const search = searchTerm.trim()

    if (!search) {
      return
    }

    setIsSearchOpen(false)

    navigate(
      `/products?search=${encodeURIComponent(search)}`
    )
  }

  return (
    <div className="searchbar-wrapper">

      {/* Search Icon */}
      <button
        type="button"
        className="navbar-search-button"
        onClick={handleSearchToggle}
        aria-label="Open Search"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle
            cx="11"
            cy="11"
            r="7.5"
          />

          <line
            x1="16.5"
            y1="16.5"
            x2="21"
            y2="21"
          />
        </svg>
      </button>

      {/* Search Overlay */}
      {isSearchOpen && (
        <>
          <div
            className="searchbar-backdrop"
            onClick={handleCloseSearch}
          />

          <div className="searchbar-overlay">

            <form
              className="searchbar-form"
              onSubmit={handleSearchSubmit}
            >
              <div className="searchbar-input-container">

                <label
                  htmlFor="navbar-search"
                  className="searchbar-label"
                >
                  SEARCH
                </label>

                <input
                  ref={searchInputRef}
                  id="navbar-search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="searchbar-input"
                />

                <button
                  type="submit"
                  className="searchbar-submit"
                  aria-label="Search"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7.5"
                    />

                    <line
                      x1="16.5"
                      y1="16.5"
                      x2="21"
                      y2="21"
                    />
                  </svg>
                </button>

              </div>

              <button
                type="button"
                className="searchbar-close"
                onClick={handleCloseSearch}
                aria-label="Close Search"
              >
                <span></span>
                <span></span>
              </button>

            </form>

          </div>
        </>
      )}
    </div>
  )
}

export default SearchBar