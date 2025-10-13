import React, { useEffect, useState } from "react";
import GalleryTabsButton from "./GalleryTabsButton";

import GalleryImage from "./GalleryImage";
import { usePortfolioStore } from "../../store/portfolioStore";

function GalleryContent() {
  const { data, fetchPortfolio } = usePortfolioStore();
  const [filter, setFiter] = useState("Усі");
  const [page, setPage] = useState(1);

  const tabsGalleryList = [
    "Усі",
    "Тренажерний зал",
    "Масаж",
    // "Реабілітація",
    "Йога",
    "Дитячі танці",
    // "Ендосфера",
  ];

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div className="container">
      <GalleryTabsButton
        data={tabsGalleryList}
        filter={filter}
        setFiter={setFiter}
        page={page}
      />
      <GalleryImage data={data} filter={filter} page={page} setPage={setPage} />
    </div>
  );
}

export default GalleryContent;
