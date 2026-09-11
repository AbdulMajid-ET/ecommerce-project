import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { fetchProducts } from "../../redux/slices/productSlice"
import ProductCard from "../../components/ProductCard/ProductCard"
import CustomSelect from "../../components/CustomSelect/CustomSelect"

import "./Products.css"

function Products() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const { products, loading, error } = useSelector(
    (state) => state.products
  )

  const searchTerm = searchParams.get("search") || ""

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState("default")
  const [currentPage, setCurrentPage] = useState(1)

  // Each page should show 8 products
  const productsPerPage = 8

  // Category dropdown options
  const categoryOptions = useMemo(() => {
    const categories = [
      ...new Set(
        products.map((product) => product.category)
      ),
    ]

    return [
      {
        value: "all",
        label: "ALL CATEGORIES",
      },
      ...categories.map((category) => ({
        value: category,
        label: category.toUpperCase(),
      })),
    ]
  }, [products])

  // Sort dropdown options
  const sortOptions = [
    {
      value: "default",
      label: "DEFAULT",
    },
    {
      value: "aToZ",
      label: "ALPHABETICALLY, A-Z",
    },
    {
      value: "zToA",
      label: "ALPHABETICALLY, Z-A",
    },
    {
      value: "lowToHigh",
      label: "PRICE, LOW TO HIGH",
    },
    {
      value: "highToLow",
      label: "PRICE, HIGH TO LOW",
    },
  ]

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Handle category filter
  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    setCurrentPage(1)

    // Clear search when category changes
    setSearchParams({})
  }

  // Handle sorting
  const handleSortChange = (value) => {
    setSortOption(value)
    setCurrentPage(1)
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filtering
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()

      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
      )
    }

    // Category filtering
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      )
    }

    // Price: low to high
    if (sortOption === "lowToHigh") {
      result.sort(
        (a, b) => a.price - b.price
      )
    }

    // Price: high to low
    if (sortOption === "highToLow") {
      result.sort(
        (a, b) => b.price - a.price
      )
    }

    // Alphabetically: A-Z
    if (sortOption === "aToZ") {
      result.sort(
        (a, b) =>
          a.title.localeCompare(b.title)
      )
    }

    // Alphabetically: Z-A
    if (sortOption === "zToA") {
      result.sort(
        (a, b) =>
          b.title.localeCompare(a.title)
      )
    }

    return result
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortOption,
  ])

  // Calculate total number of pages
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  )

  // Calculate starting product index
  const startIndex =
    (currentPage - 1) * productsPerPage

  // Get products for current page
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  // Loading state
  if (loading) {
    return (
      <div className="products-loading">
        <h2>LOADING PRODUCTS...</h2>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="products-error">
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <main className="products-page">

      {/* Page title */}

      <h1 className="products-page-title">
        PRODUCTS
      </h1>

      {/* Filter and Sort Toolbar */}

      <section className="products-toolbar">

        {/* Category Filter */}

        <div className="toolbar-left">

          <span className="toolbar-label">
            FILTER:
          </span>

          <CustomSelect
            value={selectedCategory}
            options={categoryOptions}
            onChange={handleCategoryChange}
          />

        </div>

        {/* Sort */}

        <div className="toolbar-right">

          <span className="toolbar-label">
            SORT BY:
          </span>

          <CustomSelect
            value={sortOption}
            options={sortOptions}
            onChange={handleSortChange}
          />

          <span className="products-count-label">
            {filteredProducts.length} PRODUCTS
          </span>

        </div>

      </section>

      {/* Products */}

      {currentProducts.length === 0 ? (

        <div className="products-empty">

          <h2>
            NO PRODUCTS FOUND
          </h2>

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

      {/* Pagination */}

      {totalPages > 1 && (

        <div className="products-pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
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
              className={`pagination-number ${currentPage === page
                  ? "active"
                  : ""
                }`}
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>

          ))}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
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