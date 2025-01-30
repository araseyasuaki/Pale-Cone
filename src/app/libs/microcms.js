import { useState, useEffect } from 'react';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

const CmsData = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const limit = 100;
      let allData = [];
      let offset = 0;
      while (true) {
        const data = await client.get({
          endpoint: 'works',
          queries: {
            limit,
            offset,
          },
        });
        allData = [...allData, ...data.contents];
        if (data.contents.length < limit) break;
        offset += limit;
      }
      setUserData(allData);
    };
    fetchData();
  }, []);

  return { userData };
};

export default CmsData;
