import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface ArtWork {
  _id: string
  type: string
  description: string
  imagesPaths: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ArtWorksService {
  private artWorksUrl = 'api/art-works'

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

  getArtWorks() {
    return this.http.get(this.artWorksUrl);
  }
}
