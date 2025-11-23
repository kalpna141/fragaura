

"use client";
import { useState } from "react";

export default function FiltersSidebar({ onChange }: { onChange: (v:any)=>void }) {
  const [sort, setSort] = useState("name_asc");
  const [topSeller, setTopSeller] = useState(false);
  const [mostPopular, setMostPopular] = useState(false);
  const [q, setQ] = useState("");

  function apply() {
    onChange({ sort, topSeller, mostPopular, q });
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl  shadow-md">
      
      {/* LEFT — SEARCH */}
      <input
        className="w-full md:w-1/3 border-2 border-sky-300 rounded-lg px-3 py-2 text-sm 
        text-sky-900 focus:border-sky-500 focus:outline-none"
        placeholder="Search name..."
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onBlur={apply}
      />

      {/* RIGHT — SORT + CHECKBOXES + APPLY */}
      <div className="flex items-center gap-4">

        {/* SORT */}
        <select
          className="border-2 border-sky-300 rounded-lg px-3 py-2 text-sm 
          text-sky-900 focus:border-sky-500 focus:outline-none"
          value={sort}
          onChange={(e)=>{ setSort(e.target.value); apply(); }}
        >
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
        </select>

        {/* CHECKBOXES */}
        <label className="flex items-center gap-2 text-sm text-sky-900">
          <input 
            type="checkbox" 
            className="accent-sky-500" 
            checked={mostPopular}
            onChange={(e)=>{ setMostPopular(e.target.checked); apply(); }}
          />
          Most Popular
        </label>

        <label className="flex items-center gap-2 text-sm text-sky-900">
          <input 
            type="checkbox" 
            className="accent-sky-500" 
            checked={topSeller}
            onChange={(e)=>{ setTopSeller(e.target.checked); apply(); }}
          />
          Top Seller
        </label>

        <button
          onClick={apply}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

