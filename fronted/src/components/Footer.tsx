import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 ">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">BrandLogo</h2>
          <p className="text-sm text-gray-600">
            Creating beautiful, modern and responsive web apps.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#">
              <Facebook />
            </a>
            <a href="#">
              <Instagram />
            </a>
            <a href="#">
              <Twitter />
            </a>
            <a href="#">
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} BrandLogo — All rights reserved.
      </div>
    </footer>
  );
}
