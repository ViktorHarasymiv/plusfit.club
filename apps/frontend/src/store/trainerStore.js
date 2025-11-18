import { create } from "zustand";

import first from "/img/trainer/trainer1.png";

export const useTrainerStore = create((set, get) => ({
  trainers: [
    {
      id: 0,
      name: "BASIC CROSSFIT",
      greeting: "",
      link: "BASIC-CROSSFIT",
      pricePath: [
        { label: "Массаж", path: "massage" },
        { label: "Реабілітація", path: "rehabilitation" },
      ],
      social: [
        {
          instagram: {
            link: "",
            nickname: "",
          },
        },
        {
          phone: "",
        },
      ],
      category: "BASIC CROSSFIT",
      section: "Реабілітація та масаж",
      photo: first,
      education: [],
      experience: [],
      about: [],
    },
  ],

  getByFilter: (filter) => get().trainers.filter((t) => t.filter === filter),
  getByLink: (link) => get().trainers.find((t) => t.link === link),
}));
