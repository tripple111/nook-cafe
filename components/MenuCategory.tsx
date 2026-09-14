"use client";

import { motion } from "framer-motion";

type MenuItem = {
  name: string;
  price: string;
  category: string;
  sort_order: number;
};

export function MenuCategory({
  category,
  items,
}: {
  category: string;
  items: MenuItem[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-display text-xl text-[#5C1A24] mb-6">{category}</h3>
      {items.map(({ name, price }) => (
        <div
          key={name}
          className="flex justify-between items-baseline gap-4 py-3 border-b border-dashed border-black/20"
        >
          <span className="font-semibold">{name}</span>
          <span className="font-display font-semibold text-[#5C1A24] whitespace-nowrap">
            {price}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
