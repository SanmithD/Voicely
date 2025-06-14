import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

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
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/community" className="hover:text-white">Community</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
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
