import { Outlet, Link } from "react-router-dom";

export default function Navigation(props) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Books</Link>
          </li>
          <li>
            <Link to="/new-book">New Book</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};