import React, { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  async function getBalance() {
    const res = await axios.get(
      "http://localhost:8080/api/v1/account/balance",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setBalance(res.data.balance);
  }
  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="font-bold text-lg">Your balance</div>
        <div className="font-semibold ml-4 text-lg">
          Rs {balance.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default Balance;
