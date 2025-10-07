import React, { useEffect } from "react";
import { rehabilitationPriceList } from "../../store/rehabilitationStore";
import Reviews from "../Reviews/Reviews";
import SectionTitle from "../SectionTitle/SectionTitle";

import style from "../Massage/Style.module.css";
import Trainer from "../Trainers/Trainer";
import PriceList from "./PriceList";
import Loader from "../ui/Loader/Loader";

function RehabilitationPrice() {
  const { data, loading, error, fetchRehabilitationPriceList } =
    rehabilitationPriceList();

  useEffect(() => {
    fetchRehabilitationPriceList();
  }, []);

  console.log(data);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="container">
        <SectionTitle title={"Services"} about={"Реабілітація"} />
        <div className={style.content_wrapper}>
          <Trainer selectedCategory={"Реабілітація та масаж"} />
          <PriceList data={data} />
        </div>
      </div>
      <Reviews filterType={["Реабілітація та масаж"]} />
    </>
  );
}

export default RehabilitationPrice;
