// useCurrencyInfo.js

import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => {
        setData(res[currency]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching currency data:", error);
        setIsLoading(false);
      });
      
  }, [currency]);
  
  return data;
}

export default useCurrencyInfo;