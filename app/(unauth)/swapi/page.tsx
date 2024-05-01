"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getPlanets = async (page: number) => {
  const response = await fetch("https://swapi.dev/api/planets/?page=" + page);
  const data = await response.json();
  return data;
};

const ListPlanetsFromSWAPI = () => {
  const [page, setPage] = useState(1);
  const data = useQuery({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(page),
    staleTime: 0,
    gcTime: 50000,
  });
  console.log(data);
  return (
    <>
      {data.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Planets from SWAPI</h1>
          <ul>
            {data.data.results.map((planet: any) => (
              <li key={planet.name}>{planet.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={() => setPage(page - 1)}>Previous Page</button>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </>
  );
};

export default ListPlanetsFromSWAPI;
