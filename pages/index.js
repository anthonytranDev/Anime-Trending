import Layout from "../components/MyLayout.js";
import axios from "axios";

import AnimeContent from "../components/AnimeContent";
import AnimeHeader from "../components/AnimeHeader";
import AnimeCategories from "../components/AnimeCategories.js";

export default function Index({ header, data }) {
  return (
    <Layout>
      <AnimeContent
        columns="minmax(0, 1fr) 250px 700px minmax(0, 1fr)"
        rows="auto auto auto auto"
      >
        <AnimeHeader data={header} />
        <AnimeCategories data={data} />
      </AnimeContent>
    </Layout>
  );
}

Index.getInitialProps = async function() {
  let obj = {
    comedy: 160,
    action: 150,
    fantasy: 156,
    thriller: 159,
    adventure: 157
  };

  let categories = Object.keys(obj);

  let promiseArray = Object.keys(obj).map(x =>
    axios.get(
      `https://kitsu.io/api/edge/trending/anime?limit=15&in_category=true&category=${
        obj[x]
      }`
    )
  );

  let data = await Promise.all(promiseArray);

  let categoryLists = categories.map((x, i) => {
    return { [categories[i]]: data[i].data.data };
  });

  async function getTrendingHeader() {
    try {
      let trendingData = axios.get(
        `https://kitsu.io/api/edge/trending/anime?limit=1`
      );
      let trendingHeader = await trendingData;
      return trendingHeader.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }

  return {
    data: await categoryLists,
    header: await getTrendingHeader()
  };
};
