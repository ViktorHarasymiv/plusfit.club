import React, { useEffect } from "react";

import css from "./Style.module.css";

import { massagePriceList } from "../../store/massageStore";
import { useLoaderStore } from "../../store/loadingStore";

import Reviews from "../Reviews/Reviews";
import Trainer from "../Trainers/Trainer";
import PriceList from "./PriceList";
import SectionTitle from "../SectionTitle/SectionTitle";

function MassagePrice() {
  const { data, loading, fetchMassagePriceList } = massagePriceList();
  const { setLoading } = useLoaderStore();

  useEffect(() => {
    fetchMassagePriceList();
    setLoading(loading);
  }, []);

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
