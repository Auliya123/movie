import React from "react";
import Layout from "../../components/Layouts";
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
import {
  ApiKey,
  MovieLink,
  MovieMedia,
} from "../../providers/Client/MovieClient";
import Link from "next/link";
import moment from "moment";

const useStyles = makeStyles({
  body: {
    display: "flex",
    padding: "2em",
  },
  aside: {
    width: 300,
    minWidth: 300,
    marginRight: 30,
  },
  root: {
    maxWidth: 150,
    maxHeight: 291,
    fontSize: "10px",
    margin: 10,
  },
  knownFor: {
    display: "flex",
    flexDirection: "row",
  },
  filmography: {
    padding: 20,
    fontSize: 15,
  },
});

export default function Person({ people, credits, movies }) {
  console.log(`people`, people);
  console.log(`credits`, credits);
  console.log(`movies`, movies);
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.body}>
        <div className={classes.aside}>
          <Card>
            <CardMedia
              component="img"
              alt={people.name}
              height="450"
              width="300"
              image={`${MovieMedia}/w300_and_h450_bestv2/${people.profile_path}`}
              title="Contemplative Reptile"
            />
          </Card>
          <h3>Personal Info</h3>
          <p>
            <strong>Known For</strong>
            <br />
            {people.known_for_department}
          </p>
          <p>
            <strong>Gender</strong>
            <br />
            {people.gender === 1 ? "Female" : "Male"}
          </p>
          <p>
            <strong>Birthday</strong>
            <br />
            {people.birthday}
          </p>
          <p>
            <strong>Place Of Birth</strong>
            <br />
            {people.place_of_birth}
          </p>
          <p>
            <strong>Also Known As</strong>
            <dl>
              {people.also_known_as.map((alias) => {
                return <dt>{alias}</dt>;
              })}
            </dl>
          </p>
        </div>
        <div>
          <h1>{people.name}</h1>

          <h2>Biography</h2>
          <p>{people.biography}</p>
          <h2>Known For</h2>
          {movies.results.map((movie) => {
            return movie.name === people.name ? (
              <div className={classes.knownFor}>
                {movie.known_for.map((known) => {
                  return (
                    <Card className={classes.root} variant="outlined">
                      <Link href={`/Movie/${known.id}`}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt={known.title}
                            image={`${MovieMedia}/w220_and_h330_face/${known.poster_path}`}
                            title={known.title}
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
                              <b>{known.title || known.name}</b>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              style={{ fontSize: "13px" }}
                            >
                              {known.release_date || known.first_air_date}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            ) : (
              ""
            );
          })}
          <h2>Filmography</h2>
          <Card elevation={8} className={classes.filmography}>
            {credits.cast.map((credit) => {
              return (
                <div>
                  <p>
                    {credit.release_date
                      ? moment(credit.release_date).format("YYYY")
                      : "-"}{" "}
                    ~ <b>{credit.title}</b>
                    {credit.character ? (
                      <>&nbsp;as&nbsp;{credit.character}</>
                    ) : (
                      ""
                    )}
                  </p>
                  <br />
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: "56734" } }],
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
    https://api.themoviedb.org/3/person/${params.id}?api_key=aa021ecbf8b79e03daf4e3c416b16eaa`);
  const people = await res.json();

  const data = await fetch(`
  https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=aa021ecbf8b79e03daf4e3c416b16eaa
  `);
  const credits = await data.json();
  console.log(`credits`, credits);

  const results = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${ApiKey}`
  );
  const movies = await results.json();

  // Pass post data to the page via props
  return {
    props: { people, credits, movies },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}
