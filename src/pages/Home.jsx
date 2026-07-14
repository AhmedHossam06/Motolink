import { Bike, ShieldCheck, Wrench } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* video background */}
      <section className="relative h-[85vh] min-h-[480px] overflow-hidden bg-motolink-blue-dark">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="/video-poster.jpg"
        >
          <source src="/src/assets/Home_page_video.mp4" type="video/mp4" />
        </video>

        {/* overlay 3ala elvideo */}
        <div className="absolute inset-0 bg-motolink-blue-dark/40" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight max-w-2xl">
            Your ride, one link away.
          </h1>
          <p className="font-body text-white/80 text-lg mt-4 max-w-lg">
            Motolink connects you with the parts, service and gear your bike
            actually needs.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-motolink-blue hover:bg-blue-700 transition-colors text-white font-display font-semibold px-6 py-3 rounded-lg">
              Shop now
            </button>
            <button className="bg-white/10 hover:bg-white/20 transition-colors text-white font-display font-semibold px-6 py-3 rounded-lg border border-white/30">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/*elheta ely feha elicons*/}
      <section className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </section>
    </main>
  );
}