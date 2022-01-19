export class ArtWorkDto {
  id;
  name;
  type;
  description;
  images;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.type = model.type;
    this.images = model.images;
  }
}
