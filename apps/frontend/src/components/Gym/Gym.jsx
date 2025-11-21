import Content from "../../pages/Offer/Content/Content";

function Gym() {
  document.title = "Iron Mass | Gym | Fitness";

  const content = {
    frontImage:
      "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763744351/dnqlmxupyv9s6uc6ksth.jpg",
    firstParagraph: {
      firstTitle: "Gym and Fitness",

      first:
        "Fitness is not only about the body. It’s about choice. About the inner strength that makes you get up earlier when others are still asleep. About the desire to be better than yesterday. The gym is a space where pain turns into progress, and fatigue becomes victory.",
      secound:
        "There are no accidental results here. Every repetition is a step toward the goal. Every drop of sweat is proof that you didn’t give up. And even when it feels like you have no strength left — that’s exactly when true endurance is born.",
      contentImage: ["", ""],
      third:
        "Fitness is not about the perfect body. It’s about discipline, character, and respect for yourself. It’s about looking in the mirror and seeing not just muscles, but a person who is not afraid of challenges.",
    },
    secoundParagraph: {
      firstTitle: "Why do we need fitness and strength training?",
      article: [
        "Improve heart and lung function",
        "Reduce stress and anxiety levels",
        "Maintain a healthy weight",
        "Develop flexibility and coordination",
        "Strengthen muscles and bones",
        "Improve metabolism and calorie burning",
        "Reduce the risk of osteoporosis, diabetes, and heart disease",
      ],
    },
  };

  return <Content content={content} selectetCategory={"Gym"} />;
}

export default Gym;
