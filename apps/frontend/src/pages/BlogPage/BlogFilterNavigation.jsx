import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import css from "./Style.module.css";

function BlogFilterNavigation() {
  const [sortBy, setSortBy] = useState("");
  const [tag, setTag] = useState("");
  const [perPage, setPerPage] = useState(6);

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeTag = (event) => {
    setTag(event.target.value);
  };

  const handleChangePerPage = (event) => {
    setPerPage(event.target.value);
  };
  return (
    <div className={css.filter_wrapper}>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Sort by</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortBy}
            label="Sort by"
            onChange={handleChangeSortBy}
          >
            <MenuItem value={10}>All</MenuItem>
            <MenuItem value={10}>Classes</MenuItem>
            <MenuItem value={20}>News</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Tags</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={tag}
            label="Tags"
            onChange={handleChangeTag}
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
            value={perPage}
            label="Per page"
            onChange={handleChangePerPage}
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
