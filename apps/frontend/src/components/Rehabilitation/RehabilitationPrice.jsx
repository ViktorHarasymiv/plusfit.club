import React, { useEffect } from "react";
import { rehabilitationPriceList } from "../../store/rehabilitationStore";
import Reviews from "../Reviews/Reviews";
import SectionTitle from "../SectionTitle/SectionTitle";

import style from "../Massage/Style.module.css";
import Trainer from "../Trainers/Trainer";
import RehabilitationPriceList from "./RehabilitationPriceList";
import Loader from "../ui/Loader/Loader";

function RehabilitationPrice() {
  const { data, loading, error, fetchRehabilitationPriceList } =
    rehabilitationPriceList();

  useEffect(() => {
    fetchRehabilitationPriceList();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="container">
        <SectionTitle title={"Services"} about={"Rehabilitation"} />
        <div className={style.content_wrapper}>
          <Trainer selectedCategory={"Rehabilitation"} />
          <RehabilitationPriceList data={data} />
        </div>
      </div>
      <Reviews filterType={["Rehabilitation"]} />
    </>
  );
}

export default RehabilitationPrice;
