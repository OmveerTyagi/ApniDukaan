import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductPage.module.css";
import { PropagateLoader } from "react-spinners";

const ProductPage = () => {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // debounced value
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  // Fetch products
  const FetchProducts = async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    setProducts(data.products);
    setFilteredProducts(data.products);

    const uniqueCategories = [
      "all",
      ...new Set(data.products.map((p) => p.category)),
    ];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  // Debounce search query (runs after 400ms of no typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Apply filters/search/sort
  useEffect(() => {
    if (!products) return;

    let updatedProducts = [...products];

    // 🔹 Use debounced search query
    if (debouncedQuery.trim() !== "") {
      updatedProducts = updatedProducts.filter((p) =>
        p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (sortBy === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-high-low") {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(updatedProducts);
  }, [debouncedQuery, selectedCategory, sortBy, products]);

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("");
    setFilteredProducts(products);
  };

  if (products === null) {
    return (
      <div className={styles.loaderWrapper}>
        <PropagateLoader color="#36d7b7" size={15} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Controls Section */}
      <div className={styles.controls}>
        <div className={styles.leftControls}>
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.dropdown}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.dropdown}
          >
            <option value="">Sort</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating-high-low">Rating: High to Low</option>
          </select>

          {/* Clear Filters Button */}
          {(searchQuery || sortBy || selectedCategory !== "all") && (
            <button onClick={clearFilters} className={styles.clearBtn}>
              Clear Filters ✕
            </button>
          )}
        </div>

        {/* Search */}
        <div className={styles.rightControls}>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBox}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.noResults}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
