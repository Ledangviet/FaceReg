import React, { useEffect, useRef } from "react";
import './camera.component.css';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import draw from './utilities';
import axios from "axios";


function sendImage(endpoint, faceData) {
    return axios.post(endpoint, faceData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function OnCaptureImg(){

}

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
                if (prediction.length > 0) {
                    var newCanvas = document.createElement('canvas');
                    var topLeft = prediction[0].topLeft;
                    var bottomRight = prediction[0].bottomRight;

                    var w = Math.abs(topLeft[0] - bottomRight[0]);
                    let h = Math.abs(topLeft[1] - bottomRight[1]) * 1.7;
                    let x = topLeft[0];
                    let y = topLeft[1] - h / 3;


                    newCanvas.width = w;
                    newCanvas.height = h;
                    var context = newCanvas.getContext('2d');
                    context.drawImage(video, x, y, w, h, 0, 0, w, h);

                    var faceData = newCanvas.toDataURL();

                    var img = document.getElementById('link');
                    img.href = faceData;
                    var faceimg = document.getElementById('face-img');
                    faceimg.src = faceData;

                    let body = JSON.stringify({ 'base64Data': faceData.split(';base64,')[1] });
                    let endpoint = 'http://192.168.1.49:8080/process_post';

                    sendImage(endpoint, body).then((value) => {
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
        <div className="camera-container">
            <div className=".button-container">
                <button className="button-basic">Điểm danh</button>
                <button className="button-basic">Nhận diện</button>
            </div>

            <div className="camera">
                <Webcam
                    ref={webcamRef}
                    className="main-webcam"
                />
                <canvas
                    ref={canvasRef}
                    className="main-webcam"
                    id="main-webcam"
                />
                <div className="student-info">
                    <h6 className="img-label">Hình ảnh</h6>
                    <div className="image">
                        <img id="face-img"></img>
                    </div>
                    <h6 className="img-label">MSSV</h6>
                    <h6 id="mssv" className="info-label"> 162000388</h6>
                    <h6  className="img-label">Họ Tên</h6>
                    <h6 id="hoten" className="info-label"> Lê Đăng Việt </h6>
                    <h6 className="img-label">Lớp</h6>
                    <h6 id="lop" className="info-label"> 20DTH2</h6>
                </div>
            </div>
            

        </div>
    )

}

export default CameraComponent;