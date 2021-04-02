import {Injectable} from '@angular/core';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';

const {Camera} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private webPath: string;

  constructor() {
  }

  public async takePhoto() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 100
      });
      this.webPath = capturedPhoto.webPath;
    } catch (e) {
      console.log('No photo -> ', e);
    }
  }

  public getWebPath(): string {
    return this.webPath;
  }

  public clearWebPath(): void {
    this.webPath = '';
  }

}
