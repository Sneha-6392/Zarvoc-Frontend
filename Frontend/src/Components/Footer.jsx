import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white font-sans">
      <div className="flex flex-wrap justify-between px-10 pt-8 pb-4 border-b border-[#2b3642]">
        {/* ABOUT */}
        <div className="min-w-[160px] mb-6">
          <h4 className="text-sm text-[#878787] mb-3">ABOUT</h4>
          <div className="text-xs leading-6">
            <div>Contact Us</div>
            <div>About Us</div>
            <div>Careers</div>
            <div>SuperMarket Stories</div>
            <div>Press</div>
            <div>Corporate Information</div>
          </div>
        </div>

        {/* GROUP COMPANIES */}
        <div className="min-w-[160px] mb-6">
          <h4 className="text-sm text-[#878787] mb-3">GROUP COMPANIES</h4>
          <div className="text-xs leading-6">
            <div>Myntra</div>
            <div>Cleartrip</div>
            <div>Shopsy</div>
          </div>
        </div>

        {/* HELP */}
        <div className="min-w-[160px] mb-6">
          <h4 className="text-sm text-[#878787] mb-3">HELP</h4>
          <div className="text-xs leading-6">
            <div>Payments</div>
            <div>Shipping</div>
            <div>Cancellation & Returns</div>
            <div>FAQ</div>
          </div>
        </div>

        {/* CONSUMER POLICY */}
        <div className="min-w-[200px] mb-6">
          <h4 className="text-sm text-[#878787] mb-3">CONSUMER POLICY</h4>
          <div className="text-xs leading-6">
            <div>Cancellation & Returns</div>
            <div>Terms Of Use</div>
            <div>Security</div>
            <div>Privacy</div>
            <div>Sitemap</div>
            <div>Grievance Redressal</div>
            <div>EPR Compliance</div>
          </div>
        </div>

        {/* MAIL US */}
        <div className="min-w-[250px] mb-6 border-l border-[#454d5e] pl-8">
          <h4 className="text-sm text-[#878787] mb-3">Mail Us:</h4>
          <div className="text-xs leading-[1.7]">
            SuperMarket Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </div>
          <div className="mt-4">
            <span className="text-sm text-[#878787]">Social</span>
            <div className="mt-2 flex gap-3 text-lg">
              <a href="#" className="text-white">&#xf09a;</a>
              <a href="#" className="text-white">&#xf099;</a>
              <a href="#" className="text-white">&#xf16a;</a>
              <a href="#" className="text-white">&#xf16d;</a>
            </div>
          </div>
        </div>

        {/* REGISTERED OFFICE */}
        <div className="min-w-[250px] mb-6">
          <h4 className="text-sm text-[#878787] mb-3">Registered Office Address:</h4>
          <div className="text-xs leading-[1.7]">
            SuperMarket Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: <a href="tel:044-45614700" className="text-[#2874f0]">044-45614700</a> / <a href="tel:044-67415800" className="text-[#2874f0]">044-67415800</a>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-wrap justify-between items-center px-10 py-4 text-sm">
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">&#128188;</span> Become a Seller
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">&#11088;</span> Advertise
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">&#127873;</span> Gift Cards
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">&#10067;</span> Help Center
          </div>
        </div>
        <div className="text-[#878787]">© 2007-2025 SuperMarket.com</div>
        <div className="flex gap-1">
          <img src="https://img.icons8.com/color/36/000000/visa.png" alt="Visa" />
          <img src="https://img.icons8.com/color/36/000000/mastercard-logo.png" alt="Mastercard" />
          <img src="https://img.icons8.com/color/36/000000/amex.png" alt="Amex" />
          <img src="https://img.icons8.com/color/36/000000/discover.png" alt="Discover" />
          <img src="https://img.icons8.com/color/36/000000/rupay.png" alt="Rupay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;