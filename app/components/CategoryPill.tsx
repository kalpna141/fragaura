import Link from "next/link";

export default function CategoryPill({ c }: { c: any }) {
  return (
    <Link
      href={`/category/${c.slug}`}
      className="px-4 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 font-medium text-sm whitespace-nowrap transition-colors border border-sky-300"
    >
      {c.name}
    </Link>
  );
}
