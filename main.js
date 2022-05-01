Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90

});
camera=document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="snapshot" src="'+data_uri+'">';
    });
}
console.log("ml5version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/boZHTFbff/model.json",modelLoaded);
function modelLoaded(){
    console.log("model is loaded!");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_Data1="The prediction is"+prediction1;
    
    var utterIs=new SpeechSynthesisUtterance(speak_Data1);
    synth.speak(utterIs);
}
function predictEmotion(){
    img=document.getElementById("snapshot");
    classifier.classify(img,gotResult);

}
function gotResult(error,results){
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak()
        if(results[0].label=="happy")
        {
            document.getElementById("emoji").innerHTML="&#128522;";
        }
        if(results[0].label=="sad")
        {
            document.getElementById("emoji").innerHTML="&#128532;";
        }
        if(results[0].label=="angry")
        {
            document.getElementById("emoji").innerHTML="&#128548;";
        }
    }
}