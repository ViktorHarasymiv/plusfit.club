import React from "react";

import css from "./Style.module.css";

function Content() {
  const privacyPolicyTemplate = [
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      blocks: [
        {
          type: "paragraph",
          content:
            "Aenean ullamcorper est est, ac bibendum ipsum tincidunt vehicula. Nulla faucibus vulputate lorem, vitae placerat felis blandit ut. Nam sem quam, euismod sit amet augue et, mollis congue nisi. Vestibulum fringilla lobortis nunc ac tincidunt. Cras nec convallis quam.",
        },
        {
          type: "paragraph",
          content:
            "Maecenas non sem ut enim facilisis rhoncus. Sed odio ex, efficitur ac commodo sed, convallis vitae lectus. Aenean at urna ac tellus ullamcorper pretium. Aliquam erat volutpat. Aliquam sit amet tellus in tortor posuere convallis quis nec tellus.",
        },
        {
          type: "paragraph",
          content:
            "Nulla eu mauris sit amet enim eleifend congue. Quisque aliquam, turpis quis elementum tempus, velit arcu dignissim dui, a vehicula lectus nisi non felis.",
        },
      ],
    },
    {
      id: "collect-information",
      title: "Collect Information",
      blocks: [
        {
          type: "paragraph",
          content:
            "Donec ac pulvinar diam, ac mollis augue. Etiam interdum fringilla magna, at placerat libero malesuada sed. Proin tincidunt a sapien at facilisis.",
        },
        {
          type: "paragraph",
          content:
            "Cras nec lectus pretium, convallis tellus eu, placerat augue. Curabitur luctus odio efficitur elit volutpat, quis venenatis tellus vestibulum.",
        },
        {
          type: "list",
          style: "number",
          items: [
            "Nam ultrices massa id tellus commodo, at mollis elit mattis.",
            "Etiam eget ultrices lectus, at faucibus mauris.",
            "Vivamus interdum cursus mi quis venenatis.",
            "Sed pulvinar efficitur quam quis congue.",
            "Ut vel ornare lorem.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Vivamus mi mi, vestibulum nec eleifend eu, lobortis ac neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit augue dui, non rutrum enim ultrices vel. Fusce mattis ullamcorper nisl, sit amet venenatis odio tincidunt eget.",
        },
      ],
    },
    {
      id: "usage-of-information",
      title: "Usage of Information",
      blocks: [
        {
          type: "paragraph",
          content:
            "Phasellus commodo venenatis erat, et vestibulum mi fringilla in. Proin elit urna, condimentum ut elit id, imperdiet rutrum orci.",
        },
        {
          type: "paragraph",
          content:
            "Praesent vehicula velit at est rutrum lacinia. Nullam accumsan at tortor in ullamcorper.",
        },
        {
          type: "paragraph",
          content:
            "Proin semper sagittis nisl, vitae finibus nisl maximus non. Cras dictum risus quis augue tempor egestas. Proin luctus fermentum nunc, eget pretium dolor tristique id.",
        },
        {
          type: "paragraph",
          content:
            "Suspendisse hendrerit ex sit amet augue lobortis ullamcorper. Maecenas dignissim facilisis orci, non imperdiet sapien ornare at.",
        },
        {
          type: "paragraph",
          content:
            "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        },
        {
          type: "paragraph",
          content:
            "Nam ultrices mi mauris, eget tempus massa ornare id. Aenean rhoncus vestibulum diam, ut dapibus dolor vehicula non. Proin rhoncus convallis commodo.",
        },
      ],
    },
    {
      id: "security-of-user-data",
      title: "Security Of User Data",
      blocks: [
        {
          type: "paragraph",
          content:
            "Integer justo neque imperdiet vitae consequat in vehicula quis dolor orbi lorem leo volutpat a tristique:",
        },
        {
          type: "list",
          style: "number",
          items: [
            "Ut scelerisque hendrerit venenatis",
            "Proin fermentum lacus nec augue blandit placerat",
            "Ut vestibulum elit justo suscipit sem ultricies",
            "Integer fermentum vitae magna in condimentum",
            "Aenean ultrices neque id pellentesque tincidunt",
            "Donec ut vestibulum sem, in faucibus mauris",
          ],
        },
      ],
    },
    {
      id: "copyright-and-security",
      title: "Copyright and Security",
      blocks: [
        {
          type: "paragraph",
          content:
            "Vestibulum bibendum metus quis purus sagittis ultricies. Vestibulum fringilla urna volutpat eros pharetra consectetur. Integer rutrum eu odio et pulvinar.",
        },
        {
          type: "paragraph",
          content:
            "Sed hendrerit pellentesque faucibus. In venenatis lacus sit amet vehicula efficitur. Suspendisse pulvinar malesuada dui non mollis.",
        },
        {
          type: "paragraph",
          content:
            "Aliquam urna massa, rutrum vel luctus in, facilisis a turpis. Ut aliquet accumsan turpis, eget egestas sem pellentesque nec.",
        },
        {
          type: "paragraph",
          content:
            "Phasellus faucibus congue tempor. Mauris ac massa scelerisque metus pulvinar feugiat in ut leo. Proin congue felis orci.",
        },
        {
          type: "paragraph",
          content:
            "Suspendisse consectetur nisl at faucibus venenatis. Quisque pretium rhoncus dui, porttitor varius mi iaculis nec.",
        },
      ],
    },
  ];

  return (
    <div className="container">
      {privacyPolicyTemplate.map((section) => (
        <div className={css.block} key={section.id} id={section.id}>
          <h3 className={css.title}>{section.title}</h3>

          {section.blocks.map((block, idx) => {
            if (block.type === "paragraph") {
              return <p key={idx}>{block.content}</p>;
            }

            if (block.type === "list") {
              const ListTag = block.style === "number" ? "ol" : "ul";
              return (
                <ListTag key={idx}>
                  {block.items.map((item, i) => (
                    <li className="list_style" key={i}>
                      {item}
                    </li>
                  ))}
                </ListTag>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}

export default Content;
