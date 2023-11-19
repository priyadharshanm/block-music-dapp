import React, { useState, useEffect } from 'react';
import getWeb3 from '../utils/web3Service';

const Web3Initializer = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
    };

    initWeb3();
  }, []);

  // Now you can use web3 in your component
  return (
    <div>
      {/* {web3 ? "Web3 is initialized" : "Web3 is not initialized"} */}
    </div>
  );
};

export default Web3Initializer;
