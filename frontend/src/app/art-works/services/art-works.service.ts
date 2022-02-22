import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ART_TYPES} from "../components/add-art-modal/add-art-modal.component";

export interface ArtWork {
  _id: string
  name: string
  type: ART_TYPES
  description: string
  imagesPaths: string[]
}

export const artWorkTypesTranslationMap = new Map<ART_TYPES, string>([
  [ART_TYPES.PICTURES, 'ART-MANAGEMENT.DIALOG.TYPES.PICTURES'],
  [ART_TYPES.ARCHITECTURE, 'ART-MANAGEMENT.DIALOG.TYPES.ARCHITECTURE'],
  [ART_TYPES.PHOTOS, 'ART-MANAGEMENT.DIALOG.TYPES.PHOTOS'],
  [ART_TYPES.SCULPTURE, 'ART-MANAGEMENT.DIALOG.TYPES.SCULPTURE'],
])

@Injectable({
  providedIn: 'root'
})
export class ArtWorksService {
  private artWorksUrl = 'api/art-works'
  private getImgUrl = 'api/image';
  private deleteArtWorks = 'api/delete-art'
  private patchPathsUrl = 'api/patch-paths'

  constructor(
    private readonly http: HttpClient
  ) { }

  createArtWorks(name: string, type: string, description: string, files: File[]) {
    const payload = {
      name,
      type,
      description,
      files,
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('description', description);
    for (let idx = 0; idx < files.length; idx++) {
      const el = files[idx]
      formData.append('images', el)
    }
    return this.http.post(this.artWorksUrl, formData)
  }

  getArtWorkImg(path: string) {
    return this.http.get(this.getImgUrl, {
      params: {
        path
      },
      responseType: 'blob'
    });
  }

  getArtWorks() {
    return this.http.get<ArtWork[]>(this.artWorksUrl);
  }

  deleteArtWork(_id: string) {
    return this.http.get(this.deleteArtWorks,{params: {_id}} )
  }

  patchPaths(id: string, paths: string[]) {
    return this.http.post(this.patchPathsUrl, {paths, id})
  }
}
