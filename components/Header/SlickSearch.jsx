import { useRouter } from "next/router";
import React, { useState } from "react";

function SlickSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    router.push(`/search?query=${search}`);
  };

  return (
    <div className="absolute w-full top-[86px] left-0  md:hidden">
      <form onSubmit={handleSearch}>
        <input
          className="px-4 py-2 rounded-full border outline-none w-[90%] mx-auto block"
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

export default SlickSearch;
