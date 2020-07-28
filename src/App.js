import React from "react";
import "./styles.css";
import MyTable from "./MyTable";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { format } from "date-fns";

export default function App() {
  const [data, setData] = React.useState({ hits: [] });
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(results.data);
    };
    fetchData();
  }, [query]);

  function doSearch(values) {
    setQuery(values.query);
  }

  function useDataFromFetch(data) {
   
    const tableData = React.useMemo(
      () =>
        data.hits.map(d => ({
          created_at: d.created_at,
          title: d.title,
          url: d.url,
          author: d.author,
        })),
      [data.hits]
    );
    const tableColumns = React.useMemo(
      () => [
        {
          Header: "Created",
          accessor: "created_at",
          Cell: props => {
          
            return format(new Date(props.value), "PPP");
          }
        },
        {
          Header: "Title of article",
          accessor: "title",
          Cell: props => {
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
          Header: "Author",
          accessor: "author",
          
        },
      ],
      []
    );
    return { tableData, tableColumns };
  }
  const { tableData, tableColumns } = useDataFromFetch(data);

  return (
    <div className="App">
      <h1>Hacker news</h1>
      <Formik onSubmit={doSearch} initialValues={{ query: "" }}>
        {props => (
          <Form>
            <Field type="text" name="query" />
            <button type="submit">Search</button>
          </Form>
        )}
      </Formik>

      <MyTable data={tableData} columns={tableColumns} />
    </div>
  );
}
