
// get the webcam video
const webcam = document.getElementById("webcam")

//Promise to load all the models 
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('./models')
  ]).then(startCapture)

async function startCapture() {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia({video:true});
        webcam.srcObject = stream;
    } catch(err) {
        console.error(err);
    }
}

webcam.addEventListener('play',() => {
    const canvas = faceapi.createCanvasFromMedia(webcam)
    const divelement = document.getElementById("divforvideo")
    const webcamdata = webcam.getBoundingClientRect();
    canvas.style.left = webcamdata.left + "px";
    canvas.style.top = webcamdata.top + "px";
    const canvasize = {width:webcamdata.width,height:webcamdata.height}
    faceapi.matchDimensions(canvas,canvasize) //resizing the canvas to match the video size
    divelement.prepend(canvas)
    const labeledfacedescriptors = loadimages()
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(webcam,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()
        // resized detetections to match the displayed webcam 
        const newdetections = faceapi.resizeResults(detections,canvasize)
        //const faceMatcher = new faceapi.FaceMatcher(newdetections)
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
        //faceapi.draw.drawDetections(canvas, newdetections)  
        const faceMatcher = new faceapi.FaceMatcher(labeledfacedescriptors, 0.6)
        const results = newdetections.map(d => faceMatcher.findBestMatch(d.descriptor)) 
        //faceapi.draw.drawFaceLandmarks(canvas, newdetections)  
        results.forEach((bestmatch, j) => {
            const box = newdetections[j].detection.box
            const drawBox = new faceapi.draw.DrawBox(box,{ label: bestmatch.toString() })
            drawBox.draw(canvas)
          })
    },1000)
   
})

function loadimages() {
    const labels = ['Meghana']
    //const labels1= ['Phoebe','Rachel','Monica','Chandler','Joey','Ross']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 4; i++) {
          //const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-Javascript/master/labeled_images/${label}/${i}.jpg`) //upload photos on a github account
          const canvas = require("canvas")
          const { Canvas, Image, ImageData } = canvas
          const img =  await canvas.loadImage('http://localhost/labeled_images/${label}/${i}.jpeg')
          console.log('Working')
  
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }
  





 