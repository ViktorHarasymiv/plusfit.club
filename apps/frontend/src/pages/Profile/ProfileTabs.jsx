import React from "react";

function ProfileTabs() {
  const consoleTabs = [
    {
      id: 0,
      label: "Новини",
    },
    {
      id: 0,
      label: "Рекомендації",
    },
    {
      id: 0,
      label: "Калькулятор калорій",
    },
  ];

  return (
    <ul>
      {consoleTabs.map(({ id, label }, index) => (
        <li key={index}>{label}</li>
      ))}
    </ul>
  );
}

export default ProfileTabs;
