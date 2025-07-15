import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Fashion",
    image: "https://assets.ajio.com/medias/sys_master/root/20240903/W3VZ/66d717cd6f60443f314e10fb/-473Wx593H-442429443-indigo-MODEL.jpg",
    category: "fashionProducts",
  },
  {
    id: 2,
    name: "Gadgets",
    image: "https://www.dxomark.com/wp-content/uploads/medias/post-157488/Google-Pixel-8-Pro-featured-image-packshot-review.jpg",
    category: "electronic",
  },
  {
    id: 3,
    name: "Furniture",
    image: "https://www.ulcdn.net/images/products/921494/product/Sidney_Study_Table_Rustik_Oak_LP.jpg?1722319558",
    category: "furnitureProducts",
  },
  {
    id: 4,
    name: "Appliances",
    image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1724939978/Croma%20Assets/Small%20Appliances/Microwave%20or%20OTG/Images/229341_0_pokxm4.png",
    category: "kitchenProducts",
  },
  {
    id: 5,
    name: "Toys",
    image: "https://mmtoyworld.com/cdn/shop/files/PeppaPigFamilyHouseToySet-5Pcs_EducationalPlayfor3_Kids_PinkIncludes1Umbrella_3Chairs_1Table.jpg?v=1708711004",
    category: "childrenToysProducts",
  },
  {
    id: 6,
    name: "Cosmetics",
    image: "https://www.netmeds.com/images/product-v1/400x400/891953/lakme_eyeconic_kajal_twin_pack_24h_deep_black_2_x_0_35_gm_2s_84675_1_1.webp",
    category: "cosmeticProducts",
  },
  {
    id: 7,
    name: "Kilos",
    image: "https://m.media-amazon.com/images/I/810bFfXtiZS._UF350,350_QL80_.jpg",
    category: "foodProducts",
  },
  {
    id: 8,
    name: "Sports",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/3/296852212/BA/MJ/ST/40983079/ss-gunther-player-edition-cricket-bat-500x500.jpg",
    category: "sportsProducts",
  },
];

function CategoryCircles() {
  return (
    <section className="bg-gray-100 px-4 py-6 overflow-x-auto whitespace-nowrap">
      <div className="flex justify-center items-center gap-25 min-w-max">
        {/* Optional brand image/logo placeholder */}
        <div className="flex-shrink-0 hidden sm:block">
          <img
            src="https://placehold.co/100x100?text=Brand"
            alt="Brand Logo"
            className="w-20 h-20 object-contain rounded-full border"
          />
        </div>

        {categories.map((cat) => (
          <Link
            to={`/category?cat=${cat.category}`}
            key={cat.id}
            className="flex flex-col items-center flex-shrink-0 hover:scale-105 transition-transform duration-300"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 shadow-sm">
              <img
                src={cat.image}
                className="w-full h-full object-cover"
                alt={cat.name}
              />
            </div>
            <span className="text-sm mt-2 text-center text-gray-700 font-medium">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryCircles;
