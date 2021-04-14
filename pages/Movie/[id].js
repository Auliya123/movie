import React from "react";
import { useRouter } from "next/router";
const { default: Layout } = require("../../components/Layouts");
import {
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Typography,
  makeStyles,
  InputBase,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles({
  poster: {
    minWidth: "300px",
    height: "450px",
    marginTop: 20,
  },
  topWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: "2em",
    backgroundImage:
      "linear-gradient(to right, rgba(15.69%, 12.94%, 10.20%, 1.00) 150px, rgba(15.69%, 12.94%, 10.20%, 0.84) 100%);",
    height: "540px",
  },
  headerPoster: {
    margin: "50px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "white",
  },
  header: {
    height: "540px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderBottom: "1px solid var(--primaryColor)",
    backgroundPosition: "right -200px top",
  },
  body: {
    padding: "2em",
  },
  cast: {
    margin: "10px",
  },
  video: {
    maxHeight: 500,
    maxWidth: 500,
    margin: 10,
  },
  countries: {
    backgroundColor: "white",
    width: 200,
    marginLeft: 20,
    height: 40,
    marginTop: 10,
  },
  watchProviderImage: {
    height: 60,
    width: 60,
    marginLeft: 15,
  },
  headerInfo: {
    maxHeight: 200,
  },
});

const Movie = ({ movie, credits, videos, languages, providers }) => {
  console.log(`movie`, movie);
  console.log(`credits`, credits);
  const classes = useStyles();
  const router = useRouter();
  const [providerCountry, setProviderCountry] = React.useState("");

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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

  const responsiveVideo = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 4,
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

  function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== "undefined"
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )
      : isoCode;
  }

  const handleChangeCountry = (value) => {
    value != null
      ? setProviderCountry(value.iso_3166_1)
      : setProviderCountry("");
  };

  console.log(`providers`, providers);

  return (
    <Layout>
      <div>
        <div
          className={classes.header}
          style={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`,
          }}
        >
          <div className={classes.topWrapper}>
            <Card variant="outlined" className={classes.poster}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={movie.title}
                  image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                  title={movie.title}
                  width="100%"
                />
              </CardActionArea>
            </Card>
            <div className={classes.headerPoster}>
              <div className={classes.title}>
                <h1>
                  {movie.title} ({moment(movie.release_date).format("YYYY")})
                </h1>
                <p>
                  {" | "}
                  {moment(movie.release_date).format("DD/MM/YYYY")} {" | "}
                  {movie.genres.map((genre) => {
                    return <span key={genre.id}>{genre.name},</span>;
                  })}
                  {" | "}
                  {movie.runtime} m {" | "}
                </p>
              </div>
              <div className={classes.headerInfo}>
                <i>{movie.tagline}</i>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Watch Providers</h3>
                {providers.results.ID.flatrate.map((provider) => {
                  return (
                    <img
                      className={classes.watchProviderImage}
                      src={`https://www.themoviedb.org/t/p/original/${provider.logo_path}`}
                    />
                  );
                })}
                {providers.results.ID.buy.map((provider) => {
                  return (
                    <img
                      className={classes.watchProviderImage}
                      src={`https://www.themoviedb.org/t/p/original/${provider.logo_path}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.body}>
          <h2>Cast</h2>
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
            {credits.cast.map((casts) => {
              return (
                <div key={casts.id}>
                  <Card className={classes.cast} variant="outlined">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={casts.name}
                        image={`https://www.themoviedb.org/t/p/w138_and_h175_face/${casts.profile_path}`}
                        title={casts.name}
                        height="100%"
                        width="100%"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          style={{ fontSize: "14px" }}
                        >
                          <b>{casts.name}</b>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ fontSize: "10px" }}
                        >
                          {casts.character}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              );
            })}
          </Carousel>

          <h2>Videos</h2>
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
            responsive={responsiveVideo}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {videos.results.map((video) => {
              return (
                <div key={video.id}>
                  <Card className={classes.video} variant="outlined">
                    <a
                      href={`https://www.themoviedb.org/video/play?key=${video.key}`}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={video.name}
                          image={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                          title={video.name}
                          height="100%"
                          width="100%"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h5">
                            <b>{video.name}</b>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </a>
                  </Card>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </Layout>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: "527774" } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`
  https://api.themoviedb.org/3/movie/${params.id}?api_key=aa021ecbf8b79e03daf4e3c416b16eaa`);
  const movie = await res.json();

  const data = await fetch(`
  https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=aa021ecbf8b79e03daf4e3c416b16eaa
  `);
  const credits = await data.json();
  console.log(`credits`, credits);

  const result = await fetch(`
  https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=aa021ecbf8b79e03daf4e3c416b16eaa&page=1&limit=1
  `);
  const videos = await result.json();

  const languagesData = await fetch(
    `https://api.themoviedb.org/3/configuration/countries?api_key=aa021ecbf8b79e03daf4e3c416b16eaa`
  );
  const languages = await languagesData.json();

  const providersData = await fetch(
    `https://api.themoviedb.org/3/movie/508442/watch/providers?api_key=aa021ecbf8b79e03daf4e3c416b16eaa`
  );
  const providers = await providersData.json();

  // Pass post data to the page via props
  return {
    props: { movie, credits, videos, languages, providers },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}

export default Movie;
