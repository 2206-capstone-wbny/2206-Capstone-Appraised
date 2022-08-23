import axios from "axios";

const steve = async () => {
  try {
    let data = await axios.request(
      "https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%22currentPage%22%3A2%7D%2C%22usersSearchTerm%22%3A%22NY%22%2C%22mapBounds%22%3A%7B%22west%22%3A-79.76259%2C%22east%22%3A-71.777491%2C%22south%22%3A40.477399%2C%22north%22%3A45.015865%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A43%2C%22regionType%22%3A2%7D%5D%2C%22isMapVisible%22%3Afalse%2C%22filterState%22%3A%7B%22sortSelection%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%7D&wants=%7B%22cat1%22:[%22listResults%22],%22cat2%22:[%22total%22]%7D&requestId=2%27"
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

steve();
