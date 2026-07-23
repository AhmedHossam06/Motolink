import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Bike,
  ShieldCheck,
  Wrench,
  Disc,
  Shield,
  Zap,
  CircleDot,
  Package,
  ShoppingCart,
  Gauge,
  Droplet,
  Sparkles,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import heroVideo from "../assets/Home_page_video.mp4";
import heroPoster from "../assets/hero.png";
import * as api from "../api";
import { formatPrice, resolveImageUrl } from "../api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Maps the "icon" string returned by the backend to an actual lucide-react icon.
// Falls back to a generic package icon for any name we don't recognize yet.
const CATEGORY_ICONS = {
  disc: Disc,
  shield: Shield,
  wrench: Wrench,
  zap: Zap,
  dot: CircleDot,
};

const RIDE_SMARTER_TIPS = [
  {
    icon: Gauge,
    title: "Check your tire pressure monthly",
    text: "Under-inflated tires wear faster and hurt handling. Takes two minutes, saves your grip.",
  },
  {
    icon: Droplet,
    title: "Don't skip chain lubrication",
    text: "A dry chain wears out sprockets fast. Lube every 300–500 km, more often in the rain.",
  },
  {
    icon: ShieldCheck,
    title: "Replace your helmet after impact",
    text: "Even a small drop can compromise the shell. When in doubt, swap it out.",
  },
];

function ProductCard({ product, onQuickAdd, busy }) {
  const onSale = product.onSale && product.salePrice != null;

  return (
    <div className="relative bg-white border border-motolink-blue-light rounded-xl overflow-hidden hover:shadow-sm transition-shadow flex flex-col">
      {onSale && (
        <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[11px] font-display font-bold uppercase tracking-wide px-2 py-1 rounded-md">
          Sale
        </span>
      )}

      <Link to={`/product/${product.id}`} className="block aspect-square bg-motolink-blue-light/40">
        {product.imageUrl && (
          <img
            src={resolveImageUrl(product.imageUrl)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
      </Link>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-sm sm:text-base text-motolink-blue-dark line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto mb-3">
          {onSale ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-bold text-red-600 text-sm sm:text-base">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-motolink-slate text-xs sm:text-sm line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="font-display font-bold text-motolink-blue-dark text-sm sm:text-base">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          onClick={() => onQuickAdd(product.id)}
          disabled={busy}
          className="w-full flex items-center justify-center gap-1.5 bg-motolink-blue hover:bg-blue-700 disabled:opacity-50 transition-colors text-white text-xs sm:text-sm font-display font-semibold py-2 rounded-lg cursor-pointer disabled:cursor-default"
        >
          <ShoppingCart size={14} />
          {busy ? "Adding…" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

// Paginated product slider: shows exactly 4 products at a time (2x2 on mobile).
// Clicking the arrows moves a full "page" at once instead of free scrolling.
function ProductSlider({ products, onQuickAdd, busyProductId }) {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.ceil(products.length / perPage);

  const goPrev = () => setPage((p) => Math.max(p - 1, 0));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex items-start transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 w-full shrink-0"
            >
              {products
                .slice(pageIndex * perPage, pageIndex * perPage + perPage)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    busy={busyProductId === product.id}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <>
          <button
            onClick={goPrev}
            disabled={page === 0}
            aria-label="Previous products"
            className="cursor-pointer disabled:cursor-default disabled:opacity-30 absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-motolink-blue-light shadow-md hover:bg-motolink-blue-light transition-colors"
          >
            <ChevronLeft size={18} className="text-motolink-blue-dark" />
          </button>
          <button
            onClick={goNext}
            disabled={page === totalPages - 1}
            aria-label="Next products"
            className="cursor-pointer disabled:cursor-default disabled:opacity-30 absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-motolink-blue-light shadow-md hover:bg-motolink-blue-light transition-colors"
          >
            <ChevronRight size={18} className="text-motolink-blue-dark" />
          </button>

          {/* Page dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`cursor-pointer w-2 h-2 rounded-full transition-colors ${
                  i === page ? "bg-motolink-blue" : "bg-motolink-blue-light"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const { categories } = useLoaderData();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [busyProductId, setBusyProductId] = useState(null);

  // One fetch, reused for Featured, Deals, and the real brand list -
  // avoids hitting the backend three separate times for the same data.
  useEffect(() => {
    api
      .getProducts({ size: 100 })
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.content || [];
        setAllProducts(list);
      })
      .catch(() => setAllProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  // Featured now shows every product that came back, paginated 4 at a time by the slider
  const featured = allProducts;
  // Deals now shows products the admin actually put on sale, not a random slice
  const deals = allProducts.filter((p) => p.onSale).slice(0, 8);

  // Real brands pulled from the products themselves, not hardcoded
  const brands = [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].slice(0, 6);

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickAdd = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setBusyProductId(productId);
    try {
      await addToCart(productId, 1);
    } catch {
      // Cart page will surface any real errors on open
    } finally {
      setBusyProductId(null);
    }
  };

  return (
    <main>
      {/* Hero: video background */}
      <section className="relative h-[70vh] sm:h-[80vh] min-h-[420px] max-h-[750px] overflow-hidden bg-motolink-blue-dark">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-motolink-blue-dark/40" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl text-white leading-tight max-w-2xl">
            Your ride, one link away.
          </h1>
          <p className="font-body text-white/80 text-base sm:text-lg mt-4 max-w-lg">
            Motolink connects you with the parts, service and gear your bike
            actually needs.
          </p>
          <div className="mt-6 sm:mt-8">
            <button
              onClick={scrollToCategories}
              className="cursor-pointer bg-motolink-blue hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 text-white font-display font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base"
            >
              Shop now
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
        <h2 className="font-display font-bold text-2xl text-motolink-blue-dark mb-6">
          Shop by category
        </h2>

        {!categories || categories.length === 0 ? (
          <p className="text-motolink-slate text-sm">Categories will show up here once available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] || Package;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="cursor-pointer flex flex-col items-center gap-2 bg-white border border-motolink-blue-light rounded-xl p-5 hover:border-motolink-blue hover:shadow-sm transition-all text-center"
                >
                  <div className="p-3 rounded-full bg-motolink-blue-light">
                    <Icon className="text-motolink-blue" size={22} />
                  </div>
                  <span className="font-display font-semibold text-sm text-motolink-blue-dark">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Featured Gear - now a horizontal slider */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-motolink-blue-dark">
            Featured gear
          </h2>
          <Link
            to="/products"
            className="text-sm font-display font-semibold text-motolink-blue hover:underline"
          >
            View all
          </Link>
        </div>

        {productsLoading ? (
          <p className="text-motolink-slate text-sm">Loading featured products…</p>
        ) : featured.length === 0 ? (
          <p className="text-motolink-slate text-sm">Featured products will show up here soon.</p>
        ) : (
          <ProductSlider
            products={featured}
            busyProductId={busyProductId}
            onQuickAdd={handleQuickAdd}
          />
        )}
      </section>

      {/* Deals - only real on-sale products, set by the admin */}
      {!productsLoading && deals.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="text-motolink-blue" size={20} />
            <h2 className="font-display font-bold text-2xl text-motolink-blue-dark">
              Deals
            </h2>
          </div>
          <ProductSlider
            products={deals}
            busyProductId={busyProductId}
            onQuickAdd={handleQuickAdd}
          />
        </section>
      )}

      {/* Top Brands - pulled from actual product data, not hardcoded */}
      {!productsLoading && brands.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="font-display font-bold text-2xl text-motolink-blue-dark mb-6">
            Top brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center bg-white border border-motolink-blue-light rounded-xl py-5 px-3 hover:border-motolink-blue transition-colors"
              >
                <span className="font-display font-semibold text-sm sm:text-base text-motolink-blue-dark text-center">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why choose Motolink */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="font-display font-bold text-2xl text-motolink-blue-dark mb-8">
          Why choose Motolink
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Bike, title: "Genuine parts", text: "Sourced and checked for your exact model." },
            { icon: Wrench, title: "Trusted service", text: "Book verified mechanics near you." },
            { icon: ShieldCheck, title: "Secure checkout", text: "Your orders and data, protected end to end." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <div className="p-3 rounded-xl bg-motolink-blue-light">
                <Icon className="text-motolink-blue" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-motolink-blue-dark">
                {title}
              </h3>
              <p className="text-motolink-slate text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ride Smarter: lifestyle / educational content */}
      <section className="bg-motolink-blue-light/40 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="text-motolink-blue" size={22} />
            <h2 className="font-display font-bold text-2xl text-motolink-blue-dark">
              Ride smarter
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RIDE_SMARTER_TIPS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white border border-motolink-blue-light rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="p-2.5 rounded-lg bg-motolink-blue-light w-fit">
                  <Icon className="text-motolink-blue" size={20} />
                </div>
                <h3 className="font-display font-semibold text-motolink-blue-dark">
                  {title}
                </h3>
                <p className="text-motolink-slate text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}