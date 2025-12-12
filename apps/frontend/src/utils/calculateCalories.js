export function calculateCalories(sex, weight, height, age, activityLevel) {
  let bmr;

  if (sex === "Man") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (sex === "Woman") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    throw new Error("Стать має бути 'Man' або 'Woman'");
  }

  const activityMultipliers = {
    Sitting: 1.2,
    Weak: 1.375,
    Average: 1.55,
    Active: 1.725,
    "Strong activity": 1.9,
  };

  const multiplier = activityMultipliers[activityLevel];
  if (!multiplier) {
    throw new Error("Невірний рівень активності");
  }

  const heightInMeters = height / 100;

  const dailyCalories = bmr * multiplier;
  const bmiFactor = weight / (heightInMeters * heightInMeters);

  return {
    BMR: Math.round(dailyCalories),
    BMI: Math.round(bmiFactor),
  };
}
