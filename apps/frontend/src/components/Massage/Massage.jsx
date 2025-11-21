import React from "react";
import Content from "../../pages/Offer/Content/Content";

export default function Massage() {
  document.title = "Iron Mass | Massage";

  const content = {
    frontImage:
      "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763746853/c2drzl4r6ma6r8elzteh.jpg",
    firstParagraph: {
      firstTitle: "Massage",

      first:
        "Massage is a mechanical impact on body tissues (skin, muscles, joints), performed by hands or special devices for the purpose of health improvement, relaxation, or treatment. It is used in medicine, cosmetology, sports, and rehabilitation.",
      secound:
        "Who is massage recommended for: athletes — for recovery after exertion; children — for development and posture correction; adults — for stress and pain relief; elderly people — for maintaining mobility.",
      contentImage: [null, null],
      third:
        "Massage is not just a pleasant procedure, but a powerful tool for maintaining health, preventing diseases, and improving psycho-emotional well-being. Its effectiveness depends on the correct choice of method, the specialist’s qualifications, and the regularity of sessions.",
    },
    secoundParagraph: {
      firstTitle: "Why is massage needed?",
      first:
        "It is one of the oldest and most effective methods of health improvement. It combines scientifically proven effects on the body with pleasant sensations that help you relax, relieve tension, and restore energy. In our center, massage is not just a procedure. It is an individual approach, professional execution, and care for your well-being. All massage therapists have medical education and certificates. We work with adults, children, elderly people, and clients with special needs. You can book a massage by phone, through the website form, or via messengers. The first visit includes a short consultation to select the optimal type of massage specifically for you.",
      article: [
        "Improvement of blood circulation and lymphatic drainage",
        "Reduction of muscle tension and pain",
        "Relaxation and stress reduction",
        "Improvement of skin condition",
        "Massage stimulates regeneration, increases elasticity, reduces cellulite manifestations",
        "Helps with spasms, overstrain, back, neck, and joint pain",
      ],
    },
  };

  return (
    <>
      <Content content={content} selectetCategory={"Massage"} />
    </>
  );
}
