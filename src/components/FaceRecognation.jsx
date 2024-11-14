'use client'

import * as faceApi from 'face-api.js';
import {useEffect, useRef} from 'react';
 
function App() {
    // useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
    // The returned object will persist for the full lifetime of the component.
    const videoRef = useRef();
    const canvasRef = useRef();
 
    const videoWidth = 640;
    const videoHeight = 480;
 
    // The function passed to useEffect will run after the render is committed to the screen.
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = `/models`;
            // First we load the necessary models used by face-api.js located in /public/models
            // https://github.com/justadudewhohacks/face-api.js-models
            Promise.all([
                faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceApi.nets.ageGenderNet.loadFromUri(MODEL_URL),
                faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            ]).then(async () => {
                try {
                    // With HTML5 came the introduction of APIs with access to device hardware, including the MediaDevices API.
                    // This API provides access to multimedia input devices such as audio and video.
 
                    // Since React does not support the srcObject attribute,
                    // we use a ref to target the video and assign the stream to the srcObject property.
                    videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            width: videoWidth,
                            height: videoHeight,
                        },
                    });
                } catch (err) {
                    console.error(err);
                }
            }).catch((err) => console.log(err));
        };
        // We run the function
        loadModels();
    }, []);
    // onPlay={handleVideoOnPlay}
    // React onPlay event execute this function when a video has started to play
    const handleVideoOnPlay = () => {
        // Let's draw our face detector every 100 milliseconds in <canvas>
        // that is an HTML element which can be used to draw graphics using scripts.
        setInterval(async () => {
            try {
                if (canvasRef.current) {
                    // https://justadudewhohacks.github.io/face-api.js/docs/globals.html#createcanvasfrommedia
                    // We fill our canvas tag with the result obtained from our webcam
                    canvasRef.current.innerHTML = faceApi.createCanvasFromMedia(
                        videoRef.current
                    );
                    // We always want to match the canvas to its display size and we can do that with
                    faceApi.matchDimensions(canvasRef.current, {
                        width: videoWidth,
                        height: videoHeight,
                    });
                    // https://justadudewhohacks.github.io/face-api.js/docs/globals.html#detectallfaces
                    // face-api.js detect face in our video
                    const detections = await faceApi
                        .detectAllFaces(
                            videoRef.current,
                            new faceApi.TinyFaceDetectorOptions()
                        )
                        // Which will draw the different session on the face with dots.
                        .withFaceLandmarks()
                        // If we want to see our emotions, we can call
                        .withFaceExpressions();
 
                    // https://justadudewhohacks.github.io/face-api.js/docs/globals.html#resizeResults
                    const resizedDetections = faceApi.resizeResults(
                        detections,
                        {
                            width: videoWidth,
                            height: videoHeight,
                        }
                    );
 
                    if (canvasRef.current) {
                        canvasRef.current
                            .getContext('2d') // The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
                            .clearRect(0, 0, videoWidth, videoHeight); // The clearRect() method in HTML canvas is used to clear the pixels in a given rectangle.
                        // Draw our detections, face landmarks and expressions.
                        faceApi.draw.drawDetections(canvasRef.current, resizedDetections);
                        faceApi.draw.drawFaceLandmarks(
                            canvasRef.current,
                            resizedDetections
                        );
                        faceApi.draw.drawFaceExpressions(
                            canvasRef.current,
                            resizedDetections
                        );
                    }
                }
            } catch (err) {
                alert(err);
            }
        }, 100);
    };
 
    return (
        <div className="App">
            {/* To make the elements appear in a row */}
            <div style={{display: 'flex'}}>
                <video
                    ref={videoRef}
                    width="640"
                    height="480"
                    playsInline
                    autoPlay
                    onPlay={handleVideoOnPlay}
                />
                {/* To make our canvas appear on top of our video */}
                <canvas style={{position: 'absolute'}} ref={canvasRef}/>
            </div>
        </div>
    );
}
 
export default App;



















