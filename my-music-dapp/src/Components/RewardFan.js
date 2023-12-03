import React, { useState } from 'react';
import Web3 from 'web3';
import contractConfig from '../config/contractConfig';

const RewardFan = () => {
    const [fanAddress, setFanAddress] = useState('');
    const [concertPassAmount, setConcertPassAmount] = useState(0);
    const [backstagePassAmount, setBackstagePassAmount] = useState(0);
    const web3 = new Web3(window.ethereum);

    const [fanAddressForBalance, setFanAddressForBalance] = useState('');
    const [selectedPass, setSelectedPass] = useState('concert');
    const [balanceResult, setBalanceResult] = useState(null);


    const checkBalance = async () => {
        try {
        const tokenID = [1,2]; // Assuming 1 is for Concert Pass and 2 for Backstage Pass
        const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);

        // Replace with the actual contract method name and parameters
        const bigIntBalances = await contract.methods.balanceOfBatch([fanAddressForBalance,fanAddressForBalance], tokenID).call();
        console.log(bigIntBalances)
        const balance = bigIntBalances.map(balance => Number(balance));
        console.log(balance)
        setBalanceResult(balance);
        } catch (error) {
        console.error('Error checking balance:', error);
        }
    };
    const handleRewardFan = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            if (!accounts) throw new Error("No account is provided. Please connect to MetaMask.");

            const contract = new web3.eth.Contract(contractConfig.contractABI, contractConfig.contractAddress);
            const tokenIds = [1, 2]; // Predefined token IDs
            const amounts = [concertPassAmount, backstagePassAmount]; // Amounts for each token

            await contract.methods.rewardFan(fanAddress, tokenIds, amounts, "0x")
                .send({ from: accounts[0] });

            setFanAddress('');
            setConcertPassAmount(0);
            setBackstagePassAmount(0);

            alert('Fan rewarded successfully!');
        } catch (error) {
            console.error('Error rewarding fan:', error);
            alert('Failed to reward fan');
        }
    };

    return (
        <div className="reward-fan">
            <h2>Reward a Fan</h2>
            <label>Fan Address:</label>
            <input 
                type="text"
                value={fanAddress}
                onChange={(e) => setFanAddress(e.target.value)}
                placeholder="Fan Address"
            />
            <div>
                <label>Number of Concert Passes:</label>
                <input 
                    type="number"
                    value={concertPassAmount}
                    onChange={(e) => setConcertPassAmount(Number(e.target.value))}
                    placeholder="Quantity Concert Pass"
                />
            </div>
            <div>
                <label>Number of Backstage Passes:</label>
                <input 
                    type="number"
                    value={backstagePassAmount}
                    onChange={(e) => setBackstagePassAmount(Number(e.target.value))}
                    placeholder="Amount for Backstage Pass"
                />
            </div>
            <button onClick={handleRewardFan}>Reward Fan</button>

            <section className="balance-check">
        <h2>Check Fan Balance</h2>
        <input
          type="text"
          value={fanAddressForBalance}
          onChange={(e) => setFanAddressForBalance(e.target.value)}
          placeholder="Fan Address"
        />
     
        <button onClick={checkBalance}>Check Balance</button>
        {/* Displaying balances */}
        {balanceResult && (
            <div className="balance-display">
                <p>Concert Pass Balance: {Number(balanceResult[0])}</p>
                <p>Backstage Pass Balance: {Number(balanceResult[1])}</p>
            </div>
        )}
      </section>
        </div>
    );
};

export default RewardFan;
