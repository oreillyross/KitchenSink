import React from "react";
import "./styles.css";
import MyTable from "./MyTable";
import axios from "axios";
import { Formik, Form } from "formik";
import { format } from "date-fns";
import { Link, Router } from "@reach/router";
import Why from "./Why";
import Articles from './Articles'
import Navigation from './navigation'


import { TextField, Button } from "@material-ui/core";

function NotFound() {
  return (
    <div>
      Page not found.... go back to home page, <Link to="/">HOME</Link>
    </div>
  );
}
export default function App() {
  return (
    <div className="App">
      <Navigation/>
      <Router>
        <Main path="/" />
        <Why path="/why" />
        <Articles path='/articles'/>
        <NotFound default />
      </Router>
    </div>
  );
}

function Main() {
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
    <>
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
      <div className="why">
        <Link to="/why">Why I built this site?</Link>
      </div>
      <MyTable data={tableData} columns={tableColumns} />
    </>
  );
}
