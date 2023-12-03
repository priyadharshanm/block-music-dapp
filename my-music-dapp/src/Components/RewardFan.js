import React, { useState } from 'react';
import Web3 from 'web3';
import contractConfig from '../config/contractConfig';

const RewardFan = () => {
    const [fanAddress, setFanAddress] = useState('');
    const [tokenIds, setTokenIds] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const web3 = new Web3(window.ethereum);

    const handleRewardFan = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");

            const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);

            await contract.methods.rewardFan(fanAddress, tokenIds, amounts, "0x")
                .send({ from: accounts[0] });

            setFanAddress('');
            setTokenIds([]);
            setAmounts([]);

            alert('Fan rewarded successfully!');
        } catch (error) {
            console.error('Error rewarding fan:', error);
            alert('Failed to reward fan');
        }
    };

    return (
        <div className="reward-fan">
            <h2>Reward a Fan</h2>
            <input 
                type="text"
                value={fanAddress}
                onChange={(e) => setFanAddress(e.target.value)}
                placeholder="Fan Address"
            />
            <input 
                type="text"
                value={tokenIds.join(',')}
                onChange={(e) => setTokenIds(e.target.value.split(',').map(Number))}
                placeholder="Token IDs (comma-separated)"
            />
            <input 
                type="text"
                value={amounts.join(',')}
                onChange={(e) => setAmounts(e.target.value.split(',').map(Number))}
                placeholder="Amounts (comma-separated)"
            />
            <button onClick={handleRewardFan}>Reward Fan</button>
        </div>
    );
};

export default RewardFan;
