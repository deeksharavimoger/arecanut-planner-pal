import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                Areca<span className="text-accent">Wise</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Your digital partner for smarter arecanut farming. Helping farmers improve yield and reduce losses through technology.
            </p>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <MapPin className="w-4 h-4" />
              <span>Karnataka & Kerala, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Disease Guide", path: "/diseases" },
                { name: "Pest Management", path: "/pests" },
                { name: "Weather Advisory", path: "/weather" },
                { name: "Market Prices", path: "/market" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { name: "Planting Guide", path: "/planting" },
                { name: "Fertilizer Calculator", path: "/planting" },
                { name: "Collection Hubs", path: "/market" },
                { name: "Expert Advice", path: "/diseases" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@arecawise.com" className="hover:text-accent transition-colors">
                  support@arecawise.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <a href="tel:+918001234567" className="hover:text-accent transition-colors">
                  +91 800-123-4567
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
              <p className="text-xs text-primary-foreground/60">
                Available in Kannada, Malayalam, Hindi & English
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} ArecaWise. Made with ❤️ for Indian Farmers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
