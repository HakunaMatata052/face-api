export class VideoController {
    private width:number
    private height:number
    private container:HTMLElement
    public videoElement:HTMLVideoElement
    constructor(width:number,height:number,container:HTMLElement = document.body){
        this.videoElement = document.createElement('video')
        this.width = width
        this.height = height
        this.container = container
    }
    createVideo(){
        this.videoElement.width = this.width
        this.videoElement.height = this.height
        this.videoElement.autoplay = true
        this.videoElement.muted = true
        this.videoElement.controls = false
        this.videoElement.style.display = 'block'
        this.videoElement.setAttribute('playsinline', 'playsinline')
        this.container.append(this.videoElement)
    }
    startVideo(){
        const mediaDevices = navigator.mediaDevices || navigator
        mediaDevices.getUserMedia(
            {
                'audio': false,
                'video': { 
                    width: { 
                        // min: 1280,
                        ideal: this.height,
                        // max: 2560,
                      },
                      height: {
                        // min: 720,
                        ideal: this.width,
                        // max: 1440
                      },
                  
                    // // sourceId: 'default',
                    facingMode:  { exact: "user" }
                }
            }
        ).then((stream)=>{
            console.log(stream)
            this.videoElement.srcObject = stream
            this.videoElement.play()
            this.videoElement.style.transform='rotateY(180deg)'
            this.videoElement.onloadedmetadata = () => {
                // const cameraSize = {
                //     'width': this.videoElement.offsetWidth,
                //     'height':this.videoElement.offsetHeight
                // }
            //   if (window.innerWidth < window.innerHeight) {
            //     // 竖屏
            //     if (cameraSize.height < window.innerHeight) {
            //         this.videoElement.setAttribute('height', window.innerHeight.toString() + 'px');
            //     }
            //   }
            //   else {
            //     // 横屏
            //     if (cameraSize.width < window.innerWidth) {
            //         this.videoElement.setAttribute('width', window.innerWidth.toString() + 'px');
            //     }
            //   }
            }
        }).catch(err=>{
            console.log(err)
        })
    }

}