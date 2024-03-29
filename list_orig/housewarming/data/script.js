/**
 * Quick & easy spectrum analyzer with audioMotion!
 *
 * For audioMotion-analyzer documentation and
 * more demos, visit https://audiomotion.dev
 */

// load module from Skypack CDN
import AudioMotionAnalyzer from './audioMotion-analyzer.js';

// audio source
const audioEl = document.getElementById('audio');
const micButton = document.getElementById('mic');

// instantiate analyzer
const audioMotion = new AudioMotionAnalyzer(
  document.getElementById('container'),
  {
    source: audioEl,
    // height: window.innerHeight - 50,
    // you can set other options below - check the docs!
    mode: 7,
    loRes: true,
    fftSize: 2048,
    // maxFreq: 40000,
    smoothing: 0.3,
    barSpace: .1,
    showLeds: false,
    showFPS: true,
    stereo: false,
    width: 640,
    height: 270,
    lumiBars: true,
    mirror: -1,
    gradient: 'rainbow',
    useCanvas: false,

    onCanvasDraw: instance => {
        var byteArray = new Uint8Array( instance.getBars().length );
        // let eq_str = "";
            // eq_str += instance.getBars().length;
        // get analyzer bars data
        var i = 0;
        var maxValue = 255;
        for ( const bar of instance.getBars() ) {
            const value = bar.value[0];
            var temp = Math.round(value*value*1024);
            if (maxValue < temp)
                maxValue = temp;
            // eq_str += ",";
            // eq_str += Math.round((temp/maxValue)*255);
            byteArray[i++] = Math.round((temp/maxValue)*255);
            if (maxValue > 255)
                maxValue--;
        }
        if ( micButton.checked) {
            if (connection.readyState === WebSocket.OPEN) {
                // console.log(byteArray);
                // connection.send(eq_str);
                connection.send(byteArray);
            }
        }
    }
  }
);

// display module version
// document.getElementById('version').innerText = `v${AudioMotionAnalyzer.version}`;


micButton.addEventListener( 'change', () => {
  if ( micButton.checked ) {
    if ( navigator.mediaDevices ) {
      navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
      .then( stream => {
        // create stream using audioMotion audio context
        const micStream = audioMotion.audioCtx.createMediaStreamSource( stream ); 
        // connect microphone stream to analyzer
        audioMotion.connectInput( micStream );
        // mute output to prevent feedback loops from the speakers
        audioMotion.volume = 0;
        if (connection.readyState != WebSocket.OPEN) {
            connection = new WebSocket('ws://192.168.137.4:81',['arduino']);
        }
        sound.play();
      })
      .catch( err => {
        // alert('Microphone access denied by user');
      });
    }
    else {
      alert('User mediaDevices not available');
    }
  }
  else {
    // disconnect all input audio sources
    audioMotion.disconnectInput();
    connection.close();
  }
});

const canvasButton = document.getElementById('lores');

canvasButton.addEventListener( 'change', () => {
    if ( canvasButton.checked ) {
        audioMotion.loRes=false;
        audioMotion.fftSize=8192;
        audioMotion.smoothing=0.2;
    } else {
        audioMotion.loRes=true;
        audioMotion.fftSize=2048;
        audioMotion.smoothing=0.5;
    }
    // console.log(audioMotion.loRes);
    // console.log(audioMotion.fftSize);
});

function openWebSocket(){
        if (connection.readyState === WebSocket.CLOSED) {
            if ( micButton.checked) {
                connection = new WebSocket('ws://192.168.137.4:81',['arduino']);
                console.log('Opening WebSocket');
            }
        }
}

setInterval(openWebSocket, 5000);
