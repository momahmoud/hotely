"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const filters = ["all", "small", "medium", "large"];
const filtersMap = {
  all: "All Guests",
  small: <>1&mdash;3 Guests</>,
  medium: <>4&mdash;7 Guests</>,
  large: <>8&mdash;11 Guests</>,
};

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = useCallback(
    (filter) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("capacity", filter);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="border border-primary-800 flex rounded-full gap-2">
      {filters.map((filter) => (
        <FilterItem
          key={filter}
          title={filtersMap[filter]}
          onClick={() => handleFilter(filter)}
          selected={filter === activeFilter}
        />
      ))}
    </div>
  );
}

function FilterItem({ title, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={
        "py-3 px-5 rounded-full hover:bg-primary-700 transition-colors flex items-center gap-4 font-semibold text-primary-200" +
        (selected ? " bg-primary-800" : "")
      }
    >
      {title}
    </button>
  );
}

export default Filter;
