import Content from "../../pages/Offer/Content/Content";

export default function Yoga() {
  document.title = "Iron Mass - Yoga";

  const content = {
    frontImage:
      "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763906923/b6y8uhdlaibkjmgcyssc.jpg",
    firstParagraph: {
      firstTitle: "Yoga",

      first:
        "Yoga is not just exercise. It is a meeting with yourself. It is the moment when you pause, breathe deeper, and remember that your body is not an enemy but an ally. Every asana is not about flexibility, but about balance. Not about perfect form, but about inner harmony.",
      secound:
        "On the mat there are no competitions. There is only you, your breath, and the silence that heals. Yoga teaches you to listen to yourself, accept yourself, and be in the moment. It doesn’t change you — it brings you back to your true self.",
      contentImage: [
        "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763907056/tczshogsordclvvookb0.jpg",
        "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763907315/xmfu9gwnaqlqwhchvehn.jpg",
      ],
      third:
        "It is a path not to perfection, but to wholeness. And every step on this path is an act of love for yourself.",
    },
    secoundParagraph: {
      firstTitle: "Why is rehabilitation needed?",
      first:
        "General rehabilitation is not a luxury, but a necessary part of treatment that restores not only health but also dignity, freedom, and hope.",
      article: [
        "Improvement of flexibility and endurance",
        "Relief of stress and restoration of emotional state",
        "A feeling of lightness and inner harmony",
        "Gentle work with the body without overload",
        "Increase of self-esteem and self-confidence",
      ],
    },
  };

  return <Content content={content} selectetCategory={"Yoga"} />;
}
