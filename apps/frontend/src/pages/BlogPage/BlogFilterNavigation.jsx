import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import css from "./Style.module.css";

function BlogFilterNavigation({ filters, setFilters }) {
  // універсальний хендлер
  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <div className={css.filter_wrapper}>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Filter By</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filters.filterBy}
            label="FilterBy"
            onChange={handleChange("filterBy")}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Classes"}>Classes</MenuItem>
            <MenuItem value={"News"}>News</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Tags</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filters.tags}
            label="tags"
            onChange={handleChange("tags")}
          >
            <MenuItem value={10}>All</MenuItem>
            <MenuItem value={"Gym&Fitness"}>Gym&Fitnees</MenuItem>
            <MenuItem value={"Body"}>Body</MenuItem>
            <MenuItem value={"Food"}>Food</MenuItem>
            <MenuItem value={"Diet"}>Diet</MenuItem>
            <MenuItem value={"Health"}>Health</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Per page</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filters.perPage}
            label="Per page"
            onChange={handleChange("perPage")}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default BlogFilterNavigation;
