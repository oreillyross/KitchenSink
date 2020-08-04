import React from "react";
import { Link } from "@reach/router";
import './Why.css'

function Why() {
  return (
    <>
      <h1>Why I built this site</h1>
      <p className={'main_text'}>
        This site has been built to demonstrate the slightly more complicated
        (and real world) uses of libraries such as React Table, Reach Router,
        Axios, Material UI. The non-trivial uses go above the typical tutorials,
        and examples given on the various developer sites. This site is also an
        opportunity to practice writing various real world tests using Jest,
        react testing library.
      </p>
      <pre>
        <Link to="/">go back to main table...</Link>
      </pre>
    </>
  );
}

export default Why;
