const mainContainer=document.getElementById("main-container");
const currentSong=document.getElementById("currentsong");
const progress=document.getElementById("progress");
const progressBar=document.getElementById("progress-bar");
const audio=document.getElementById("audio");
const albumArt=document.getElementById("album-art");
const previousBtn=document.getElementById("previous");
const palyBtn=document.getElementById("play");
const nextBtn=document.getElementById("next");


// Create an Track Array which song curretnly we are listining
const tracks=["Ertugrul", "National Anthem"];


// Index of Currently Play Song
let trackIndex=1;


// Load the initial track
loadTrack(tracks[trackIndex]);

// Function to load the selected track
function loadTrack(track){
    // Update the text of title of track
    currentSong.innerText=track
    // Update the audio src via track
    audio.src=`music/${track}.mp3`
    // Update the Image of the misc via track
    albumArt.src=`images/${track}.jpeg`
}


// Make the playMusic function 
function playtrack(){
    // Add the class of 'play' in maincontainer
    mainContainer.classList.add('play');
    // add the icon of pause instead of play reverse condition applies here
    palyBtn.innerHTML='<i class="fas fa-pause"></i>';
    // add the play() function
    audio.play();  
}
// make the pause function
function pausetrack(){
    // Remove the class of 'play' in  mainconatiner
    mainContainer.classList.remove('play');
    // add the icon of play insetad of pause  reverse condition applies here
    palyBtn.innerHTML='<i class="fas fa-play"></i>';
    // add the pause() function
    audio.pause();
}


// Prevous Button Function swicth to prevous music
function previousMus(){
    // Do The Decrement value of trackIndex by 1 and select the previous track from the track Array
     trackIndex--
     //make the condition if the trackIndex is less than 0 then we shift on last Music 
     if(trackIndex < 0){
        //  set the last index value 
       trackIndex=tracks.length -1 
     }
    //  console.log(trackIndex);
   //update the our function
   loadTrack(tracks[trackIndex])   
   //    play the selected track
   playtrack();
}

// next Button function to swicth to another music
function nextMus(){
    // Do the Incremnt in tackInd
    trackIndex++
    if(trackIndex > tracks.length -1){
      trackIndex= 0
    } 
    loadTrack(tracks[trackIndex]);
    playtrack();

}
function audioUpdate(e){
    // We get the audio element
    // console.log(e.srcElement);
    // Destructure the object value and assign to the const
    const {duration, currentTime}=e.srcElement;
    //calculate the duration in percantage wise and get 0 to 100 value
    const progressPercantage= currentTime / duration* 100;
    // increase the width of progress-bar in terms of percnatage wise
    progressBar.style.width=`${progressPercantage}%`;     
}
function updateTime(e){
    // get the over all width of container in px / progress bar contianer px
    const overAllWidth=this.clientWidth;
    // get the x axis value in px of current location of the progress bar container
    const clickLocation=e.offsetX;
    // get the  totalduration of audio
    const audioDuration=audio.duration;
    // console.log(audioDuration); 
    audio.currentTime= clickLocation / overAllWidth * audioDuration;
}

// PlayBtn addEventListener
palyBtn.addEventListener('click',() =>{

// Check if this played or not
const isPlaying=mainContainer.classList.contains("play");
//    condition statment base on status on audio back
if(isPlaying){
    pausetrack()
}else{
   playtrack()
}
})

// All EventListener();
// PervoiusBtn
previousBtn.addEventListener('click', previousMus);
// NextBtn
nextBtn.addEventListener('click', nextMus)
// progressvbar update
audio.addEventListener("timeupdate", audioUpdate)
// add another event when we click on progress it shoudl show the current duration of music
progress.addEventListener('click', updateTime);
// add another event listener when ended music call another music
audio.addEventListener('ended',nextMus)