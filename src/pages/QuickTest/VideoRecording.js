import React, { memo, useEffect, useRef, useState } from 'react'

const initialTime = 3
const limitTime = 10
const VideoRecorder = (props) => {
    const { show, recorderVideoRef, recording, recordingFlagRef, startRecording, stopRecording, showCounter, timeLeft } = props

    return (
        <div className="recorder_container" style={{ display: show ? '' : 'none' }}>
            <div className="recorder_video_container">
                <video ref={recorderVideoRef} autoPlay muted></video>
                <div ref={recordingFlagRef} className={`recording_flag${recording ? ' recording':''}`}>
                    <div className='recording_flag__circle'></div>
                </div>
                {showCounter &&
                    <div className='video_counter'>
                        <h1>{timeLeft}</h1>
                    </div>
                }
            </div>
            {recording &&
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, voluptate consectetur dicta quo velit inventore eligendi a esse quas debitis vel eum consequuntur totam corporis dolorum praesentium quisquam aut qui!</p>
                </div>
            }
            <div id="btn_start_record" className="recorder__button" onClick={startRecording}><p>Start Recording</p></div>
            <div id="btn_stop_record" className="recorder__button" onClick={stopRecording}><p>Stop Recording</p></div>
        </div>
    )
}

const VideoPreview = (props) => {
    const { show, videoBlob, resetRecord, saveChanges } = props

    return (
        <div className='recorder_container' style={{ display: show ? '' : 'none' }}>
            <div className="recorder_video_container">
                <video controls muted src={videoBlob}></video>
            </div>
            <div id="btn_send_record" className="recorder__button" onClick={saveChanges}><p>Send Video</p></div>
            <div id="btn_reset_record" className="recorder__button" onClick={resetRecord}><p>Record again</p></div>
        </div>
    )
}

const wait = delayMS => new Promise(resolve => setTimeout(resolve, delayMS))

const VideoRecording = () => {
    const [recording, setRecording] = useState(false)
    const [recorded, setRecorded] = useState(false)
    const [videoBlob, setVideoBlob] = useState(null)
    const [showCounter, setShowCounter] = useState(false)
    const [timeLeft, setTimeLeft] = useState(initialTime)

    const intervalRef = useRef(null)
    const recorderVideoRef = useRef()
    const recordingFlagRef = useRef()
    const streamRef = useRef()
    const recorderRef = useRef()

    const showTimer = () => {
        setShowCounter(true)
        wait(initialTime*1000 - 100).then(() => setShowCounter(false))
    }

    const startRecording = () => {
        showTimer()
        setTimeout(() => {
            const recorder = recorderRef.current

            const data = []

            recorder.ondataavailable = event => data.push(event.data)
            recorder.start()

            setRecording(true)
            // recordingFlagRef.current.classList.add('recording')

            const stopped = new Promise((resolve, reject) => {
                recorder.onstop = resolve
                recorder.onerror = event => reject(event.name)
            })

            const recorded = wait(limitTime*1000).then(stopRecording)

            return Promise.all([
                stopped,
                recorded
            ])
                .then(() => data)
                .then(recordedChunks => {
                    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" })
                    setVideoBlob(URL.createObjectURL(recordedBlob))

                    console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
                        recordedBlob.type + " media.")
                })
                .catch(e => { console.log(e) })
        }, initialTime * 1000)
    }


    const stopRecording = () => {
        const recorder = recorderRef.current
        if (recorder.state == "recording") {
            recorder.state == "recording" && recorder.stop()
            setRecording(false)
            // recordingFlagRef.current.classList.remove('recording')
        }
        setRecorded(true)
    }

    const clearMediaSource = () => {
        streamRef.current.getTracks().forEach(track => track.stop())
        recorderVideoRef.current.srcObject = null
    }

    const saveChanges = () => {
        console.log('Sending video...')
        clearMediaSource()
    }

    const resetRecord = () => {
        setRecorded(false)
    }

    useEffect(() => {
        if (showCounter) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(time => {
                    const timeLeft = time-1
                    if(timeLeft === 0 ) {
                        clearInterval(intervalRef.current)
                        return initialTime
                    }
                    return timeLeft
                })
            }, 1000)
        }
    }, [showCounter])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(stream => {
                streamRef.current = stream

                recorderVideoRef.current.srcObject = streamRef.current
                recorderVideoRef.current.captureStream = recorderVideoRef.current.captureStream || recorderVideoRef.current.mozCaptureStream
                recorderVideoRef.current.captureStream()

                recorderRef.current = new MediaRecorder(streamRef.current)

                return new Promise(resolve => recorderVideoRef.current.onplaying = resolve)
            }).catch(e => { console.log(e) })
    }, [])


    return (
        <div className="main_container">
            {!recording && <p>Se va a mostrar un texto leelo</p>}
            <VideoRecorder {...{ show: !recorded, recorderVideoRef, recording, recordingFlagRef, startRecording, stopRecording, showCounter, timeLeft }} />
            <VideoPreview {...{ show: recorded, videoBlob, resetRecord, saveChanges }} />
        </div>
    )
}

export default VideoRecording