import { create } from "zustand";

export const useTrainerStore = create((set, get) => ({
  trainers: [
    {
      id: 0,
      name: "",
      greeting: "",
      link: "",
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
      category: "Реабілітація та масаж",
      section: "Реабілітація та масаж",
      photo: "",
      education: [],
      experience: [],
      about: [],
    },
  ],

  getByFilter: (filter) => get().trainers.filter((t) => t.filter === filter),
  getByLink: (link) => get().trainers.find((t) => t.link === link),
}));
