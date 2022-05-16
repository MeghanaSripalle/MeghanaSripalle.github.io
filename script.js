 const imageUpload = document.getElementById('imageUpload')
 //import * as canvas from 'canvas'
 console.log('error')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
]).then(start)

async function start() {
  // creating a div element and appending to the body
  const container = document.createElement('div') 
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas
  document.body.append('Loaded') //Loaded appears
  imageUpload.addEventListener('change', async () => { //async function  when image is uploaded
    if (image) image.remove() //removing previous image if image exist
    if (canvas) canvas.remove()//removing previous image if image exists
    image = await faceapi.bufferToImage(imageUpload.files[0]) //choosing the first file that is uploaded to make it an image that can be used by the face api 
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image) //creates a canvas from the image to be used
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize) //resizing the canvas  
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors() //detecting the face with the face landmarks and descriptors
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor)) //finding best match(image over 60 percent accuracy) for each detection
    //drawing the detection box for each detection with the label
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  })
}

function loadLabeledImages() {
  const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark','Phoebe','Rachel','Monica','Chandler','Joey','Ross','Meghana']
  //const labels1= ['Phoebe','Rachel','Monica','Chandler','Joey','Ross']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://github.com/MeghanaSripalle/Face_recognition/blob/master/labeled_images/${label}/${i}.jpg`) //upload photos on a github account
        //const canvas = require("canvas")
        //const { Canvas, Image, ImageData } = canvas
        //const img =  await canvas.loadImage('http://localhost/labeled_images/${label}/${i}.jpg')
        console.log('WOrking')

        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
   