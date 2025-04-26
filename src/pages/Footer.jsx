

export default function  Footer() {
  return (
    <footer className="bg-black text-gray-700 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">UEM JAIPUR</h2>
          <p className="text-sm text-gray-400">
            Step into style with confidence. Quality kicks, curated just for you.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">ALL</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/men" className="hover:text-white">Org</a></li>
            <li><a href="/women" className="hover:text-white">Hackathon</a></li>
            <li><a href="/kids" className="hover:text-white">college</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/careers" className="hover:text-white">Careers</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
  <a href="#" className="hover:opacity-80">
    <img src="../src/assets/instagram.png" alt="Instagram" className="w-6 h-6" />
  </a>
  <a href="#" className="hover:text-white"><img src="../src/assets/twitter-logo.png" alt="Twitter" className="w-6 h-6" /></a>
  <a href="#" className="hover:text-white"><img src="../src/assets/face.png" alt="Twitter" className="w-6 h-6" /></a>
</div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DEVELOPER All rights reserved.
      </div>
    </footer>
  );
}


