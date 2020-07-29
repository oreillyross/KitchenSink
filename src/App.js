import React from "react";
import "./styles.css";
import MyTable from "./MyTable";
import axios from "axios";
import { Formik, Form } from "formik";
import { format } from "date-fns";

import { TextField, Button } from "@material-ui/core";

export default function App() {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("Hacker News");

  React.useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(results.data.hits.filter(d => d.title !== null));
    };
    fetchData();
  }, [query]);

  function doSearch(values, options) {
    if (values.query !== "") setQuery(values.query);
    options.resetForm();
  }

  function useDataFromFetch(data) {
    const tableData = React.useMemo(
      () =>
        data.map(d => ({
          created_at: d.created_at,
          title: d.title,
          url: d.url,
          author: d.author
        })),
      [data]
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
          accessor: "author"
        }
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
          <Form className="query-form">
            <TextField
              value={props.values.query}
              onChange={props.handleChange}
              placeholder="type a keyword..."
              name="query"
            />
            <Button type="submit">Search</Button>
          </Form>
        )}
      </Formik>
      <div className="why">Why I built this site?</div>
      <MyTable data={tableData} columns={tableColumns} />
    </div>
  );
}
