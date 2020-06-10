import { useState, useEffect, useCallback, useRef } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // go one page back, that request is still being executed
  // keep that request in this container until you abortRequest
  const activeHttpReq = useRef([]);

  const sendReq = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      try {
        setIsLoading(true);
        const httpAbortController = new AbortController();
        activeHttpReq.current.push(httpAbortController);

        const res = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal, // cancel connected request
        });

        const resData = await res.json();

        // remove active http requests when succesful render
        activeHttpReq.current = activeHttpReq.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (!res.ok) {
          throw new Error(resData.message);
        }

        setIsLoading(false);
        return resData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      //cleanup function : clean active requests
      // componentDidUnmount / unmounting http hooks
      activeHttpReq.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendReq, clearError }; // states & functions
};
