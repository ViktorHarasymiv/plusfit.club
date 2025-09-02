export function calculateCalories(sex, weight, height, age, activityLevel) {
  let bmr;

  if (sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (sex === "female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    throw new Error("Стать має бути 'male' або 'female'");
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
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
