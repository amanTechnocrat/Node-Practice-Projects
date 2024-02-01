const canvas = require('canvas');
const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Load the face detection and recognition models
async function loadModels() {
  const MODEL_URL = './models'; // Path to the face-api.js models
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
}

// Calculate the similarity between two images
async function calculateSimilarity(image1Path, image2Path) {
  await loadModels();

  // Load the images
  const image1 = await canvas.loadImage(image1Path);
  const image2 = await canvas.loadImage(image2Path);

  // Detect faces in the images
  const face1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
  const face2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();

  // Check if faces were detected in both images
  if (!face1 || !face2) {
    throw new Error('Could not detect faces in one or both images');
  }

  // Compute the similarity between the faces
  const faceDescriptor1 = face1.descriptor;
  const faceDescriptor2 = face2.descriptor;
  const faceDistance = faceapi.euclideanDistance(faceDescriptor1, faceDescriptor2);
  const similarity = 1 - faceDistance;

  return similarity;
}

// Usage example
const image1Path = './profiles/tt.jpg';
const image2Path = './profiles/testimg2.jpg';

calculateSimilarity(image1Path, image2Path)
  .then(similarity => {
    console.log('Similarity:', similarity);
  })
  .catch(error => {
    console.error('Error:', error);
  });
