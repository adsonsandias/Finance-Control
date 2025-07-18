import React from "react";

export const useWindowSize = () => {
  const [size, setSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  React.useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
