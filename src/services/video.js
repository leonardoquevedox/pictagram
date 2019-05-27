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
    if (!permissions) return resolve()
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
        mimeType: 'video/x-matroska;codecs=avc1',
        canvas: {
          width: 360, // suggested width
          height: 640 // suggested height
        }
      })
      resolve(recorder)
    } catch (e) {
      reject(e)
    }
  })

const startRecording = videoElement =>
  new Promise(async (resolve, reject) => {
    try {
      recorder.startRecording()
      resolve(recorder)
    } catch (e) {
      reject(e)
    }
  })

const stopRecording = videoElement =>
  new Promise(async (resolve, reject) => {
    try {
      recorder.stopRecording(() => {
        videoElement.srcObject.stop()
        videoElement.pause()
        videoElement.removeAttribute('src') // empty source
        videoElement.load()
        resolve(recorder.getBlob())
        /* const blob = recorder.getBlob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
          resolve(reader.result)
        } */
      })
    } catch (e) {
      reject(e)
    }
  })

export default { startLivePreview, startRecording, stopRecording }
