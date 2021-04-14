import React, { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layouts";
import {
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Box,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { ApiKey, MovieLink, MovieMedia } from "../providers/Client/MovieClient";
import Link from "next/link";
import Filters from "../components/Filters";

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

const MovieCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined" key={props.id}>
      <Link href={`/Movie/${props.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.title}
            image={`${MovieMedia}/w220_and_h330_face/${props.poster_path}`}
            title={props.title}
            height="100%"
            width="100%"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.release_date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default function Movies({ populars, genres, languages }) {
  const classes = useStyles();
  const [movies, setMovies] = useState(null);
  const [withGenre, setWithGenre] = useState("");
  const [withLanguage, setWithLanguage] = useState("");
  const [dateLte, setDateLte] = useState(moment().format("YYYY-MM-DD"));
  const [dateGte, setDateGte] = useState("");

  console.log(`populars`, populars);
  console.log(`genres`, genres);

  console.log(`dateGte`, dateGte);

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
      `${MovieLink}/discover/movie?api_key=${ApiKey}&with_original_language=${withLanguage}&release_date.gte=${dateGte}&release_date.lte=${dateLte}&with_genres=${genreChoosen}&page=${value}`
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
      `${MovieLink}/discover/movie?api_key=${ApiKey}&with_original_language=${withLanguage}&release_date.gte=${dateGte}&release_date.lte=${dateLte}&with_genres=${genreChoosen.toString()}`
    );
    const results = await data.json();
    console.log(`results`, results);
    setMovies(results);
  };

  return (
    <>
      <Head>
        <title>Movie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            {movies
              ? movies.results.map((movie) => {
                  return <MovieCard {...movie} />;
                })
              : populars.results.map((popular) => {
                  return <MovieCard {...popular} />;
                })}
          </div>
        </div>
        <Box alignItems="center" justifyContent="center" display="flex">
          <Pagination
            className={classes.pagination}
            count={movies ? movies.total_pages : populars.total_pages}
            onChange={handleChangePage}
          />
        </Box>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${MovieLink}/discover/movie?api_key=${ApiKey}`);
  const populars = await res.json();

  const data = await fetch(`${MovieLink}/genre/movie/list?api_key=${ApiKey}`);
  const genres = await data.json();

  const results = await fetch(
    `${MovieLink}/configuration/languages?api_key=${ApiKey}`
  );
  const languages = await results.json();

  if (!populars) {
    return {
      notFound: true,
    };
  }

  return {
    props: { populars, genres, languages }, // will be passed to the page component as props
  };
}
