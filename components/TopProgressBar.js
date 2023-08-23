import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

const TopProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setProgress(0);
      incrementProgress();
    };

    const complete = () => {
      setProgress(100);
    };

    const incrementProgress = () => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 95) {
            clearInterval(interval);
            return prevProgress;
          }
          return prevProgress + 5;
        });
      }, 100);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', complete);
    router.events.on('routeChangeError', complete);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', complete);
      router.events.off('routeChangeError', complete);
    };
  }, [router]);

  return (
    <LoadingBar
      color="orange"
      height={4}
      progress={progress}
      waitingTime={400}
      transitionTime={800}
      onLoaderFinished={() => setProgress(100)}
    />
  );
};

export default TopProgressBar;
