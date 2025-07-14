import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BrandCarousel from "../Components/BrandCarousel";
import CustomerReviews from "../Components/CustomerReviews";
import HeroBanner from "../Components/HeroBanner";
import CategoryCircles from "../Components/CategoryCircles";
import TrendingProducts from "../Components/TrendingProducts";
import ProductGrid from "../Components/ProductGrid";
function LandingPage() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroBanner />
      <CategoryCircles />
      <ProductGrid />
      <BrandCarousel />
      <TrendingProducts />
      <CustomerReviews />
      <Footer />
    </div>
  );
}
export default LandingPage;
