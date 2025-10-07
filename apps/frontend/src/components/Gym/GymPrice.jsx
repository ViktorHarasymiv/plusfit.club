import React, { useEffect } from "react";
import { gymPriceList } from "../../store/gymStore";

import style from "../Massage/Style.module.css";

import Loader from "../ui/Loader/Loader.jsx";
import GymPriceList from "./GymPriceList.jsx";
import Reviews from "../Reviews/Reviews.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";
import Trainer from "../Trainers/Trainer.jsx";

function GymPrice() {
  document.title = "Плюс Фіт - Тренажерний зал";

  const { data, loading, error, fetchGymPriceList } = gymPriceList();

  useEffect(() => {
    fetchGymPriceList();
  }, []);

  console.log(data);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container">
        <SectionTitle title={"Services"} about={"Тренажерний зал"} />
        <div className={style.content_wrapper}>
          <GymPriceList data={data} />
          <Trainer selectedCategory={"Спортивний зал"} />
        </div>
      </div>
      <Reviews filterType={["Реабілітація та масаж"]} />
    </>
  );
}

export default GymPrice;
