import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@mui/material";
import axios from "axios";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "4vw",
    paddingRight: "4vw",
    maxHeight: "400px",
    textOverflow: "ellipsis",
  },
  title: {
    paddingLeft: "2vw",
  },
});

function News() {
  const [newsArticles, setArticles] = useState([]);
  const classes = useStyles();
  let api = "92b209047f284dfab76f46918586e078";
  let url = `https://newsapi.org/v2/everything?q=housing-market&from=2022-09-03&sortBy=popularity&apiKey=${api}`;
  useEffect(() => {
    const getArticles = async () => {
      const newsData = await axios.get(url);
      setArticles(newsData.data.articles);
    };
    getArticles();
  }, []);

  console.log(newsArticles);
  return (
    <div>
      <h1 className={classes.title}>Housing Market News</h1>
      <Grid container spacing={4} className={classes.gridContainer}>
        {newsArticles.map((article) => {
          return (
            <Grid
              className="newsCard"
              style={{ display: "flex" }}
              item
              xs={12}
              sm={6}
              lg={3}
              xl={2.4}
            >
              <Card
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <a href={article.url}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.urlToImage}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.publishedAt.slice(0, 10)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                      }}
                    >
                      {article.description}
                    </Typography>
                  </CardContent>
                </a>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
export default News;
