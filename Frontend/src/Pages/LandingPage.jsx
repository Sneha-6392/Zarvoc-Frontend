import React from "react";
import Navbar from "../Components/Navbar";
import HeroBanner from "../Components/HeroBanner";
import CategoryCircles from "../Components/CategoryCircles";
import BestSellers from "../Components/BestSeller";
import ProductGrid from "../Components/ProductGrid";
import PromoGrid from "../Components/PromoGrid";
import TrendingProducts from "../Components/TrendingProducts";
import CustomerReviews from "../Components/CustomerReviews";
import Footer from "../Components/Footer";

function LandingPage() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroBanner />
      <CategoryCircles />
      <BestSellers />
      <ProductGrid />
      <PromoGrid />
      <TrendingProducts />
      <CustomerReviews />
      <Footer />
    </div>
  );
}
export default LandingPage;
