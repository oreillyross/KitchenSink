import React from "react";
import * as styles from './Navigation.module.css'
import { Link } from '@reach/router'
export default function Navigation() {
  return <div>Navigation
    <pre><Link to='/'>Home</Link></pre>
    <pre><Link to='articles'>Articles</Link></pre>
  </div>;
}
