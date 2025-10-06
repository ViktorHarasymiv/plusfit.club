import React, { useEffect } from "react";

import css from "./Style.module.css";

import { massagePriceList } from "../../store/massageStore";

import Reviews from "../Reviews/Reviews";
import Trainer from "../Trainers/Trainer";
import PriceList from "./PriceList";
import SectionTitle from "../SectionTitle/SectionTitle";

function MassagePrice() {
  const { data, loading, error, fetchMassagePriceList } = massagePriceList();

  useEffect(() => {
    fetchMassagePriceList();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container">
        <SectionTitle title={"Services"} about={"Масаж"} />
        <div className={css.content_wrapper}>
          <Trainer selectedCategory={"Реабілітація та масаж"} />
          <PriceList data={data} />
        </div>
      </div>
      <Reviews filterType={["Реабілітація та масаж"]} />
    </>
  );
}

export default MassagePrice;
