import pkg from 'mongoose';
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching'

const {Schema, model} = pkg;

const ArtWorkSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String, required: true},
  imagesPaths: {type: Array},
});

ArtWorkSchema.plugin(mongoose_fuzzy_searching, {fields: ['name',' description']})

export const artWorkModel = model('ArtWork', ArtWorkSchema);
