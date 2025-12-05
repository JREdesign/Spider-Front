import React, { createContext, useState } from "react";

const initialFilters = {
  junior: true,
  english: false,
 verifyHuman:"",
 location: "", // Agregar la propiedad location al objeto initialFilters
 otherZones: false,
 technologies:[],
 date: "",
 search:"",
};

const FilterContext = createContext({
  filters: initialFilters,
  handleFilterChange: () => {}, // Definido temporalmente como una función vacía
});

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const value = {
    filters,
    handleFilterChange,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
