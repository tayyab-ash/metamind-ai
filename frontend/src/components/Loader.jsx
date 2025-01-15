import React from "react";
import { HashLoader } from "react-spinners";
const Loader = ({loading}) => {
  return (
    <div className="container mx-auto flex justify-center mt-52">
      <HashLoader color="#CEE2DC" size={100} loading={loading} />
    </div>
  );
};

export default Loader;
