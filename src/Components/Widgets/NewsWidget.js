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
                <a
                  href={article.link}
                  className="break-normal whitespace-normal"
                  target="_blank" rel="noopener noreferrer"
                >
                  {article.title}
                </a>
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
    <div className="overflow-auto">
      <table className="table w-full">
        <tbody>{news_list}</tbody>
      </table>
    </div>
  );
};

export default NewsWidget;
