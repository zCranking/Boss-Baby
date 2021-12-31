Status = "";
objects = "";
function back(){
    history.back();
}
function preload(){
    img = loadImage('baby_image.jpg');
    alarm = loadSound('sound.mp3');
}
function setup(){
    canvas = createCanvas(700, 600);
    canvas.position(600, 260);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("model loaded");
    Status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(img, 0, 0, 800, 700);
    if(Status != ""){
        for(var i=0; i<objects.length; i++){
            z = i + 1;
            document.getElementById("status").innerHTML = "Status: Detected. I have found " + z + " objects . Out of 1 possible objects.";
            confidence = floor(objects[i].confidence * 100);
            fill("#F49D37");
            textSize(20);
            text(objects[i].label + " " + confidence + "%", objects[i].x-280, objects[i].y - 10);
            noFill();
            stroke("#F49D37");
            rect(objects[i].x-300, objects[i].y-50, objects[i].width, objects[i].height);
        }
        if(objects[0].label != "person"){
            alarm.play();
            alarm.setVolume(0.5);
            song.rate(1);
        }
    }
}