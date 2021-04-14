import React, { useState } from "react";
import Layout from "../components/Layouts";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { MovieMedia, MovieLink, ApiKey } from "../providers/Client/MovieClient";
import Link from "next/link";

const useStyles = makeStyles({
  body: {
    padding: "2em",
    display: "flex",
    flexWrap: "wrap",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    alignContent: "space-around",
  },
  root: {
    width: 235,
    height: 319,
    margin: 10,
  },
  media: {
    height: 235,
    width: 235,
  },
});

const PersonCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={props.id}>
      <Link href={`/Person/${props.id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            alt={props.name}
            height="140"
            image={`${MovieMedia}/w235_and_h235_face/${props.profile_path}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {props.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.known_for_department}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default function Person({ populars }) {
  const classes = useStyles();
  console.log(`populars`, populars);
  const [people, setPeople] = useState("");

  const handleChangePage = async (event, value) => {
    console.log(`value`, value);
    const data = await fetch(
      `${MovieLink}/person/popular?api_key=${ApiKey}&page=${value}`
    );
    const results = await data.json();
    console.log(`results`, results);
    setPeople(results);
  };
  return (
    <Layout>
      <div className={classes.body}>
        {people
          ? people.results.map((person) => {
              return <PersonCard {...person} />;
            })
          : populars.results.map((popular) => {
              return <PersonCard {...popular} />;
            })}
      </div>
      <Box alignItems="center" justifyContent="center" display="flex">
        <Pagination
          className={classes.pagination}
          count={populars.total_pages}
          onChange={handleChangePage}
        />
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${MovieLink}/person/popular?api_key=${ApiKey}`);
  const populars = await res.json();

  if (!populars) {
    return {
      notFound: true,
    };
  }

  return {
    props: { populars }, // will be passed to the page component as props
  };
}
