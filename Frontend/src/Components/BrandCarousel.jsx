import React from 'react';

const BrandCarousel = () => {
  const card1Images = [
    {
      src: 'https://i.pinimg.com/736x/25/42/4e/25424e23d2e0923eba2910da3288b7f5.jpg',
      alt: 'Sofa'
    },
    {
      src: 'https://i.pinimg.com/736x/6c/b0/2f/6cb02f988fb34ce7d7eabc85f0650764.jpg',
      alt: 'Lamp'
    },
    {
      src: 'https://i.pinimg.com/736x/03/ee/f7/03eef7ab45ca6b31fbd6ab47d6d6798b.jpg',
      alt: 'Table'
    },
    {
      src: 'https://i.pinimg.com/736x/1c/2a/c5/1c2ac57e1177411e2b77dc8ded752be6.jpg',
      alt: 'Chair'
    },
  ];

  const card2Images = [
    {
      src: 'https://i.pinimg.com/736x/c1/1d/20/c11d206e3242c393f8d750ff247051af.jpg',
      alt: 'Powerbank'
    },
    {
      src: 'https://i.pinimg.com/736x/1d/62/a5/1d62a595b6ab78f8b69df0369907b088.jpg',
      alt: 'Phone case'
    },
    {
      src: 'https://i.pinimg.com/736x/89/b0/93/89b093ba10cc816ae722c08702acc67a.jpg',
      alt: 'Cables'
    },
    {
      src: 'https://i.pinimg.com/736x/bb/78/5d/bb785d02c5eea50af03b9a9aef35f9df.jpg',
      alt: 'Headphones'
    },
  ];

  const adImages = [
    'https://i.pinimg.com/736x/1c/3b/dc/1c3bdccfb2d610b22d80f0bbce3f1232.jpg',
    'https://i.pinimg.com/736x/89/d2/8d/89d28d2640ee549bdcdc88318c091177.jpg',
    'https://i.pinimg.com/736x/ac/de/e1/acdee10d31e8bcfb367959fe9ce2c6f7.jpg'
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 py-10 bg-gray-100">
      {/* Card 1 */}
      <div className="bg-[#dddddd] p-6 w-[340px] flex flex-col items-center">
        <div className="w-full text-left text-2xl font-normal mb-4">Revamp your home in style</div>
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {card1Images.map((img, index) => (
            <div key={index} className="bg-white h-32 rounded flex items-center justify-center">
              <img src={img.src} alt={img.alt} className="h-24 object-cover" />
            </div>
          ))}
        </div>
        <button className="bg-white px-4 py-1 rounded-full text-black text-lg font-normal shadow">Explore more</button>
      </div>

      {/* Card 2 */}
      <div className="bg-[#dddddd] p-6 w-[340px] flex flex-col items-center">
        <div className="w-full text-left text-2xl font-normal mb-4">Top mobile accessories</div>
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {card2Images.map((img, index) => (
            <div key={index} className="bg-white h-32 rounded flex items-center justify-center">
              <img src={img.src} alt={img.alt} className="h-24 object-cover" />
            </div>
          ))}
        </div>
        <button className="bg-white px-4 py-1 rounded-full text-black text-lg font-normal shadow">Explore more</button>
      </div>

      {/* Ads Column */}
      <div className="flex flex-col gap-6">
        {adImages.slice(0, 2).map((src, index) => (
          <div key={index} className="bg-[#dddddd] rounded-xl w-[300px] h-[170px] flex items-center justify-center">
            <img src={src} alt={`Ad ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Large Ad */}
      <div className="bg-[#dddddd] rounded-xl w-[300px] h-[370px] flex items-center justify-center">
        <img src={adImages[2]} alt="Ad 3" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default BrandCarousel;