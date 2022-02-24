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

  async delete(req, res, next) {
    try {
      const {_id} = req.query
      const deletedArt = await artWorkService.delete(_id)
      return res.send(deletedArt)
    } catch (e) {
      next(e)
    }
  }

  async getImage(req, res) {
    const { path } = req.query
    const dir = '/Users/rbaklanov/Documents/Self projects/art-gallery/backend/public/';
    fs.readFile(dir + path, function (error, image) {
      if (error) {
        res.statusCode = 404
        res.end('Resource not found')
      } else {
        res.end(image)
      }
    })
  }

  async patchPaths(req, res, next) {
    try {
      const {id, paths} = req.body
      await artWorkService.patchPaths(id, paths)
      res.end()
    } catch (e) {
      next(e)
    }
  }

  async search(req, res, next) {
    try {
      const {searchValue} = req.query
      const searchResult = await artWorkService.search(searchValue)
      return res.send(searchResult)
    } catch (e) {
      next(e)
    }
  }
}

export default new ArtWorkController();
