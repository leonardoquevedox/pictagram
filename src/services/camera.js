/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import RecordRTCPromisesHandler from 'recordrtc'

let recorder = {}

const checkPermission = () =>
  new Promise((resolve, reject) => {
    if (!window.cordova) resolve()
    const { permissions } = window.cordova.plugins
    permissions.requestPermissions(
      [permissions.CAMERA],
      status => {
        if (status.hasPermission) resolve()
        else reject()
      },
      () => {
        reject()
      }
    )
  })

const startLivePreview = videoElement =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPermission()
      const camera = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 400 },
          height: { ideal: 400 }
        },
        audio: false
      })
      videoElement.srcObject = camera
      videoElement.onloadedmetadata = function(e) {
        videoElement.play()
      }
      recorder = new RecordRTCPromisesHandler(camera, {
        type: 'video',
        canvas: {
          width: 360, // suggested width
          height: 640 // suggested height
        }
      })
      recorder.camera = camera
      recorder.startRecording()
      resolve(recorder)
    } catch (e) {
      reject(e)
    }
  })

const takePicture = videoElement =>
  new Promise(async (resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight
      canvas
        .getContext('2d')
        .drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight)
      videoElement.srcObject.stop()
      videoElement.pause()
      videoElement.removeAttribute('src') // empty source
      videoElement.load()
      recorder.stopRecording(() => {
        recorder.camera.stop()
        resolve({
          width: canvas.width,
          height: canvas.height,
          src: canvas.toDataURL('image/png')
        })
      })
    } catch (e) {
      reject(e)
    }
  })

export default { startLivePreview, takePicture }
