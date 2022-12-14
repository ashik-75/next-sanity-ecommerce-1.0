import { useRouter } from "next/router";
import React, { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    router.push(`/search?query=${search}`);
  };

  return (
    <div className="hidden md:inline">
      <form onSubmit={handleSearch}>
        <input
          className="px-6 py-[6px] rounded-full border outline-none"
          placeholder="Search ...."
          value={search}
          name="search"
          type={"search"}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;
