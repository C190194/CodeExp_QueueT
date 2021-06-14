import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// https://www.codegrepper.com/code-examples/javascript/how+to+export+custom+react+hooks
// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
// can add memoizing technique

const useFetch = (url) => {
    const cache = useRef({});
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus('fetching');
            if (cache.current[url]) {
                const data = cache.current[url];
                setData(data);
                setStatus('fetched');
            } else {
                const response = await fetch(url);
                const data = await response.json();
                cache.current[url] = data;
                setData(data);
                setStatus('fetched');
            }
        };
        fetchData();
    }, [url]);

    return { status, data };
};


export default useFetch