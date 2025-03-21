import { Link } from "wouter";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">PetPals</h3>
            <p className="text-gray-400 text-sm">
              Connecting pet owners with local services and resources in Amsterdam, Dublin, and Calgary.
            </p>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/"><span className="hover:text-white cursor-pointer">Home</span></Link></li>
              <li><Link href="/services"><span className="hover:text-white cursor-pointer">Services Directory</span></Link></li>
              <li><Link href="/info"><span className="hover:text-white cursor-pointer">Pet Information Hub</span></Link></li>
              <li><Link href="/pets"><span className="hover:text-white cursor-pointer">My Pets</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold mb-4">Cities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services?city=Amsterdam"><span className="hover:text-white cursor-pointer">Amsterdam</span></Link></li>
              <li><Link href="/services?city=Dublin"><span className="hover:text-white cursor-pointer">Dublin</span></Link></li>
              <li><Link href="/services?city=Calgary"><span className="hover:text-white cursor-pointer">Calgary</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} PetPals. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
