import React from "react";

const NewsWidget = () => {
  const [news_list, setNewsList] = React.useState([]);
  const get_users = () => {
    fetch("https://api.rellis.dev/get.php?q=get_news")
      .then((response) => response.json())
      .then((data) => {
        data = data.articles;
        var news_list = data.map(function (article) {
          return (
            <tr key={article.title} className="hover">
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
    <div className="md:w-1/4 rounded-box bg-base-100 shadow-xl m-3">
      <div className="card-body">
        <h2 className="card-title">News / Alerts</h2>
        <div className="overflow-x-auto max-h-64">
          <table className="table w-full">
            <tbody className="break-all">{news_list}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsWidget;
