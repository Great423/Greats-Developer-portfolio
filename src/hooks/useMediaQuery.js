import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const updateMatches = () => setMatches(mediaQuery.matches);
        // initial check
        updateMatches();
        // listen for changes
        const mediaQueryListener = () => updateMatches();
        mediaQuery.addEventListener('change', mediaQueryListener);
        // cleanup
        return () => {
            mediaQuery.removeEventListener('change', mediaQueryListener);
        }
    }, [query]);

    return matches;
};

export default useMediaQuery;
