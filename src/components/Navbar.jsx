import React from 'react';
import { NavLink } from 'react-router-dom';

const myLinks = [
  { to: '/', name: 'Home' },
  { to: '/about', name: 'About' },
];

let mykey = 'Abcdef1z';

const Navbar = () => (
  <>
    <nav className="navbar">
      <NavLink
        className={`${(link) => (link.isActive ? 'link active' : 'link')} logo`}
        to="/"
      >
        iNoteBook
      </NavLink>
      <ul className="page-flow">
        {
              myLinks.map((mylink) => {
                mykey += 1;
                return (
                  <li key={mykey}>
                    <NavLink
                      className={(link) => (link.isActive ? 'link active' : 'link')}
                      to={mylink.to}
                    >
                      { mylink.name }
                    </NavLink>
                  </li>
                );
              })
          }
      </ul>
    </nav>
  </>
);

export default Navbar;
