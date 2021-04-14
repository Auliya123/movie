import React from "react";
import { Card, makeStyles, TextField, Button, Box } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";

const useStyles = makeStyles({
  filter: {
    maxWidth: 300,
    height: "100%",
    padding: 10,
  },
  inputFilter: {
    margin: 15,
    textAlign: "center",
  },
  button: {
    width: "250px",
    margin: 10,
  },
});

export default function Filters({
  submitHandler,
  handleChangeGte,
  handleChangeLte,
  genres,
  handleChangeGenre,
  handleChangeLanguage,
  languages,
}) {
  const classes = useStyles();
  console.log(`genres filter`, genres);

  return (
    <Card className={classes.filter}>
      <div>
        <h2>Filters</h2>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.inputFilter}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={genres.genres}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            onChange={(event, newValue) => {
              console.log(`newValue genre`, newValue);
              handleChangeGenre(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Choose Genres"
                placeholder="Genre"
              />
            )}
          />
        </div>
        <div className={classes.inputFilter}>
          <Autocomplete
            id="combo-box-demo"
            options={languages}
            getOptionLabel={(option) => option.english_name}
            onChange={(event, newValue) => {
              console.log(`newValue`, newValue);
              handleChangeLanguage(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Language" variant="outlined" />
            )}
          />
        </div>
        <div>
          <TextField
            id="date"
            label="from"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeGte}
            className={classes.inputFilter}
          />
          <TextField
            id="date"
            label="to"
            type="date"
            defaultValue={moment().format("YYYY-MM-DD")}
            onChange={handleChangeLte}
            className={classes.inputFilter}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="submit"
          size="large"
          className={classes.button}
        >
          Search
        </Button>
      </form>
    </Card>
  );
}
