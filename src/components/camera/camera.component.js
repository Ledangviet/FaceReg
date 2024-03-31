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

                var backCanvas = document.getElementById('main-webcam');
                backCanvas.width = videoWidth;
                backCanvas.height = videoHeight;

                backCanvas.getContext('2d')
                    .drawImage(video, 0, 0, backCanvas.width, backCanvas.height);
                var dataURL = backCanvas.toDataURL();

                let body = JSON.stringify({ 'base64Data': dataURL.split(';base64,')[1] });
                axios.post('http://192.168.1.49:8080/process_post', body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((value) => {
                    console.log(value);
                })
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