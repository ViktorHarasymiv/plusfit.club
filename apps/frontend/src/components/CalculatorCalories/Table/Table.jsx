import React from "react";

import style from "./Table.module.css";

export default function Table() {
  return (
    <table border="1" cellPadding="10" cellSpacing="0" className={style.table}>
      <thead className={style.thead}>
        <tr>
          <th>BMI RANGE</th>
          <th>WEIGHT STATUS</th>
        </tr>
      </thead>
      <tbody className={style.tbody}>
        <tr>
          <td>Less 18.5</td>
          <td>Insufficient weight</td>
        </tr>
        <tr>
          <td>18.5 - 24.9</td>
          <td>A healthy weight</td>
        </tr>
        <tr>
          <td>25.0 – 29.9</td>
          <td>Excessive weight</td>
        </tr>
        <tr>
          <td>30.0 and above</td>
          <td>Adiposity</td>
        </tr>
      </tbody>
    </table>
  );
}
