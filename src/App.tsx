import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './App.css';

function App() {
  const [size, setSize] = useState<number>(5);
  const [holdingHistory, setHoldingHistory] = useState([]);
  const [fundDetail, setFundDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreRecords = () => {
    setSize(size + 5);
  };

  useEffect(() => {
    fetch(
      `https://api.inspireinsight.com/api/tickers/1784/constituents?size=${size}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setFundDetail(response.fund);
        setHoldingHistory(response.holdings);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [size]);

  return (
    <div className="App">
      <h1> API Call for Fund Holdings </h1>
      {isLoading && <p>Loading...</p>}
      <table width="100%" border={1}>
        <thead>
          <tr>
            <td colSpan={5}>
              <b>Fund Name:</b> {fundDetail['name']}
            </td>
          </tr>
          <tr>
            <td colSpan={5}>
              <b>Previous Share Price:</b> {fundDetail['previousSharePrice']}
            </td>
          </tr>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Ticker</th>
            <th>Holding Percentage</th>
          </tr>
        </thead>
        <tbody>
          {holdingHistory.map((item, index) => (
            <tr key={item.financialInstrumentId}>
                {item.financialInstrumentId && (
                <>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                  <td>{item.ticker}</td>
                  <td>{item.holdingPercentage}%</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table> 

      <br/>
      {holdingHistory.length !== 0 && (
        <button onClick={loadMoreRecords}>Load More Records</button>
      )}
    </div>
  );
}

export default App;
