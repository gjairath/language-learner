import React from "react";
import { Link } from 'react-router-dom';

const notFound = () => {
        

  return (
  <>
        <p> This Page Does Not Exist. </p>
        <Link to="/">Go Home</Link>    
    </>
  );
};

export default notFound;
