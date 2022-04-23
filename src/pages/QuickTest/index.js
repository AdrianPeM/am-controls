import React, { Fragment, useCallback, useEffect, useState } from 'react'
import './style.scss'
import Videorecording from './VideoRecording'


function wait(delayInMS) {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
}

const QuickTest = () => {
    const [currentQuestion, setQuestion] = useState('')
    const [savedAnswers, setSavedAnswers] = useState(false)

    const questions = [
        'Esta es la primer pregunta',
        'Esta es la segunda pregunta',
        'Esta es la tercera pregunta',
        'Esta es la cuarta pregunta',
        'Esta es la quinta pregunta',
    ]

    const nextStep = useCallback(() => {
        setQuestion(current => {
            const newVal = current + 1

            questions.length == newVal && setSavedAnswers(true)
            return newVal
        })
    }, [questions.length])

    useEffect(() => {
        if (questions.length > 0) {
            setQuestion(0)
        }
    }, [])

    // render

    // const startHandle = () => {
    //     let preview = document.getElementById("preview");
    //     let recording = document.getElementById("recording");
    //     // let startButton = document.getElementById("startButton");
    //     // let stopButton = document.getElementById("stopButton");
    //     let downloadButton = document.getElementById("downloadButton");
    //     // let logElement = document.getElementById("log");

    //     let recordingTimeMS = 5000;
    //     navigator.mediaDevices.getUserMedia({
    //         video: true,
    //         audio: true
    //     }).then(stream => {
    //         preview.srcObject = stream;
    //         downloadButton.href = stream;
    //         preview.captureStream = preview.captureStream || preview.mozCaptureStream;
    //         return new Promise(resolve => preview.onplaying = resolve);
    //     }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
    //         .then(recordedChunks => {
    //             let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    //             recording.src = URL.createObjectURL(recordedBlob);
    //             downloadButton.href = recording.src;
    //             downloadButton.download = "RecordedVideo.webm";

    //             console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
    //                 recordedBlob.type + " media.");
    //         })
    //         .catch(e => { console.log(e) });
    // }

    // function startRecording(stream, lengthInMS) {
    //     let recorder = new MediaRecorder(stream);
    //     let data = [];

    //     recorder.ondataavailable = event => data.push(event.data);
    //     recorder.start();
    //     console.log(recorder.state + " for " + (lengthInMS / 1000) + " seconds...");

    //     let stopped = new Promise((resolve, reject) => {
    //         recorder.onstop = resolve;
    //         recorder.onerror = event => reject(event.name);
    //     });

    //     let recorded = wait(lengthInMS).then(
    //         () => recorder.state == "recording" && recorder.stop()
    //     );

    //     return Promise.all([
    //         stopped,
    //         recorded
    //     ])
    //         .then(() => data);
    // }

    // const stopHandle = () => {
    //     let preview = document.getElementById("preview");
    //     stop(preview.srcObject);
    // }

    // function stop(stream) {
    //     stream.getTracks().forEach(track => track.stop());
    // }

    // return (
    //     <div style={{ display: 'flex', gap: '10px', justifyContent:'center' }}>
    //         <div className="left">
    //             <div id="startButton" onClick={startHandle} className="button">
    //                 Start Recording
    //             </div>
    //             <h2>Preview</h2>
    //             <video id="preview" width="160" height="120" autoPlay muted></video>
    //         </div>

    //         <div className="right">
    //             <div id="stopButton" onClick={stopHandle} className="button">
    //                 Stop Recording
    //             </div>
    //             <h2>Recording</h2>
    //             <video id="recording" width="160" height="120" controls></video>
    //             <a id="downloadButton" className="button">
    //                 Download
    //             </a>
    //         </div>

    //     </div>
    // )
    return (
        <div className='question_container'>
            {!savedAnswers ?
                <Fragment>
                    <div className='question'>
                        <p>{questions[currentQuestion]}</p>
                    </div>
                    {questions[currentQuestion] &&
                        <button className='btn_next_step' onClick={nextStep}>{questions.length != (currentQuestion + 1) ? 'Siguiente' : 'Guardar'}</button>
                    }
                </Fragment>
                :
                <Videorecording/>
            }
        </div>
    )
}

export default QuickTest
