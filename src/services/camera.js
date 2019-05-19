/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'

import exitIcon from '../assets/vectors/exit.svg'
import reverseCameraIcon from '../assets/vectors/reverse-camera.svg'
import confirmIcon from '../assets/vectors/confirm.svg'
import retakeIcon from '../assets/vectors/retake.svg'

const { Camera } = Plugins

const icons = [
  { src: 'icons/exit.svg', picture: exitIcon },
  { src: 'icons/reverse-camera.svg', picture: reverseCameraIcon },
  { src: 'icons/confirm.svg', picture: confirmIcon },
  { src: 'icons/retake.svg', picture: retakeIcon }
]

const updateIcons = cameraElement => {
  const iconElements = cameraElement.querySelectorAll('img')
  iconElements.forEach(iconElement => {
    icons.forEach(icon => {
      if (iconElement.src.indexOf(icon.src) > -1) {
        iconElement.src = icon.picture
      }
    })
  })
}

const fixPreviewIcons = async () => {
  const cameraModal = document.querySelector('ion-pwa-camera-modal')
  if (cameraModal) {
    await cameraModal.componentOnReady()
    setTimeout(() => {
      const cameraElement = document.querySelector('ion-pwa-camera').shadowRoot
      const cameraButton = cameraElement.querySelector('.shutter')
      cameraButton.addEventListener('click', () => {
        setTimeout(() => {
          updateIcons(cameraElement)
        }, 750)
      })
      updateIcons(cameraElement)
    }, 300)
  }
}

const takePicture = async () =>
  new Promise(async (resolve, reject) => {
    try {
      Camera.getPhoto({
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64,
        allowEditing: false,
        quality: 25
      })
        .then(picture => {
          console.log(picture)
          const pictureContent = picture.dataUrl || `data:image/png;base64,${picture.base64String}`
          resolve(pictureContent)
        })
        .catch(e => {
          reject(e)
        })
      fixPreviewIcons()
    } catch (e) {
      reject(e)
    }
  })

export default { takePicture }
