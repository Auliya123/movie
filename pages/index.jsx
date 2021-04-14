import React from "react";
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
  Button,
} from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { MovieLink, MovieMedia, ApiKey } from "../providers/Client/MovieClient";

const useStyles = makeStyles({
  header: {
    background: `url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg")`,
    height: 360,
    textAlign: "center",
    color: "white",
    verticalAlign: "text-bottom",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: 55,
    backgroundColor: "#0d253f",
  },
  headerText: {
    fontSize: "3em",
    fontWeight: 700,
    marginTop: 5,
  },
  button: {
    height: "50px",
    marginLeft: "10px",
    borderRadius: "10px",
  },
  InputSearch: {
    backgroundColor: "white",

    width: "1000px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  root: {
    maxWidth: 150,
    maxHeight: 291,
    fontSize: "10px",
  },
  title: {
    flexDirection: "row",
  },
  body: {
    padding: "2em",
  },
  // headerTextSpan: {
  //   backgroundColor: "#90cea1",
  // },
});

const MovieCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
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
            <Typography
              gutterBottom
              variant="h2"
              component="h2"
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              <b>{props.title || props.name}</b>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontSize: "13px" }}
            >
              {props.release_date || props.first_air_date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default function Home({ populars, trendings }) {
  console.log(`populars`, populars);
  console.log(`trendings`, trendings);
  const classes = useStyles();
  const [movieQuery, setMovieQuery] = React.useState(null);

  const handleChangeQuery = (event) => {
    console.log("data", event.target.value);
    setMovieQuery(event.target.value);
  };

  console.log(`movieQuery`, movieQuery);

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 8,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <>
      <Head>
        <title>Movie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={classes.header}>
          <div className={classes.headerComponent}>
            <h2 className={classes.headerText}>
              <span className={classes.headerTextSpan}>Welcome.</span>
              <br />
              <span>Discover your movie now</span>
            </h2>
            <div className={classes.search}>
              <TextField
                onChange={handleChangeQuery}
                variant="filled"
                className={classes.InputSearch}
                label="Search"
              />
              <Link href={`/Search/${movieQuery}`}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className={classes.body}>
          <div>
            <h2>Popular</h2>
            <Carousel
              autoPlay
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsive}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {populars.results.map((popular) => {
                return (
                  <div key={popular.id}>
                    <MovieCard {...popular} />
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div>
            <h2>Trending</h2>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsive}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {trendings.results.map((trending) => {
                return (
                  <div key={trending.id}>
                    <MovieCard {...trending} />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${MovieLink}/movie/popular?api_key=${ApiKey}`);
  const populars = await res.json();

  const data = await fetch(`${MovieLink}/trending/all/day?api_key=${ApiKey}`);
  const trendings = await data.json();

  if (!populars) {
    return {
      notFound: true,
    };
  }

  return {
    props: { trendings, populars }, // will be passed to the page component as props
  };
}
