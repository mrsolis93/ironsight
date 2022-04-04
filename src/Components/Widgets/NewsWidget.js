import React from "react";

const NewsWidget = () => {
  const [news_list, setNewsList] = React.useState("");

  const get_users = () => {
    fetch("https://api.rellis.dev/get.php?q=get_news")
      .then((response) => response.json())
      .then((data) => {
        data = data.articles;
        console.log(data);
        var news_list = data.map(function (article) {
          return (
            <tr class="hover">
              <td>
                <a href={article.link}>{article.title}</a>
              </td>
            </tr>
          );
        });
        setNewsList(news_list);
      });
  };
  React.useEffect(() => {
    get_users();
  }, []);

  return (
    <div class="md:w-1/4 rounded-box bg-base-100 shadow-xl m-3">
      <div class="card-body">
        <h2 class="card-title">News / Alerts</h2>
        <div class="overflow-x-auto max-h-64">
          <table class="table w-full">
            <tbody class="break-all">{news_list}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsWidget;
