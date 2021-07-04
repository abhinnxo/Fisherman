import React from "react";
import "../css/pricetable.css";

const MarketPriceTable = () => {
  return (
    <div className="d-flex">
      <div className="p-3"></div>
      <table className="table text-white">
        <caption>
          <h5 className="text-center text-white">Market Price List</h5>
        </caption>
        <thead>
          <tr>
            <th scope="col">Total Capture</th>
            <th scope="col" colSpan="4">
              Team Capture
            </th>
            <th scope="col" colSpan="4">
              Profit / Loss
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>8</th>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>-25</td>
            <td>-25</td>
            <td>-25</td>
            <td>-25</td>
          </tr>
          <tr>
            <th>7</th>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>25</td>
            <td>25</td>
            <td>25</td>
            <td>-25</td>
          </tr>
          <tr>
            <th>6</th>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>1</td>
            <td>50</td>
            <td>50</td>
            <td>-12.5</td>
            <td>-12.5</td>
          </tr>
          <tr>
            <th s>5</th>
            <td>2</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>75</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <th>4</th>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>25</td>
            <td>25</td>
            <td>25</td>
            <td>25</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarketPriceTable;
