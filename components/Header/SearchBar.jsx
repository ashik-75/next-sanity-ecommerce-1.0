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
    <div>
      <form onSubmit={handleSearch}>
        <input
          className="px-4 py-2 rounded-full border outline-none"
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
