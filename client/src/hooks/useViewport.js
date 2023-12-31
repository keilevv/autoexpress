import React from 'react';

export default function useViewport() {
    const [width, setWidth] = React.useState(window.innerWidth);
  
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    const breakpoint = 900;

    const isMobileScreen = width < breakpoint
    return { isMobileScreen };
}