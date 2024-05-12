import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import { resetNotes } from '../Redux/Note/noteSlice';

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetNotes());
  }, []);

  return (
    <>
      <Navbar />
      <h1>
        About Page
      </h1>
    </>
  );
};
export default About;
