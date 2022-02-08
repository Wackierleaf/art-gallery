import {artWorkModel} from './art-work.model.js';
import {ArtWorkDto} from './art-work.dto.js';

class ArtWorkService {
  async createArtWork(url, name, type, description, images) {
    const imagesPaths = [];
    console.log(images);
    images.forEach(img => imagesPaths.push(url + '/public/' + img.filename));
    console.log(imagesPaths);
    const artWork = await artWorkModel.create({
      name,
      type,
      description,
      imagesPaths
    });

    return new ArtWorkDto(artWork);
  }

  async getArtWork(id) {

  }

  async getAllArtWork() {
    const artWorks = await artWorkModel.find();
    return artWorks;
  }

  async getImage(path) {

  }

  async editArtWork(id) {

  }
}

export default new ArtWorkService();
