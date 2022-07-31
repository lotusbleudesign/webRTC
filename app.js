let p = null // p = connexion 

function bindEvents(p) {
  // if connexion receive error
  p.on('error', function (error) {
    console.warn('error : ', error)
  })

  // When receive a signal, get data in JSON format
  p.on('signal', function (data) {
    document.querySelector('#offer').textContent = JSON.stringify(data)
  })

  // When receive a video streaming
  p.on('stream', function (stream) {
    let video = document.querySelector('#receiver-video')
    // video.volume = 0
    video.srcObject = stream;
    video.play()
  })

  // Get token offer or candidate token
  document.querySelector('#incoming').addEventListener('submit', function (e) {
    e.preventDefault()
    p.signal(JSON.parse(e.target.querySelector('textarea').value))
  })

}

// Launch media 
function startPeer(initiator) {
  navigator.getUserMedia({
    video: true,
    audio: true,
  }, function (stream) {
    let p = new SimplePeer({
      initiator: initiator,
      stream: stream,
      trickle: false
      // config
    })

    bindEvents(p)

    // Emitt video
    let emitterVideo = document.querySelector('#emitter-video')
    // emitterVideo.volume = 0
    emitterVideo.srcObject = stream;
    emitterVideo.play()
  }, function () { })
}

document.querySelector('#start').addEventListener('click', function (e) {
  startPeer(true)
})

document.querySelector('#receive').addEventListener('click', function (e) {
  startPeer(true)
})

