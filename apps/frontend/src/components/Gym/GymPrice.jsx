import { useEffect } from "react";
import { gymPriceList } from "../../store/gymStore";

import style from "../Massage/Style.module.css";

import GymPriceList from "./GymPriceList.jsx";
import Reviews from "../Reviews/Reviews.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";
import Trainer from "../Trainers/Trainer.jsx";
import { useLoaderStore } from "../../store/loadingStore.js";

function GymPrice() {
  document.title = "Плюс Фіт - Тренажерний зал";

  const { data, loading, fetchGymPriceList } = gymPriceList();
  const { setLoading } = useLoaderStore();

  useEffect(() => {
    fetchGymPriceList();

    setLoading(loading);
  }, []);
  return (
    <>
      <div className="container">
        <SectionTitle title={"Services"} about={"Тренажерний зал"} />
        <div className={style.content_wrapper}>
          <Trainer selectedCategory={"Спортивний зал"} />
          <GymPriceList data={data} />
        </div>
      </div>
      <Reviews filterType={["Реабілітація та масаж"]} />
    </>
  );
}

export default GymPrice;
