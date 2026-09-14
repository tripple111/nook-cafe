import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ReservationForm } from "@/components/ReservationForm";
import { MenuCategory } from "@/components/MenuCategory";

const CATEGORY_ORDER = [
  "Coffee & Espresso",
  "Fresh In-House Pastries",
  "Seasonal Plates",
  "Teas & Seasonal Drinks",
];

type MenuItem = {
  name: string;
  price: string;
  category: string;
  sort_order: number;
};

export default async function Home() {
  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("name, price, category, sort_order")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  const itemsByCategory = new Map<string, MenuItem[]>();
  for (const item of (menuItems ?? []) as MenuItem[]) {
    const existing = itemsByCategory.get(item.category) ?? [];
    existing.push(item);
    itemsByCategory.set(item.category, existing);
  }

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-10">
        <div className="bg-[#5C1A24] text-[#FAF3E7] text-xs tracking-wide py-2 overflow-hidden">
          <div className="flex w-max animate-marquee">
            <span className="flex shrink-0 items-center">
              <span>Open Mon–Fri 8am–6pm · Sat–Sun 9am–4pm</span>
              <span className="mx-8">•</span>
              <span>Fresh pastries baked daily</span>
              <span className="mx-4">•</span>
            </span>
            <span className="flex shrink-0 items-center" aria-hidden="true">
              <span>Open Mon–Fri 8am–6pm · Sat–Sun 9am–4pm</span>
              <span className="mx-8">•</span>
              <span>Fresh pastries baked daily</span>
              <span className="mx-4">•</span>
            </span>
          </div>
        </div>
        <div className="bg-[#E8DCC8] border-b border-black/10">
          <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
            <a
              href="#about"
              className="text-sm font-medium hover:text-[#5C1A24] transition-colors duration-200"
            >
              About
            </a>
            <div className="font-display text-4xl font-semibold text-[#5C1A24]">
              Nook Cafe
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#menu"
                className="text-sm font-medium hover:text-[#5C1A24] transition-colors duration-200"
              >
                Menu
              </a>
              <a
                href="#reservations"
                className="text-sm font-medium hover:text-[#5C1A24] transition-colors duration-200"
              >
                Reservations
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full h-[80vh]">
        <Image
          src="/cafepic.jpg"
          alt="Nook Cafe interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-8 w-full">
            <div className="max-w-md bg-[#5C1A24]/90 text-[#FAF3E7] p-10 rounded-lg">
              <h1 className="font-display text-4xl leading-tight">
                The neighbourhood living room, your 3rd space and second home
              </h1>
              <a
                href="#menu"
                className="inline-block mt-8 px-8 py-3.5 bg-[#FAF3E7] text-[#5C1A24] font-display font-semibold rounded hover:bg-[#e9dcc4] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                View Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-[#F1E8D8]">
        <div className="max-w-xl mx-auto px-8 text-center">
          <h2 className="font-display text-3xl text-[#5C1A24] mb-5">
            About Nook
          </h2>
          <p className="text-lg">
            Welcome to Nook, a neighbourhood spot for community connection. We
            source our coffee from local roasters and brew it fresh daily, all
            pastries are baked in house and based on seasonal ingredients.
          </p>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 bg-[#5C1A24]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="bg-[#F1E8D8] rounded-2xl p-12">
            <h2 className="font-display text-3xl text-[#5C1A24] text-center mb-16">
              Menu
            </h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {CATEGORY_ORDER.map((category) => (
                <MenuCategory
                  key={category}
                  category={category}
                  items={itemsByCategory.get(category) ?? []}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATIONS */}
      <section id="reservations" className="py-20 bg-[#F1E8D8]">
        <div className="max-w-xl mx-auto px-8">
          <h2 className="font-display text-3xl text-[#5C1A24] text-center mb-3">
            Reservations
          </h2>
          <p className="text-center text-[#2B211C]/80 mb-10">
            Book a table and we&apos;ll send you a confirmation by email.
          </p>
          <ReservationForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-[#C9BB9E] text-[#2B211C] pt-14 pb-8">
        <div className="max-w-5xl mx-auto px-8 flex flex-wrap justify-between gap-8">
          <div>
            <h3 className="font-display text-lg mb-2">Visit Us</h3>
            <p className="text-sm opacity-90">
              12 Carrer de la Llum
              <br />
              Barcelona, Spain
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg mb-2">Hours</h3>
            <p className="text-sm opacity-90">
              Mon–Fri: 8am–6pm
              <br />
              Sat–Sun: 9am–4pm
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg mb-2">Follow</h3>
            <a href="#" className="text-sm opacity-90">
              @nookcafe
            </a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-8 mt-10 pt-5 border-t border-black/10 text-xs opacity-70 text-center">
          © 2026 Nook Cafe. All rights reserved.
        </div>
      </footer>
    </>
  );
}
