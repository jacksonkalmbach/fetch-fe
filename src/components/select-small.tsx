import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useDispatch } from "react-redux";
import { setSort } from "../store/reducers/search-filters-slice";

export default function SelectSmall() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    dispatch(setSort(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 50 }} size="small">
      <InputLabel id="demo-select-small-label">Sort:</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-small"
        value={sortBy}
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem value={"asc"}>Breeds A-Z</MenuItem>
        <MenuItem value={"desc"}>Breeds Z-A</MenuItem>
      </Select>
    </FormControl>
  );
}
