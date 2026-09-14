import { supabase } from "../lib/supabase";

type MenuItem = {
  name: string;
  price: string;
  category: string;
  sort_order: number;
};

const menu: Record<string, [string, string][]> = {
  "Coffee & Espresso": [
    ["Espresso / Double Espresso", "€2.20 / €2.70"],
    ["Americano", "€2.80"],
    ["Cortado", "€3.00"],
    ["Flat White", "€3.50"],
    ["Cappuccino / Latte", "€3.80"],
    ["Batch Brew Filter", "€3.20"],
    ["Cold Brew", "€4.00"],
  ],
  "Fresh In-House Pastries": [
    ["Classic Butter Croissant", "€2.80"],
    ["Cardamom Morning Bun", "€3.50"],
    ["Seasonal Fruit Galette", "€4.20"],
    ["Almond & Orange Blossom Brioche", "€3.80"],
    ["Sourdough Cinnamon Roll", "€3.80"],
  ],
  "Seasonal Plates": [
    ["House Sourdough Toast", "€4.50"],
    ["Avocado & Herb Toast", "€8.50"],
    ["Whipped Ricotta & Roasted Fruit", "€9.00"],
    ["Nook Breakfast Plate", "€11.50"],
  ],
  "Teas & Seasonal Drinks": [
    ["Matcha Latte", "€4.20"],
    ["Chai Latte", "€4.00"],
    ["Loose Leaf Tea", "€3.20"],
    ["Fresh Cold-Pressed Juice", "€4.50"],
  ],
};

const rows: MenuItem[] = Object.entries(menu).flatMap(([category, items]) =>
  items.map(([name, price], index) => ({
    name,
    price,
    category,
    sort_order: index,
  }))
);

async function seed() {
  const { data, error } = await supabase.from("menu_items").insert(rows).select();

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${data?.length ?? 0} menu items.`);
}

seed();
