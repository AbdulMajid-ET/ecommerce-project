import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchProducts } from "../../redux/slices/productSlice"
import ProductCard from "../../components/ProductCard/ProductCard"

import "./Products.css"

function Products() {
  const dispatch = useDispatch()
  const searchInputRef = useRef(null)

  const { products, loading, error } = useSelector(
    (state) => state.products
  )

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ isSearchOpen, setIsSearchOpen ] = useState(false)
  const [ selectedCategory, setSelectedCategory ] = useState("all")
  const [ sortOption, setSortOption ] = useState("default")
  const [ currentPage, setCurrentPage ] = useState(1)

  const productsPerPage = 8

  useEffect(() => {
    dispatch(fetchProducts())
  }, [ dispatch ])

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [ isSearchOpen ])

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
    setCurrentPage(1)
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()

      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
      )
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      )
    }

    if (sortOption === "lowToHigh") {
      result.sort((a, b) => a.price - b.price)
    }

    if (sortOption === "highToLow") {
      result.sort((a, b) => b.price - a.price)
    }

    if (sortOption === "aToZ") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    if (sortOption === "zToA") {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    return result
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortOption,
  ])

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  )

  const startIndex =
    (currentPage - 1) * productsPerPage

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  if (loading) {
    return (
      <div className="products-loading">
        <h2>LOADING PRODUCTS...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-error">
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <main className="products-page">
      <h1 className="products-page-title">
        PRODUCTS
      </h1>

      <section className="products-toolbar">
        <div className="toolbar-left">
          <span className="toolbar-label">FILTER:</span>

          <div className="filter-select-wrapper">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="toolbar-select"
            >
              <option value="all">ALL CATEGORIES</option>
              <option value="Jeans">JEANS</option>
              <option value="Hoodies">HOODIES</option>
            </select>
          </div>
        </div>

        <div className="toolbar-right">
          <div
            className={`search-input-wrapper ${
              isSearchOpen ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="search-icon-btn"
              onClick={handleSearchToggle}
              aria-label="Toggle Search"
            >
              <svg
                className="search-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />
              </svg>
            </button>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="toolbar-search-input"
            />
          </div>

          <span className="toolbar-label">SORT BY:</span>

          <div className="filter-select-wrapper">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="toolbar-select"
            >
              <option value="default">DEFAULT</option>
              <option value="aToZ">
                ALPHABETICALLY, A-Z
              </option>
              <option value="zToA">
                ALPHABETICALLY, Z-A
              </option>
              <option value="lowToHigh">
                PRICE, LOW TO HIGH
              </option>
              <option value="highToLow">
                PRICE, HIGH TO LOW
              </option>
            </select>
          </div>

          <span className="products-count-label">
            {filteredProducts.length} PRODUCTS
          </span>
        </div>
      </section>

      {currentProducts.length === 0 ? (
        <div className="products-empty">
          <h2>NO PRODUCTS FOUND</h2>

          <p>
            Try clearing your filters or search term.
          </p>
        </div>
      ) : (
        <section className="products-grid">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      )}

      {totalPages > 1 && (
        <div className="products-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="pagination-arrow"
          >
            ←
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              className={`pagination-number ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="pagination-arrow"
          >
            →
          </button>
        </div>
      )}
    </main>
  )
}

export default Products