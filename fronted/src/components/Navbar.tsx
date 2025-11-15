import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { user, token, logoutUser, isLoading } = useAuthStore();

  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold">
          BrandLogo
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link to="/services" className="hover:text-primary transition">
            Services
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex gap-3">
          {token && user?.isVerified ? (
            <Button
              onClick={logoutUser}
              className="flex items-center justify-center cursor-pointer gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />{" "}
                  <span>Signing Out...</span>
                </div>
              ) : (
                "Sign Out"
              )}
            </Button>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="cursor-pointer">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          <Link to="/" className="block">
            Home
          </Link>
          <Link to="/about" className="block">
            About
          </Link>
          <Link to="/services" className="block">
            Services
          </Link>
          <Link to="/contact" className="block">
            Contact
          </Link>

          <div className="pt-4 border-t flex-col space-y-2 gap-4">
            <Button variant="outline" className="w-full">
              Login
            </Button>
            <Button className="w-full">Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
}
