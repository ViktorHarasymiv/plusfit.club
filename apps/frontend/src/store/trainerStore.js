import { create } from "zustand";

import crossfit from "/img/trainer/team-1.png";
import weightlifting from "/img/trainer/team-2.png";
import yoga from "/img/trainer/team-3.png";
import weightlifting2 from "/img/trainer/team-4.png";

export const useTrainerStore = create((set, get) => ({
  trainers: [
    {
      id: 0,
      name: "Sarah Johnson",
      greeting:
        "Namaste! I'm Sarah — your guide to mindful movement, balance, and inner peace through yoga.",
      link: "Sarah-Johnson",
      pricePath: [{ label: "Yoga", path: "yoga" }],
      social: [
        {
          instagram: {
            link: "https://instagram.com/sarah.yoga.flow",
            nickname: "@sarah.yoga.flow",
          },
        },
        {
          phone: "+48 321 654 987",
        },
      ],
      category: "Yoga",
      section: ["Yoga", "Massage", "Rehabilitation"],
      photo: yoga,
      education: [
        "RYT-500 Certified Yoga Instructor — Yoga Alliance",
        "Mindfulness & Meditation Teacher Training — Warsaw Wellness Institute",
        "Anatomy for Yoga Teachers — Online Course by Leslie Kaminoff",
      ],
      experience: [
        "Over 6 years teaching Vinyasa, Hatha, and Restorative yoga",
        "Led retreats and workshops across Poland and the Baltics",
        "Specialized in yoga for stress relief, flexibility, and emotional resilience",
      ],
      about: [
        "My mission is to help you reconnect with your body and breath — one mindful movement at a time.",
        "I create a safe, inclusive space where every student can grow at their own pace.",
        "Yoga with me is more than a workout — it's a journey inward toward clarity, calm, and confidence.",
      ],
    },
    {
      id: 1,
      name: "Emily Chang",
      greeting:
        "Hey there! I'm Emily — your CrossFit coach and movement strategist. Let's unlock your full potential through sweat, grit, and smart training.",
      link: "Emily-Chang",
      pricePath: [{ label: "Crossfit", path: "crossfit" }],
      social: [
        {
          instagram: {
            link: "https://instagram.com/emily.crossfit",
            nickname: "@emily.crossfit",
          },
        },
        {
          phone: "+48 987 654 321",
        },
      ],
      category: "Crossfit",
      section: "Gym",
      photo: crossfit,
      education: [
        "Certified CrossFit Level 2 Trainer",
        "Bachelor's Degree in Kinesiology — University of British Columbia",
        "Mobility & Injury Prevention Course — Wrocław Movement Institute",
      ],
      experience: [
        "7 years coaching CrossFit athletes of all levels — from beginners to regional competitors",
        "Specialized in functional strength, Olympic lifting, and metabolic conditioning",
        "Led over 300 group classes and 1-on-1 sessions focused on technique and performance",
      ],
      about: [
        "I believe fitness should be empowering, not intimidating.",
        "My coaching blends intensity with intention — every rep has a purpose.",
        "Whether you're chasing your first pull-up or prepping for competition, I’ll meet you where you are and push you further.",
      ],
    },
    {
      id: 2,
      name: "Rachel Miller",
      greeting:
        "Hi! I'm Rachel — your weightlifting coach. Together we'll build strength, endurance, and confidence.",
      link: "Rachel-Miller",
      pricePath: [{ label: "Weightlifting", path: "weightlifting" }],
      social: [
        {
          instagram: {
            link: "https://instagram.com/rachel.lifts",
            nickname: "@rachel.lifts",
          },
        },
        {
          phone: "+48 123 456 789",
        },
      ],
      category: "Weightlifting",
      section: "Gym",
      photo: weightlifting,
      education: [
        "Certified Weightlifting Coach (IFBB)",
        "Sports Nutrition Course — Fitness Academy, Warsaw",
      ],
      experience: [
        "5 years of personal training with women and men",
        "Competition prep in the powerlifting category",
        "Development of personalized rehab programs after injuries",
      ],
      about: [
        "I help people unlock their strength — both physical and inner.",
        "My approach is based on technique, safety, and gradual progress.",
        "Training with me is not just sport — it's a journey to a new version of yourself.",
      ],
    },
    {
      id: 3,
      name: "Jason Smith",
      greeting:
        "Hi! I'm Jason — your weightlifting coach. Together we'll build strength, endurance, and confidence.",
      link: "Jason-Smith",
      pricePath: [{ label: "Bodybilding", path: "bodybilding" }],
      social: [
        {
          instagram: {
            link: "https://instagram.com/rachel.lifts",
            nickname: "@Jason.Smith",
          },
        },
        {
          phone: "+48 123 456 789",
        },
      ],
      category: "Bodybilding",
      section: "Gym",
      photo: weightlifting2,
      education: [
        "Certified Bodybilding Coach (IFBB)",
        "Sports Nutrition Course — Fitness Academy, Warsaw",
      ],
      experience: [
        "5 years of personal training with women and men",
        "Competition prep in the powerlifting category",
        "Development of personalized rehab programs after injuries",
      ],
      about: [
        "I help people unlock their strength — both physical and inner.",
        "My approach is based on technique, safety, and gradual progress.",
        "Training with me is not just sport — it's a journey to a new version of yourself.",
      ],
    },
  ],

  getByFilter: (filter) => get().trainers.filter((t) => t.filter === filter),
  getByLink: (link) => get().trainers.find((t) => t.link === link),
}));
