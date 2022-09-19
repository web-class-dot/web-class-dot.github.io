class VideoPlayer {
  constructor({
    playBtnColur,
    pauseBtnColour,
    forwardBtnColour,
    backwardBtnColour,
  }) {
    // console.log(forwardBtnColour||"error")
    if (document.body.offsetWidth < 700) {
      document.querySelector('.controls').remove();
    }
    this.playBtnColur = playBtnColur || this.Exception('Expected a string');
    this.pauseBtnColour = pauseBtnColour || this.Exception('Expected a string');
    this.forwardBtnColour =
      forwardBtnColour || this.Exception('Expected a string');
    this.backwardBtnColour =
      backwardBtnColour || this.Exception('Expected a string');
    this.videoTag =
      document.querySelector('.src-video') ||
      document.getElementsByClassName('src-video')[0];
    this.seekTrack =
      document.querySelector('.seek-slider') ||
      document.getElementsByClassName('seek-slider')[0];
    console.log(this.seekTrack);
    this.playBtn =
      document.querySelector('.play') ||
      document.getElementsByClassName('play')[0];
    this.pauseBtn =
      document.querySelector('.pause') ||
      document.getElementsByClassName('pause')[0];
    this.loaderAnimation =
      document.querySelector('.loader-animation') ||
      document.getElementsByClassName('loader-animation')[0];
    this.currentDuration =
      document.querySelector('.currentDuration') ||
      document.getElementsByClassName('currentDuration')[0];
    this.totalDuration =
      document.querySelector('.totalDuration') ||
      document.getElementsByClassName('totalDuration')[0];
    this.forward =
      document.querySelector('.forward') ||
      document.getElementsByClassName('forward')[0];
    this.backward =
      document.querySelector('.backward') ||
      document.getElementsByClassName('backward')[0];
    this.muteBtn =
      document.querySelector('.mute') ||
      document.getElementsByClassName('mute')[0];
    this.Container =
      document.querySelector('.video-container') ||
      document.getElementsByClassName('video-container')[0];
    this.controlsContainer =
      document.querySelector('.controls') ||
      document.getElementsByClassName('controls')[0];
    this.mobileControls =
      document.querySelector('.mobile-controls') ||
      document.getElementsByClassName('mobile-controls')[0];
    this.rotateBtn =
      document.querySelector('.rotate') ||
      document.getElementsByClassName('rotate')[0];
    this.setListener();
  }
  Exception(exp) {
    throw new Error(exp);
  }
  setListener() {
    this.videoTag.addEventListener(
      'timeupdate',
      this.videoSeekUpdate.bind(this)
    );
    this.videoTag.addEventListener(
      'timeupdate',
      this.videoDurationUpdate.bind(this)
    );
    this.videoTag.addEventListener('loadstart', (e) => {
      this.loaderAnimation.style.display = 'block';
    });
    this.videoTag.addEventListener('canplay', (e) => {
      let totalsec = Math.floor(Math.floor(this.videoTag.duration) % 60);
      let totalmin = Math.floor(this.videoTag.duration / 60) % 60;
      console.log(totalmin);
      let hours = Math.floor(this.videoTag.duration / 3600);
      this.seekTrack.max = Math.floor(this.videoTag.duration);
      this.seekTrack.step = '1';

      this.totalDuration.innerText = `${
        Math.abs(hours) <= 9 ? '0' + Math.abs(hours) : Math.abs(hours)
      }:${
        Math.abs(totalmin) <= 9 ? '0' + Math.abs(totalmin) : Math.abs(totalmin)
      }:${
        Math.abs(totalsec) <= 9 ? '0' + Math.abs(totalsec) : Math.abs(totalsec)
      }`;
    });
    this.videoTag.addEventListener('canplay', (e) => {
      this.loaderAnimation.style.display = 'none';
    });
    this.playBtn.addEventListener('click', (e) => {
      this.videoTag.play();
    });
    this.pauseBtn.addEventListener('click', (e) => {
      this.videoTag.pause();
    });
    this.seekTrack.addEventListener('input', (e) => {
      this.videoTag.currentTime = e.target.value;
      this.seekTrack.style.backgroundImage = `linear-gradient(to left,rgb(84 80 80) 0% ${Math.abs(
        (parseInt(this.seekTrack.value) / parseInt(this.seekTrack.max)) * 100 -
          100
      )}%,rgba(172, 19, 19, 0.685) 0% ${
        (parseInt(this.seekTrack.value) / parseInt(this.seekTrack.max)) * 100
      }%)`;
    });
    this.forward.addEventListener('click', (e) => {
      this.videoTag.currentTime = this.videoTag.currentTime + 10;
    });
    this.backward.addEventListener('click', (e) => {
      this.videoTag.currentTime = this.videoTag.currentTime - 10;
    });
    this.muteBtn.addEventListener('click', (e) => {
      if (this.videoTag.muted) {
        this.videoTag.muted = false;
      } else {
        this.videoTag.muted = true;
      }
    });
    this.videoTag.addEventListener('dblclick', (e) => {
      console.log(document.fullscreenElement);
      if (!document.fullscreenElement) {
        this.Container.requestFullscreen();
        this.controlsContainer.classList.add('fullscreen');
        this.mobileControls.classList.add('fullscreen');
      } else {
        this.controlsContainer.classList.remove('fullscreen');
        this.mobileControls.classList.remove('fullscreen');
        document.exitFullscreen();
      }
    });
    document.addEventListener('fullscreenchange', (e) => {
      if (document.fullscreenElement == null) {
        this.controlsContainer.classList.remove('fullscreen');
        document.exitFullscreen();
      }
    });
    this.rotateBtn.addEventListener('click', (e) => {
      screen.orientation.lock('landscape');
    });
  }
  videoSeekUpdate(e) {
    this.seekTrack.value = Math.floor(e.target.currentTime);
    this.seekTrack.style.backgroundImage = `linear-gradient(to left,rgb(84 80 80) 0% ${Math.abs(
      (parseInt(this.seekTrack.value) / parseInt(this.seekTrack.max)) * 100 -
        100
    )}%,rgba(172, 19, 19, 0.685) 0% ${
      (parseInt(this.seekTrack.value) / parseInt(this.seekTrack.max)) * 100
    }%)`;
  }
  videoDurationUpdate(e) {
    let totalsec = Math.floor(Math.floor(this.videoTag.currentTime) % 60);
    let totalmin = Math.floor(this.videoTag.currentTime / 60) % 60;

    let hours = Math.floor(this.videoTag.currentTime / 3600);
    this.currentDuration.innerText = `${
      Math.abs(hours) <= 9 ? '0' + Math.abs(hours) : Math.abs(hours)
    }:${Math.abs(totalmin) <= 9 ? '0' + Math.abs(totalmin) : Math.abs(totalmin)}:${
      Math.abs(totalsec) <= 9 ? '0' + Math.abs(totalsec) : Math.abs(totalsec)
    }`;
  }
}
let player = new VideoPlayer({
  playBtnColur: 'red',
  pauseBtnColour: 'red',
  forwardBtnColour: 'red',
  backwardBtnColour: 'red',
});
