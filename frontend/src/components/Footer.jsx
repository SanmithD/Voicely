import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-white">Voicely</h2>
          <p className="text-sm mt-2">
            Share your thoughts, connect with others, and express yourself freely.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Navigation</h3>
          <ul className="text-sm space-y-1">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/community" className="hover:text-white">Community</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/sanmith.devadiga" className="hover:text-white" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://x.com/Sanmith82255043" className="hover:text-white" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/sanmith_04/" className="hover:text-white" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sanmith-devadiga-227983291/" className="hover:text-white" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/SanmithD" className="hover:text-white" aria-label="LinkedIn">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-zinc-500 mt-8 border-t border-zinc-700 pt-4">
        &copy; {new Date().getFullYear()} Voicely. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
