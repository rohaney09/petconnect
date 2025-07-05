import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-pink-400">🐾 PetConnect</h3>
          <p className="text-sm text-gray-400">
            Helping lost pets find their way back home — one paw at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/report" className="hover:text-white">Report Pet</Link></li>
            <li><Link href="/browse" className="hover:text-white">Browse Pets</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-2">Contact</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Email: <a href="mailto:petconnect@gmail.com" className="hover:underline">petconnect@gmail.com</a></li>
            <li>Phone: <a href="tel:+918889344914" className="hover:underline">+91 88893 44914</a></li>
            <li>Support: Mon – Sat, 9 AM – 6 PM</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Instagram: <a href="#" className="hover:underline">@petconnect</a></li>
            <li>Twitter: <a href="#" className="hover:underline">@petconnect</a></li>
            <li>Facebook: <a href="#" className="hover:underline">PetConnect</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} PetConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
