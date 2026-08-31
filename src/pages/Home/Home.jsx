import { Link } from "react-router-dom"

import baggyImage from "../../assets/home/baggy.png"
import hoodiesImage from "../../assets/home/hoodies.png"
import jacketImage from "../../assets/home/jacket.png"

import "./Home.css"

function Home() {
  return (
    <div className="home">
      <section className="categories">
        <div className="section-heading">
          <p>EXPLORE OUR COLLECTION</p>

          <h2>SHOP BY CATEGORY</h2>
        </div>

        <div className="category-grid">
          <Link
            to="/products"
            className="category-card"
          >
            <img
              src={baggyImage}
              alt="Baggy Jeans"
            />

            <div className="category-title">
              <h3>BAGGY JEANS</h3>
              <span>→</span>
            </div>
          </Link>

          <Link
            to="/products"
            className="category-card"
          >
            <img
              src={hoodiesImage}
              alt="Hoodies"
            />

            <div className="category-title">
              <h3>HOODIES</h3>
              <span>→</span>
            </div>
          </Link>

          <Link
            to="/products"
            className="category-card"
          >
            <img
              src={jacketImage}
              alt="Jackets"
            />

            <div className="category-title">
              <h3>JACKETS</h3>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="shop-all">
        <p>Explore our latest fashion collection.</p>

        <Link
          to="/products"
          className="shop-button dark"
        >
          SHOP ALL
        </Link>
      </section>
    </div>
  )
}

export default Home