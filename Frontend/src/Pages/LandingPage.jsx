// import React from "react";
// import Navbar from "../Components/Navbar";
// import HeroBanner from "../Components/HeroBanner";
// import CategoryCircles from "../Components/CategoryCircles";
// import BestSellers from "../Components/BestSeller";
// import ProductGrid from "../Components/ProductGrid";
// import PromoGrid from "../Components/PromoGrid";
// import TrendingProducts from "../Components/TrendingProducts";
// import CustomerReviews from "../Components/CustomerReviews";
// import Footer from "../Components/Footer";

// function LandingPage() {
//   return (
//     <div className="bg-gray-100">
//       <Navbar />
//       <HeroBanner />
//       <CategoryCircles />
//       <BestSellers />
//       <ProductGrid />
//       <PromoGrid />
//       <TrendingProducts />
//       <CustomerReviews />
//       <Footer />
//     </div>
//   );
// }
// export default LandingPage;

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
import logo from "../assets/Zarvoc2.png"; // Ensure the path is correct
import BrandMarquee from "./BrandMarquee";
import Ai from "../Components/Ai";

function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Show logo for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img src={logo} alt="Zarvoc Logo" className="w-40 h-40 animate-pulse" />
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
