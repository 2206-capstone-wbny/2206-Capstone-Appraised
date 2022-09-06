import React, { Component } from "react";

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

    return (
      <div>

      </div>
    );
  }
  export default News;
  