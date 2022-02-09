import {validationResult} from 'express-validator';
import ApiError from '../exceptions/api-error.js';
import artWorkService from '../art-work/art-work.service.js';
import * as fs from 'fs';

class ArtWorkController {
  async createArtWork(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const url = 'E:\\Files\\Учёба\\РПБД\\art-gallery\\backend';
      const {name, type, description} = req.body;
      const images = req.files;
      const artWorkData = await artWorkService.createArtWork(url, name, type, description, images);
      return res.json(artWorkData);
    } catch (e) {
      next(e);
    }
  }

  async getArtWork(req, res, next) {

  }

  async getAllArtWork(req, res, next) {
    try {
      const artWorkData = await artWorkService.getAllArtWork();
      return res.send(artWorkData);
    } catch (e) {
      next(e);
    }
  }

  async editArtWork(req, res, next) {

  }

  async getImage(req, res) {
    const { path } = req.query
    console.log(path);
    const dir = 'E:\\Files\\Учёба\\РПБД\\art-gallery\\backend\\';
    fs.readFile(dir + path, function (error, image) {
      if (error) {
        res.statusCode = 404
        res.end('Resource not found')
      } else {
        res.end(image)
      }
    })
  }
}

export default new ArtWorkController();
