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
          <td>Менше 18.5</td>
          <td>Недостатня вага</td>
        </tr>
        <tr>
          <td>18.5 - 24.9</td>
          <td>Здорова вага</td>
        </tr>
        <tr>
          <td>25.0 – 29.9</td>
          <td>Надмірна вага</td>
        </tr>
        <tr>
          <td>30.0 і більше</td>
          <td>Ожиріння</td>
        </tr>
      </tbody>
    </table>
  );
}
