import { model, Schema } from 'mongoose';

const heroSchema = new Schema({
  greeting: String,
  title: {
    base: String,
    accent: String,
    baseFinish: String,
  },
  about: String,
  action: [String],
  backgroundImage: String,
});

export const HeroCollection = model('HeroSlider', heroSchema);
