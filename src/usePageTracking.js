import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-XGCCK36MED', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}

export default usePageTracking;