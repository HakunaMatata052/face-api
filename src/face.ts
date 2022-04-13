import * as faceapi from 'face-api.js'
import {VideoController} from './video'
import VConsole from 'vconsole'
interface FaceConfig {
    debug?:boolean,
    width:number,
    height:number,
    container?:HTMLElement,
    modelPath:string,
    onIdentify?: Function
}

export default class Face{
    static faceapi = faceapi
    constructor({
        debug = false,
        width = 320,
        height = 500,
        container,
        modelPath,
        onIdentify = ()=>{}
    }:FaceConfig){
        if (debug) {
            new VConsole()
        }
        const video = new VideoController(width,height,container)

        video.createVideo()
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
            // faceapi.nets.faceLandmark68Net.loadFromUri(modelPath),
            // nets.faceRecognitionNet.loadFromUri('./static/model'),
            // nets.faceExpressionNet.loadFromUri('./static/model')
        ]).then(()=>{
            video.startVideo()

        video.videoElement.addEventListener('play',()=>{
            setTimeout(() => {

                // const canvas = faceapi.createCanvasFromMedia(video.videoElement)
                // const displaySize = {
                //     'width':video.videoElement.width,
                //     'height':video.videoElement.height
                // }

                // console.log(video.videoElement.height)
                // document.body.append(canvas)
                // faceapi.matchDimensions(canvas,displaySize)
                const step = async()=>{
                    const detections = await faceapi.detectSingleFace(
                        video.videoElement,
                        new faceapi.TinyFaceDetectorOptions()
                    )// 添加各种识别信息

                    // .withFaceLandmarks() // 人脸区域
                    // .withFaceExpressions() // 人脸表情
                    // .withFaceDescriptors() // theFaceOfARange
                    // .withAgeAndGender() // 年龄

                    // const resizedDetections= faceapi.resizeResults(detections,displaySize)
                    // const res:FaceDetection[] = resizedDetections.map((item)=>{
                    //     const i = JSON.parse(JSON.stringify(item)) 
                    //     console.log(item.box.x)
                    //     if(item.box.x){
                    //         // console.log(item)
                    //         i.box.x = video.videoElement.width - item.box.x
                    //     }
                    //     return i
                    // })
                    onIdentify(detections)
                    // console.log(2,resizedDetections)
                    // const ctx = canvas.getContext('2d')!
                    // ctx?.clearRect(0,0,canvas.width,canvas.height)
                    // draw.drawDetections(canvas,resizedDetections)
                    // draw.drawFaceLandmarks(canvas,resizedDetections)
                    // draw.drawFaceExpressions(canvas,resizedDetections)
                    // setTimeout(() => {
                    //     step()
                    // }, 1000);
                    window.requestAnimationFrame(step)
                }
                step()
            }, 500)

        })
        })
            
    }
}