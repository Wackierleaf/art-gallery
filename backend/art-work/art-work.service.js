import {artWorkModel} from './art-work.model.js';
import {ArtWorkDto} from './art-work.dto.js';

class ArtWorkService {
  async createArtWork(url, name, type, description, images) {
    const imagesPaths = [];
    images.forEach(img => imagesPaths.push(img.filename));
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

  async editArtWork(id) {
  }

  async delete(_id) {
    const deletedArt = await artWorkModel.deleteOne({_id})
    return deletedArt
  }

  async patchPaths(id, paths) {
    const {imagesPaths} = await artWorkModel.findById(id)
    paths.forEach(path => imagesPaths.push(path))
    const updatedArtWork = await artWorkModel.findByIdAndUpdate(id, {imagesPaths: imagesPaths})
  }

  async search(searchValue) {
    return artWorkModel.fuzzySearch(searchValue);
  }
}

export default new ArtWorkService();
