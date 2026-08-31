import React from "react"
import { Link } from "react-router-dom"
import "./About.css"

function About() {
  return (
    <div className="about-page">

      <section className="about-header">
        <p className="about-subtitle">OUR STORY & VISION</p>
        <h1 className="about-title">ABOUT US</h1>
      </section>

      <section className="about-content">
        <div className="about-story">
          <h2>THE BEGINNING</h2>
          <p>
            At <strong>FIND YOUR STYLE</strong>, we believe fashion is more than
            just clothing—it is a direct reflection of your identity, mindset,
            and values. Founded in <strong>2026</strong> in{" "}
            <strong>Kerala</strong> by <strong>Abdul Majid</strong>, our mission
            is to empower individuals to express their true selves through a
            curated collection of modern, high-quality apparel.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>METICULOUS CURATION</h3>
            <p>
              Every piece in our collection is handpicked for exceptional fit,
              comfort, and premium material quality to elevate your daily style.
            </p>
          </div>

          <div className="about-card">
            <h3>RESPONSIBLE FASHION</h3>
            <p>
              We prioritize thoughtful production and sourcing, ensuring you
              get durable, timeless apparel you can feel completely confident
              wearing.
            </p>
          </div>

          <div className="about-card">
            <h3>BUILT FOR YOU</h3>
            <p>
              We continuously analyze modern fashion shifts to deliver clean,
              streetwear-inspired designs that stand the test of time.
            </p>
          </div>
        </div>

        <div className="about-community">
          <h2>JOIN THE COMMUNITY</h2>
          <p>
            <strong>FIND YOUR STYLE</strong> is more than just a retail store; we are a
            growing space built for creators, tastemakers, and daily wearers
            who value authenticity. Explore our collection and discover the
            pieces that speak to your aesthetic.
          </p>
          <Link to="/products" className="about-cta-btn">
            EXPLORE CATALOG
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About