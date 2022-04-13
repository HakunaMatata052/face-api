import { FaceDetection } from 'face-api.js'
import Face from './face'
const face = new Face({
    debug: true,
    width: window.innerWidth,
    height: window.innerHeight,
    modelPath: './static/model',
    onIdentify: (res: FaceDetection[]) => {
        // const canvas = document.querySelector('canvas')
        // const ctx = canvas.getContext('2d')
        // const video = document.querySelector('video')
        // const displaySize = {
        //     'width': video.width,
        //     'height': video.height
        // }
        // faceapi.matchDimensions(canvas,displaySize)
        // const resizedDetections= faceapi.resizeResults(detections,displaySize)
        // ctx.clearRect(0,0,canvas.width,canvas.height)
        // faceapi.draw.drawDetections(canvas,resizedDetections)
        console.log(res)
    }
})