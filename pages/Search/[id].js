import React from "react";
import Layout from "../../components/Layouts";
import { Paper, Card, makeStyles, InputLabel, Select } from "@material-ui/core";
import {
  MovieLink,
  ApiKey,
  MovieMedia,
} from "../../providers/Client/MovieClient";

const useStyles = makeStyles({
  body: {
    padding: "2em",
    display: "flex",
  },
  results: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: 30,
    width: "100%",
  },
  categories: {
    width: 300,
    height: "100%",
    padding: 10,
  },
  data: {
    marginBottom: 20,
    // height: 150,
    display: "flex",
    maxHeight: 250,
  },
  poster: {
    maxHeight: 500,
    maxWidth: "500px",
  },
  dataText: {
    marginLeft: 10,
    marginTop: 10,
  },
  inputCategories: {
    textAlign: "center",
  },
});

const SearchPaper = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.data} key={props.id}>
      {props.logo_path ? (
        <img
          alt={props.name}
          className={classes.poster}
          src={`${MovieMedia}/h30/${props.logo_path}`}
        />
      ) : (
        <img
          alt={props.title || props.name}
          className={classes.poster}
          src={`${MovieMedia}/w188_and_h282_bestv2/${
            props.poster_path || props.profile_path
          }`}
        />
      )}
      <div className={classes.dataText}>
        <h2 style={{ marginBottom: "0px" }}>{props.title || props.name}</h2>
        <span>{props.release_date}</span>
        <p>{props.overview || props.known_for_department}</p>
      </div>
    </Paper>
  );
};

export default function Search({ movie, params }) {
  const classes = useStyles();
  const [datas, setData] = React.useState("");

  const handleChangeCategory = async (event) => {
    console.log(`value`, value);
    console.log(`event.target.value`, event.target.value);
    const value = event.target.value;
    const data = await fetch(
      `${MovieLink}/search/${value}?api_key=${ApiKey}&query=${params.id}`
    );
    const results = await data.json();
    setData(results);
    console.log(`results`, results);
  };

  console.log(`movie search`, movie);
  console.log(`params`, params);
  return (
    <Layout>
      <div className={classes.body}>
        <Card className={classes.categories}>
          <h2>Search Results</h2>
          <div className={classes.inputCategories}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Categories
            </InputLabel>
            <Select
              multiple
              native
              onChange={handleChangeCategory}
              inputProps={{
                id: "select-multiple-native",
              }}
              autoWidth={true}
            >
              <option value="multi">All</option>
              <option value="movie">Movies</option>
              <option value="person">People</option>
              <option value="tv">Tv shows</option>
              <option value="collection">Collections</option>
              <option value="company">Companies</option>
              <option value="keyword">Keywords</option>
            </Select>
          </div>
        </Card>
        <div className={classes.results}>
          {datas
            ? datas.results.map((data) => {
                return <SearchPaper {...data} />;
              })
            : movie.results.map((data) => {
                return <SearchPaper {...data} />;
              })}
        </div>
      </div>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: "a" } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${MovieLink}/search/multi?api_key=${ApiKey}&query=${params.id}`
  );
  const movie = await res.json();

  // Pass post data to the page via props
  return {
    props: { movie, params },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}
