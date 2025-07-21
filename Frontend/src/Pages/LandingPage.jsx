import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import HeroBanner from "../Components/HeroBanner";
import CategoryCircles from "../Components/CategoryCircles";
import BestSellers from "../Components/BestSeller";
import ProductGrid from "../Components/ProductGrid";
import PromoGrid from "../Components/PromoGrid";
import TrendingProducts from "../Components/TrendingProducts";
import CustomerReviews from "../Components/CustomerReviews";
import Footer from "../Components/Footer";
import { HashLoader } from "react-spinners"; // Import HashLoader
// import logo from "../assets/Zarvoc2.png"; // No longer needed for loader if only used for loader
import BrandMarquee from "./BrandMarquee";
import Ai from "../Components/Ai";

function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000); // Changed to 3000ms for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        {/* HashLoader component with customizable color and size */}
        <HashLoader color="#3182CE" size={80} />
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroBanner />
      <CategoryCircles />
      <BestSellers />
      <ProductGrid />
      <BrandMarquee />
      <PromoGrid />

      <TrendingProducts />
      <CustomerReviews />

      <Footer />
    </div>
  );
}

export default LandingPage;
