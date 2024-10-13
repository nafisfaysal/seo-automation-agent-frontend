import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      console.log('Tracking page view:', location.pathname + location.search);
      window.gtag('config', 'G-XGCCK36MED', {
        page_path: location.pathname + location.search,
      });
    } else {
      console.warn('gtag is not available');
    }
  }, [location]);
}

export default usePageTracking;
