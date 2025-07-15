import React from "react";

const PromoGrid = () => {
  return (
    <div className="p-5 bg-gray-100 min-h-screen font-sans">
      <div className="grid grid-cols-3 grid-rows-[repeat(3,200px)] gap-5 max-w-[1500px] mx-auto md:grid-cols-1 md:grid-rows-none">
        <div className="col-span-2 row-span-1 rounded-xl overflow-hidden">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/4be945094f5ac616.jpeg?q=60"
            alt="Banner 1"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-1 row-span-2 rounded-xl overflow-hidden">
          <img
            src="https://rukminim2.flixcart.com/www/1060/1560/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=60"
            alt="Banner 2"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-1 row-span-2 rounded-xl overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/e1/0a/90/e10a901022ea33daad5f9bb035da7afd.jpg"
            alt="Banner 3"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/16/8c/71/168c7155ca5256ccdb949133614f136e.jpg"
            alt="Banner 4"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-2 row-span-1 rounded-xl overflow-hidden">
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
