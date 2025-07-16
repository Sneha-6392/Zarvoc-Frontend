import React from "react";

const PromoGrid = () => {
  return (
    <div className="p-5 bg-gray-100 font-sans">

      <div className="max-w-[1500px] mx-auto grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[200px]">
        
        {/* Banner 1 - Large wide banner */}
        <div className="lg:col-span-2 lg:row-span-1 rounded-xl overflow-hidden">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/4be945094f5ac616.jpeg?q=60"
            alt="Banner 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Banner 2 - Tall right banner */}
        <div className="lg:col-span-1 lg:row-span-2 rounded-xl overflow-hidden">
          <img
            src="https://rukminim2.flixcart.com/www/1060/1560/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=60"
            alt="Banner 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Banner 3 - Tall left banner */}
        <div className="lg:col-span-1 lg:row-span-2 rounded-xl overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/e1/0a/90/e10a901022ea33daad5f9bb035da7afd.jpg"
            alt="Banner 3"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Banner 4 - Small square */}
        <div className="lg:col-span-1 lg:row-span-1 rounded-xl overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/16/8c/71/168c7155ca5256ccdb949133614f136e.jpg"
            alt="Banner 4"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Banner 5 - Large wide banner */}
        <div className="lg:col-span-2 lg:row-span-1 rounded-xl overflow-hidden">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/74f0ad81e44e6e6f.jpg?q=60"
            alt="Banner 5"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoGrid;
