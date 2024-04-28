import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const info = useContext(noteContext);

  return (
    <>
      <Navbar />
      <h1>
        About
        {` ${info?.state?.name}`}
        {' '}
        and
        {` ${info?.state?.age}`}
      </h1>
      <button onClick={() => info.updateFunc()} type="button">Update</button>
    </>
  );
};
export default About;
