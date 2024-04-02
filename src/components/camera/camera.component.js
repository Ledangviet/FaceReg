import React, { useEffect, useRef } from "react";
import './camera.component.css';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import draw from './utilities';
import axios from "axios";


function CameraComponent(props) {
    var face = false;
    var detected = false;

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const blazeface = require('@tensorflow-models/blazeface')

    const runFacedetection = async () => {

        const model = await blazeface.load()

        setInterval(() => {
            detect(model);
        }, 100);

    }

    const returnTensors = false;
    const detect = async (model) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get video properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            //Set video height and width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            //Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make detections

            var backCanvas = document.getElementById('main-webcam');

            const prediction = await model.estimateFaces(video, returnTensors);

            //draw detected sign
            var ctx = backCanvas.getContext('2d');


            draw(prediction, ctx);
                    
            if (face && !detected) {
                

                detected = true;

                //get face
                if(prediction.length > 0){
                    var newCanvas = document.createElement('canvas');
                    var topLeft = prediction[0].topLeft;
                    
                    let x = topLeft[0];
                    let y = topLeft[1];
                    newCanvas.width = 170;
                    newCanvas.height = 150;
                    var context = newCanvas.getContext('2d');
                    context.drawImage(video,x,y,170,150,0,0,170,150);
    
                    var faceData = newCanvas.toDataURL();
    
                    var img = document.getElementById('link');
                    img.href = faceData;

                    let body = JSON.stringify({ 'base64Data': faceData.split(';base64,')[1] });
                    axios.post('http://192.168.1.49:8080/process_post', body, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((value) => {
                        console.log(value);
                    })
                }

                
            }

            if (prediction.length > 0) {
                face = true;
            }
        }

    }

    runFacedetection();

    return (
        <div >
            <Webcam
                ref={webcamRef}
                className="main-webcam"
            />
            <canvas
                ref={canvasRef}
                className="main-webcam"
                id="main-webcam"
            />
        </div>
    )

}

export default CameraComponent;