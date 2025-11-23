import Content from "../../pages/Offer/Content/Content";

export default function Rehabilitation() {
  document.title = "Iron Mass | Rehabilitation";

  const content = {
    frontImage:
      "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763897652/yensqbt8itgjvb9a1pho.jpg",
    firstParagraph: {
      firstTitle: "Rehabilitation",

      first:
        "We help you recover after injuries, surgeries, and prolonged physical strain.",
      secound:
        "General rehabilitation is a set of medical, social, psychological, and educational measures aimed at restoring health, functional abilities, and quality of life after illnesses, injuries, or other disorders. According to the WHO, rehabilitation is a process that helps a person with limited functions adapt to new living conditions, fully realize their potential, and return to active participation in society.",
      contentImage: [
        "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763897663/nkvtjrifuqjmpkx49t32.jpg",
        "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1763897671/ydeoouxaylrqftltsvag.jpg",
      ],
      third:
        "Rehabilitation may include: physiotherapy and therapeutic exercise, massage, occupational therapy, speech therapy, psychological support. The specialist you can work with is physical therapist Ulyana Dovgalyuk.",
    },
    secoundParagraph: {
      firstTitle: "Why is rehabilitation needed?",
      first:
        "General rehabilitation is not a luxury but a necessary part of treatment that restores not only health but also dignity, freedom, and hope.",
      article: [
        "Restoration of physical functions (mobility, strength, coordination)",
        "Psychological support and stabilization of emotional state",
        "Social adaptation — return to education, work, communication",
        "Prevention of complications and recurrent illnesses",
        "Increase of self-esteem and self-confidence",
        "Promotes independence and autonomy",
      ],
    },
  };

  return (
    <div>
      <Content content={content} selectetCategory={"Rehabilitation"} />
    </div>
  );
}
