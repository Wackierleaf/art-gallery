import pkg from 'mongoose';

const {Schema, model} = pkg;

const ArtWorkSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String, required: true},
  images: {type: Array},
});

export const artWorkModel = model('User', ArtWorkSchema);
