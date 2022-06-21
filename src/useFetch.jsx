import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortCont = new AbortController();

    (async () => {
      try {
        let res = await fetch(url, { signal: abortCont.signal });
        if (!res.ok) {
          throw Error("could not fetch data");
        }
        let data = await res.json();
        setData(data);
        setIsLoading(false);
        setError("");
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortError") {
          setError(err.message);
          setIsLoading(false);
        }
      }
    })();

    return () => abortCont.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
