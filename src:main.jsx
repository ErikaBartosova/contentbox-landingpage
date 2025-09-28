import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

export default function App() {
  return (
    <div className="w-full">
      {/* MENU */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 bg-white/70 rounded-full flex justify-between items-center px-6 py-3 w-[90%] max-w-4xl shadow">
        <div className="flex items-center gap-2">
          <img src="https://placehold.co/30x30" alt="Logo" className="w-8 h-8"/>
          <span className="font-bold text-lg">ContentBox</span>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link to="hero" smooth className="cursor-pointer">Home</Link>
          <Link to="about" smooth className="cursor-pointer">O aplikaci</Link>
          <Link to="faq" smooth className="cursor-pointer">FAQ</Link>
          <Link to="contact" smooth className="cursor-pointer">Kontakt</Link>
        </nav>
      </header>

      {/* HERO SEKCE */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-oswald mb-6">
          <span className="text-secondary">All-in-one</span> platforma <br/> pro tvorbu online kampaní
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Briefing, překlady, schvalování a reporty – vše v jedné aplikaci.
        </p>
        <button className="mt-6 px-6 py-3 bg-white rounded-full shadow btn-hover-scale italic font-bold">
          Navázat spojení
        </button>
      </section>

      {/* O APLIKACI */}
      <section id="about" className="py-20 bg-white text-center px-4">
        <h2 className="text-3xl font-oswald mb-6">Pro koho je ContentBox ideální?</h2>
        <p className="max-w-2xl mx-auto text-lg">
          Ideální pro značky působící online na více trzích, e-shopy hledající centralizovanou výrobu vizuálů i agentury, které chtějí zefektivnit přípravu kampaní <span className="text-secondary">(a mnoho dalších)</span>.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-100 rounded-lg p-6 shadow">Nový projekt spustíte během pár kliknutí.</div>
          <div className="bg-gray-100 rounded-lg p-6 shadow">Texty i grafika vždy po ruce.</div>
          <div className="bg-gray-100 rounded-lg p-6 shadow">Finance a tým pod kontrolou.</div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50 px-6">
        <h2 className="text-3xl font-oswald text-center mb-12">FAQ – Nejčastější dotazy</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            "Podporuje ContentBox i vícejazyčné kampaně?",
            "Jak funguje komunikace mezi manažery a grafiky?",
            "Jak vypadá proces přípravy kampaně?",
            "Co se stane, když potřebujeme přidat nový formát?",
            "Jak má vypadat brief pro grafika?",
            "Jaká je cena?"
          ].map((q,i) => (
            <details key={i} className="bg-white p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold">{q}</summary>
              <p className="mt-2 text-sm text-gray-600">Odpověď na tuto otázku doplníme.</p>
            </details>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section id="contact" className="py-20 bg-gradient-to-b from-white to-primary text-center px-4">
        <h2 className="text-2xl md:text-4xl font-oswald mb-6">
          Máte zájem o spolupráci nebo se chcete na něco zeptat? <br/>
          <a href="mailto:info@contentbakery.cz" className="text-primary underline italic font-bold text-3xl">
            info@contentbakery.cz
          </a>
        </h2>
        <button
          className="mt-4 px-6 py-3 bg-white rounded-full btn-hover-scale flex items-center gap-2 mx-auto"
          onClick={() => navigator.clipboard.writeText("info@contentbakery.cz")}
        >
          Zkopírovat email ✉
        </button>
        <footer className="mt-12 border-t border-dark pt-4 text-sm">
          2025 Content Bakery s.r.o., Salvátorská 931/8, Staré Město, 110 00 Praha
        </footer>
      </section>
    </div>
  );
}
