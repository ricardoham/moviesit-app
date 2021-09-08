/* eslint-disable no-return-assign */
import React, { useEffect, useRef } from 'react';

const useIsMounted = (): any => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => isMounted.current;
};

export default useIsMounted;
