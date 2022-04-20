song = "";
score_left = 0;
score_right = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Model loaded!");
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');

    if (score_right > 0.20) {
        circle(rightWristX, leftWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
        }
        if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed = 1x";
        }
        if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
        }
        if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "Speed = 2x";
        }
        if (rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
        }
    }
    if (score_left > 0.20) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        left_y = floor(InNumberleftWristY);
        volume = left_y / 500;
        document.getElementById("volume").innerHTML = volume;
        song.setVolume(volume);
    }

}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_left = results[0].pose.keypoints[9].score;
        score_right = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(leftWristX, leftWristY, rightWristX, rightWristY);
    }
}