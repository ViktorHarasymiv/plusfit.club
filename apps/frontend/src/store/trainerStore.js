import { create } from "zustand";

import therapiPhoto from "/img/kozacka1.PNG";
import fitnessTr from "/img/fitness.PNG";
import gymTr from "/img/gymRetush.png";
import yogaTr from "/img/yogaPhoto1.PNG";
import yogaTrOksana from "/img/yogaNatalia.PNG";
import kidsDanceTr from "/img/kidsDanceTr.PNG";

export const useTrainerStore = create((set, get) => ({
  trainers: [
    {
      id: 0,
      name: "Уляна Довгалюк",
      greeting:
        "👋 Мене звати Довгалюк Уляна Романівна, я магістр фізичної терапії та ерготерапії.",
      link: "dovhaliuk-ulyana",
      pricePath: [
        { label: "Массаж", path: "massage" },
        { label: "Реабілітація", path: "rehabilitation" },
      ],
      social: [
        {
          instagram: {
            link: "https://www.instagram.com/rehab_by_uliana_dovhaliuk?igsh=MW5vdWYyYnl0ZHdueA%3D%3D",
            nickname: "rehab_by_uliana_dovhaliuk",
          },
        },
        {
          phone: "+380 (97) 122 89 98",
        },
      ],
      category: "Реабілітація та масаж",
      section: "Реабілітація та масаж",
      photo: therapiPhoto,
      education: [
        "2015 — Дубенський медичний коледж (лікувальна справа)",
        "2019 - 2024 — Львівський державний університет фізичної культури ім. Івана Боберського",
        "Rehab IASTM (блейдингова терапія) — Луцьк, 21 - 22.08.2021",
        "Дитячий моторний онтогенез. Масаж. Робота з батьками. — Львів, 04 - 05.02.2023",
        "Фізична терапія при сколіозі — Чернівці, 16.07.2023",
        "Dry needle method (голкотерапія) — Київ, 16.09.2023",
        "Мануальна та фізична терапія шийного, грудного та поперекового відділу хребта — Львів, 14 - 15.10.2023",
        "Мануальна та фізична терапія: суглоби — Львів, 25 - 26.11.2023",
        "Procedos (3D тренування на платформі) — Київ, 17.02.2024",
        "Комплексна реабілітаційна практика при захворюваннях міжхребцевих дисків, гриж. Корінцева симптоматика — Львів, 13 - 14.04.2024",
        "Фізична та рухова терапія (терапевтичні вправи) — Рівне, 08 - 09.06.2024",
        "Аналіз рухового розвитку дитини. Шкала Альберта— Київ, 27 - 28.07.2024",
        "ІІ Всеукраїнський конгрес фізичної терапії. Виклики війни.— Львів, 06 - 08.09.2024",
        "Сенсорна інтеграція у розвитку дитини — Львів, 28.09.2024",
        "Фізична терапія наслідків бойової травми — Київ, 12 - 13.10.2024",
        "Фізична терапія болю в шиї — Київ, 25 - 26.02.2025",
        "Остеопатичні техніки в мануальній терапії — Київ, 29 - 30.03.2025",
        "FMT Rockpods & FMT Rockfloss (флосинг та каппінг-терапія) — Київ, 04.05.2025",
        "Обстеження як основа нейрореабілітаційного менеджменту (ураження верхнього та нижнього мотонейрону) — НКСІУ, 31.05 - 01.06.2025",
        "Нейрореабілітація. Модуль №3. Втручання та науково інформований вибір програм — НКСІУ, 05 - 06.07.2025",
        "Нейрореабілітація. Модуль №4. Специфічність у втручаннях. ВІТ для відновлення ходьби — НКСІУ, 30 - 31.08.2025",
        "Терапевтичні вправи у протоколі відновлення після бойової травми — Київ, 13 - 14.09.2025",
      ],
      experience: [
        "2022 - 2024 — Бродівський центр комплексної реабілітації для осіб з інвалідністю",
        "2022 — фізичний терапевт у спортивному комплексі «Плюс Фіт»",
        "2025 — головний фізичний терапевт та завідувач відділення реабілітації у Бродівській центральній міській лікарні",
      ],
      about:
        "Вивчала масажні техніки: IASTM, єгипетський, дитячий, лікувальний. Відвідала три масажні чемпіонати та фестифалі масажу/реабілітації. Вересень–травень 2025 — навчання в Харківському національному університеті ім. Каразіна («Біомеханічна та клінічна кінезіологія»).",
    },
    {
      id: 1,
      name: "Еліна Добуш",
      greeting: "",
      link: "elina-dobush",
      social: [
        {
          instagram: {
            link: "https://www.instagram.com/elina8elina?igsh=M205bmZndGhsYWky",
            nickname: "elina8elina",
          },
        },
        {
          phone: "+380 (93) 858 20 03",
        },
      ],
      category: "Фітнес тренування",
      section: "Спортивний зал",
      photo: fitnessTr,
      about:
        "Еліна — персональний тренер, яка вміє перетворювати тренування на результат і задоволення. Вона пройшла шлях від власних тренувань до професійного тренерства і вірить, що спорт — це не покарання, а стиль життя. З нею ви отримаєте не тільки форму, а й впевненість у собі. Її мета — щоб ви полюбили спорт так само, як і вона.",
    },
    {
      id: 2,
      name: "Іван Ковальчук",
      greeting:
        "Хардкордні тренування, жорстокі методи, тотальний контроль, знає як можна померти на тренуванні ще його не почавши😂",
      link: "ivan-kovalchuk",
      social: [
        {
          instagram: {
            link: "https://www.instagram.com/fortes.iv?igsh=MjRvM3g2ZThqOXZp",
            nickname: "fortes.iv",
          },
        },
        {
          phone: "+380 (66) 737 44 52",
        },
      ],
      category: "Силові тренування",
      section: "Спортивний зал",
      photo: gymTr,
      about:
        "Іван - тренер який знає, що ти можеш більше ніж думаєш. У спорті з дитинства тому на власному досвіді переконаний у його важливості у житті. Впевнений, що дисципліна та бажання ставати кращими може завести вас у майбутнє де спорт буде для вас другом без якого ви вже більше не захочете залишатись.",
      certificate: {
        issuedBy: "Expert X",
        program: "Інструктор тренажерної зали",
        hours: 200,
        format: {
          lectures: true,
          practicalLessons: true,
          finalTesting: true,
        },
        disciplines: [
          "Анатомія фітнесу",
          "Інструктор тренажерної зали (базовий рівень)",
          "Інструктор тренажерної зали (просунутий рівень)",
          "Фітнес-тестування",
          "Функціональний тренінг",
          "Стретчинг",
          "Групові програми",
          "Тренування з платформою BOSU",
          "Основи харчування",
          "Персональний тренер",
          "Створення та реалізація індивідуальних програм тренувань",
          "Підготовка тренера до працевлаштування: знання та навички",
        ],
      },
    },
    {
      id: 3,
      name: "Евеліна Колодзінська",
      greeting:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vero laborum reprehenderit minus, voluptatum aperiam voluptates quisquam facere neque ea in repellat dolorem quia. Placeat iusto consequatur itaque minus magnam! Voluptatibus voluptas, tenetur pariatur reiciendis a deserunt vitae asperiores id eos aliquid similique harum recusandae quibusdam velit nostrum doloribus libero! Accusantium minus veniam quos deleniti, distinctio nemo eum laudantium dolore.Delectus iste explicabo in dolor voluptatibus ipsa odio animi omnis maxime suscipit! Odit repudiandae expedita labore, cupiditate, non unde accusamus provident quod vitae quidem consectetur facere inventore quae at nemo.Voluptatum tempore esse voluptas. Enim repellat, corrupti aspernatur itaque ipsam ut voluptas ea fugit harum minus non a laudantium veniam placeat alias eligendi libero animi atque voluptate repellendus quia praesentium!Facilis ipsam vero porro sapiente quasi, ipsa veritatis id vel minus, dolore totam, tempore illum sequi natus est ab suscipit quia? Amet, fuga soluta assumenda culpa quis corrupti neque rerum? ",
      link: "evelina-kolodzinska",
      social: [
        {
          instagram: {
            link: "https://www.instagram.com/grand.dance_studiio?igsh=b2F4cDVmenB4Y2tw",
            nickname: "evelina-kolodzinska",
          },
        },
        {
          phone: "+380 (66) 642 82 52",
        },
      ],
      category: "Хореограф",
      section: "Дитячі танці",
      photo: kidsDanceTr,
      about: "",
      // certificate: {
      //   issuedBy: "Expert X",
      //   program: "Інструктор тренажерної зали",
      //   hours: 200,
      //   format: {
      //     lectures: true,
      //     practicalLessons: true,
      //     finalTesting: true,
      //   },
      //   disciplines: [
      //     "Анатомія фітнесу",
      //     "Інструктор тренажерної зали (базовий рівень)",
      //     "Інструктор тренажерної зали (просунутий рівень)",
      //     "Фітнес-тестування",
      //     "Функціональний тренінг",
      //     "Стретчинг",
      //     "Групові програми",
      //     "Тренування з платформою BOSU",
      //     "Основи харчування",
      //     "Персональний тренер",
      //     "Створення та реалізація індивідуальних програм тренувань",
      //     "Підготовка тренера до працевлаштування: знання та навички",
      //   ],
      // },
    },
    {
      id: 4,
      name: "Ірина Чорній",
      greeting:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vero laborum reprehenderit minus, voluptatum aperiam voluptates quisquam facere neque ea in repellat dolorem quia. Placeat iusto consequatur itaque minus magnam! Voluptatibus voluptas, tenetur pariatur reiciendis a deserunt vitae asperiores id eos aliquid similique harum recusandae quibusdam velit nostrum doloribus libero! Accusantium minus veniam quos deleniti, distinctio nemo eum laudantium dolore.Delectus iste explicabo in dolor voluptatibus ipsa odio animi omnis maxime suscipit! Odit repudiandae expedita labore, cupiditate, non unde accusamus provident quod vitae quidem consectetur facere inventore quae at nemo.Voluptatum tempore esse voluptas. Enim repellat, corrupti aspernatur itaque ipsam ut voluptas ea fugit harum minus non a laudantium veniam placeat alias eligendi libero animi atque voluptate repellendus quia praesentium!Facilis ipsam vero porro sapiente quasi, ipsa veritatis id vel minus, dolore totam, tempore illum sequi natus est ab suscipit quia? Amet, fuga soluta assumenda culpa quis corrupti neque rerum? ",
      link: "iryna-chornii",
      social: [
        {
          instagram: {
            link: "https://www.instagram.com/irynka_chorniy?igsh=ejFsOGtvY2o3N2Qy",
            nickname: "irynka_chorniy",
          },
        },
        {
          phone: "+380 (66) 642 82 52",
        },
      ],
      category: "Йога",
      section: "Йога",
      photo: yogaTr,
      about: "",
      // certificate: {
      //   issuedBy: "Expert X",
      //   program: "Інструктор тренажерної зали",
      //   hours: 200,
      //   format: {
      //     lectures: true,
      //     practicalLessons: true,
      //     finalTesting: true,
      //   },
      //   disciplines: [
      //     "Анатомія фітнесу",
      //     "Інструктор тренажерної зали (базовий рівень)",
      //     "Інструктор тренажерної зали (просунутий рівень)",
      //     "Фітнес-тестування",
      //     "Функціональний тренінг",
      //     "Стретчинг",
      //     "Групові програми",
      //     "Тренування з платформою BOSU",
      //     "Основи харчування",
      //     "Персональний тренер",
      //     "Створення та реалізація індивідуальних програм тренувань",
      //     "Підготовка тренера до працевлаштування: знання та навички",
      //   ],
      // },
    },
    {
      id: 5,
      name: "Оксана Чупіна",
      greeting:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vero laborum reprehenderit minus, voluptatum aperiam voluptates quisquam facere neque ea in repellat dolorem quia. Placeat iusto consequatur itaque minus magnam! Voluptatibus voluptas, tenetur pariatur reiciendis a deserunt vitae asperiores id eos aliquid similique harum recusandae quibusdam velit nostrum doloribus libero! Accusantium minus veniam quos deleniti, distinctio nemo eum laudantium dolore.Delectus iste explicabo in dolor voluptatibus ipsa odio animi omnis maxime suscipit! Odit repudiandae expedita labore, cupiditate, non unde accusamus provident quod vitae quidem consectetur facere inventore quae at nemo.Voluptatum tempore esse voluptas. Enim repellat, corrupti aspernatur itaque ipsam ut voluptas ea fugit harum minus non a laudantium veniam placeat alias eligendi libero animi atque voluptate repellendus quia praesentium!Facilis ipsam vero porro sapiente quasi, ipsa veritatis id vel minus, dolore totam, tempore illum sequi natus est ab suscipit quia? Amet, fuga soluta assumenda culpa quis corrupti neque rerum? ",
      link: "oksana-chupina",
      social: [
        {
          instagram: {
            link: "https://www.instagram.com/chupina102?igsh=MXRheHNoNHluczQ0Zg==",
            nickname: "irynka_chorniy",
          },
        },
        {
          phone: "+380 (66) 642 82 52",
        },
      ],
      category: "Йога",
      section: "Йога",
      photo: yogaTrOksana,
      about: "",
      // certificate: {
      //   issuedBy: "Expert X",
      //   program: "Інструктор тренажерної зали",
      //   hours: 200,
      //   format: {
      //     lectures: true,
      //     practicalLessons: true,
      //     finalTesting: true,
      //   },
      //   disciplines: [
      //     "Анатомія фітнесу",
      //     "Інструктор тренажерної зали (базовий рівень)",
      //     "Інструктор тренажерної зали (просунутий рівень)",
      //     "Фітнес-тестування",
      //     "Функціональний тренінг",
      //     "Стретчинг",
      //     "Групові програми",
      //     "Тренування з платформою BOSU",
      //     "Основи харчування",
      //     "Персональний тренер",
      //     "Створення та реалізація індивідуальних програм тренувань",
      //     "Підготовка тренера до працевлаштування: знання та навички",
      //   ],
      // },
    },
  ],

  getByFilter: (filter) => get().trainers.filter((t) => t.filter === filter),
  getByLink: (link) => get().trainers.find((t) => t.link === link),
}));
