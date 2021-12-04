var song1 = "";
var song2 = "";
var leftWristX = 0;
var rightWristX = 0;
var leftWristY = 0;
var rightWristY = 0;
var scoreLeftWristY = 0;
var scorerightWristY = 0;
var song1_status = "";
var song2_status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}


function setup()
{
    canvas = createCanvas(550, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}
function modelLoaded()
{
    console.log("Posenet is Initialized!")
}

function draw()
{
    image(video, 0, 0, 550, 450);
 
    song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWristY > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "song1 is now playing";
        }
    }
    if(scorerightWristY > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "song2 is now playing";
        }
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWristY = results[0].pose.keypoints[9].score;
        scorerightWristY = results[0].pose.keypoints[10].score;
        console.log("scoreleftWristY is " + scoreleftWristY + " and " + "scorerightWristY is " + scorerightWristY)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX is "+ leftWristX + " LeftWristY is "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX is "+ rightWristX + " RightWristY is "+ rightWristY);
    }
}

