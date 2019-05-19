/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import RecordRTCPromisesHandler from 'recordrtc'

let recorder = {}

const startRecording = videoElement =>
  new Promise(async (resolve, reject) => {
    try {
      const camera = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      videoElement.srcObject = camera
      videoElement.onloadedmetadata = function(e) {
        videoElement.play()
      }
      recorder = new RecordRTCPromisesHandler(camera, {
        type: 'video'
      })
      recorder.camera = camera
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
        recorder.camera.stop()
        const blob = recorder.getBlob()
        resolve(blob)
      })
    } catch (e) {
      reject(e)
    }
  })

export default { startRecording, stopRecording }
