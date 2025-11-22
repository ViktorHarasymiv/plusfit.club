import React, { useEffect } from "react";
import { rehabilitationPriceList } from "../../store/rehabilitationStore";
import Reviews from "../Reviews/Reviews";
import SectionTitle from "../SectionTitle/SectionTitle";

import style from "../Massage/Style.module.css";
import Trainer from "../Trainers/Trainer";
import Loader from "../ui/Loader/Loader";
import RehabilitationPriceList from "../Rehabilitation/RehabilitationPriceList";

function YogaPrice() {
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
        <SectionTitle title={"Services"} about={"Yoga"} />
        <div className={style.content_wrapper}>
          <Trainer selectedCategory={"Yoga"} />
          <RehabilitationPriceList data={data} />
        </div>
      </div>
      <Reviews filterType={["Yoga"]} />
    </>
  );
}

export default YogaPrice;
