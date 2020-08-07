import React from "react";
import mdata from "./test.json";
import MyTable from "./MyTable";
import { format } from "date-fns";

export default function Articles() {
  console.log(mdata);

  React.useEffect(() => {
    async function getdata() {
      //const data = await fetch('https://gnews.io/api/v3/top-news?token=ae11683210fd5620c39b86b092d99c02')
      //console.log(data.data.articles)
    }
    getdata();
  }, []);

  const data = mdata.articles;

  function useDataFromFetch(data) {
    const tableData = React.useMemo(
      () =>
        data.map((d) => ({
          created_at: d.publishedAt,
          title: d.title,
          url: d.url,
          source: d.source.name
        })),
      [data]
    );
    const tableColumns = React.useMemo(
      () => [
        {
          Header: "Created",
          accessor: "created_at",

          Cell: (props) => {
            return format(new Date(props.value), "PPP");
          }
        },
        {
          Header: "Title of article",
          accessor: "title",
          Cell: (props) => {
            return (
              <a
                href={props.row.original.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {props.value}
              </a>
            );
          }
        },
        {
          Header: "Source",
          accessor: "source"
        }
      ],
      []
    );
    return { tableData, tableColumns };
  }

  const { tableData, tableColumns } = useDataFromFetch(data);

  return (
    <div>
      <h1> Articles </h1>
      <MyTable data={tableData} columns={tableColumns} />
    </div>
  );
}
