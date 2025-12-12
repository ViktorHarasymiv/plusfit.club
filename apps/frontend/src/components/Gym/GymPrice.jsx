import { useEffect } from "react";
import { gymPriceList } from "../../store/gymStore";

import style from "../Massage/Style.module.css";

import GymPriceList from "./GymPriceList.jsx";

import Reviews from "../Reviews/Reviews.jsx";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";
import Trainer from "../Trainers/Trainer.jsx";
import { useLoaderStore } from "../../store/loadingStore.js";

function GymPrice() {
  document.title = "Iron Mass | Subscription";

  const { data, loading, fetchGymPriceList } = gymPriceList();
  const { setLoading } = useLoaderStore();

  useEffect(() => {
    fetchGymPriceList();

    setLoading(loading);
  }, []);

  return (
    <>
      <div className="container">
        <SectionTitle title={"Services"} about={"Gym & Fitness"} />
        <div className={style.content_wrapper}>
          <Trainer selectedCategory={"Gym"} />
          <GymPriceList data={data} />
        </div>
      </div>
      <Reviews filterType={["Gym", "Fitness"]} />
    </>
  );
}

export default GymPrice;
