import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import css from "./Style.module.css";

import { CiFilter } from "react-icons/ci";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useEmotionsStore } from "../../store/emotionStore";

function BlogFilterNavigation({ filters, setFilters }) {
  const navigate = useNavigate();
  const width = useWindowWidth();

  const { interests, categories } = useEmotionsStore();

  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      [field]: event.target.value,
    }));
    navigate("/blog");
  };

  useEffect(() => {
    if (width > 767) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [width]);

  return (
    <div className={css.filter_wrapper}>
      <button
        type="button"
        className={css.show_button}
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <CiFilter /> Show filters
      </button>
      {showFilters && (
        <div className={css.filter_tile}>
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
              <MenuItem value={"news"}>News</MenuItem>
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
              <MenuItem value={""}>All</MenuItem>
              {interests.map((item, index) => (
                <MenuItem key={index} value={item.tag}>
                  {item.tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filters.category}
              label="category"
              onChange={handleChange("category")}
            >
              <MenuItem value={""}>All</MenuItem>
              {categories.map(({ _id, title }) => (
                <MenuItem key={_id} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
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
