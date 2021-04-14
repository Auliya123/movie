import React, { useState } from "react";
import Layout from "../components/Layouts";
import Filters from "../components/Filters";

import {
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { ApiKey, MovieLink, MovieMedia } from "../providers/Client/MovieClient";
import Link from "next/link";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 1000,
  },
  card: {
    width: 200,
    margin: "10px",
  },
  body: {
    padding: "2em",
    display: "flex",
  },
  pagination: {
    justifyContent: "center",
    justifyItems: "center",
    textAlign: "center",
  },
});

const TvCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <Link href={`/Tv/${props.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.original_name}
            image={`${MovieMedia}/w220_and_h330_face/${props.poster_path}`}
            title={props.original_name}
            height="100%"
            width="100%"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.original_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.first_air_date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default function Tv({ discovers, genres, languages }) {
  const classes = useStyles();
  const [tv, setTv] = useState(null);
  const [withGenre, setWithGenre] = useState("");
  const [withLanguage, setWithLanguage] = useState("");
  const [dateLte, setDateLte] = useState(moment().format("YYYY-MM-DD"));
  const [dateGte, setDateGte] = useState("");

  console.log(`discovers`, discovers);

  const handleChangePage = async (event, value) => {
    console.log(`value`, value);
    let genreChoosen = "";
    if (withGenre) {
      const genre = withGenre.map((genre) => {
        return genre.id;
      });
      genreChoosen = genre.toString();
    }
    const data = await fetch(
      `${MovieLink}/discover/movie?api_key=${ApiKey}&with_original_language=${withLanguage}&air_date.gte=${dateGte}air_date.lte=${dateLte}&with_genres=${genreChoosen}&page=${value}`
    );
    const results = await data.json();
    console.log(`results`, results);
    setMovies(results);
  };

  const handleChangeGte = (event, value) => {
    console.log(`date value`, value);
    console.log(`event.target.value date`, event.target.value);
    setDateGte(event.target.value);
  };

  const handleChangeLte = (event, value) => {
    console.log(`date value`, value);
    console.log(`event.target.value date`, event.target.value);
    setDateLte(event.target.value);
  };

  const handleChangeGenre = (value) => {
    console.log(`value genre`, value);
    setWithGenre(value);
  };

  const handleChangeLanguage = (value) => {
    value != null ? setWithLanguage(value.iso_639_1) : setWithLanguage("");
  };

  console.log(`withGenre`, withGenre);

  const submitHandler = async (event) => {
    event.preventDefault();
    let genreChoosen = "";
    if (withGenre) {
      const genre = withGenre.map((genre) => {
        return genre.id;
      });
      genreChoosen = genre.toString();
    }
    console.log(`genreChoosen`, genreChoosen);
    const data = await fetch(
      `${MovieLink}/discover/tv?api_key=${ApiKey}&with_original_language=${withLanguage}&first_air_date.gte=${dateGte}&first_air_date.lte=${dateLte}&with_genres=${genreChoosen.toString()}`
    );
    const results = await data.json();
    console.log(`results`, results);
    setTv(results);
  };

  return (
    <Layout>
      <div className={classes.body}>
        <Filters
          submitHandler={submitHandler}
          handleChangeGte={handleChangeGte}
          handleChangeLte={handleChangeLte}
          genres={genres}
          handleChangeGenre={handleChangeGenre}
          handleChangeLanguage={handleChangeLanguage}
          languages={languages}
        />
        <div className={classes.container}>
          {tv
            ? tv.results.map((result) => {
                return <TvCard {...result} key={result.id} />;
              })
            : discovers.results.map((discover) => {
                return <TvCard {...discover} key={discover.id} />;
              })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${MovieLink}/discover/tv?api_key=${ApiKey}`);
  const discovers = await res.json();

  const data = await fetch(`${MovieLink}/genre/tv/list?api_key=${ApiKey}`);
  const genres = await data.json();

  const results = await fetch(
    `${MovieLink}/configuration/languages?api_key=${ApiKey}`
  );
  const languages = await results.json();

  if (!discovers) {
    return {
      notFound: true,
    };
  }

  return {
    props: { discovers, genres, languages }, // will be passed to the page component as props
  };
}
