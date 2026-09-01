import Image from "next/image";
import Link from "next/link";
import type { ServiceCategory } from "@/data/types";

export function ServiceCard({ category }: { category: ServiceCategory }) {
  return (
    <Link
      href={category.href}
      className="group relative flex min-h-[65vh] flex-col justify-end overflow-hidden border border-crimson-light"
    >
      <Image
        src={category.cover}
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
      />
      <div className="relative z-10 bg-gradient-to-t from-noir via-noir/70 to-transparent p-8">
        <h2 className="font-display text-3xl italic text-cream">
          {category.titulo}
        </h2>
        <p className="mt-2 max-w-xs text-sm text-sand">{category.descripcion}</p>
        <span className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-sand">
          Ver tratamientos
        </span>
      </div>
    </Link>
  );
}
