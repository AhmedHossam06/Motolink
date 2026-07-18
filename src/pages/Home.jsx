import { useLoaderData, Link } from "react-router-dom";
import {
  Bike,
  ShieldCheck,
  Wrench,
  Disc,
  Shield,
  Zap,
  CircleDot,
  Package,
} from "lucide-react";
import heroVideo from "../assets/Home_page_video.mp4";
import heroPoster from "../assets/hero.png";

// Maps the "icon" string returned by the backend to an actual lucide-react icon.
// Falls back to a generic package icon for any name we don't recognize yet.
const CATEGORY_ICONS = {
  disc: Disc,
  shield: Shield,
  wrench: Wrench,
  zap: Zap,
  dot: CircleDot,
};

export default function Home() {
  const { categories } = useLoaderData();

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
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

        {/* Dark overlay so the text stays readable over the video */}
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

      {/* Categories - straight under the hero video */}
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
    </main>
  );
}