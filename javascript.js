var currentCircle = 0;
var cantoDisplayList = ["1-2","3","3","4","5","6","7","7-8","8","9","10-11","12","12-17",
"12","13","14-17","18-31","18","18","19","20","21-22","23","24-25","26-27","28","29-30","31-34","32-33","33","33","33","34"];

$(".circle").each(function(index) {
  var percentage = 100-1.5*index;
  $(this).css("width",percentage+'%');
});

$(document).ready(function() {
  $(".order" + currentCircle).css("display","block");
  $("#cantoDisplay").text("Canto " + cantoDisplayList[currentCircle]);
});

$("#upButton").click(function() {
  console.log("up");
  console.log(currentCircle);
  currentCircle -= 1;
  currentCircle = currentCircle < 0 ? 0 : currentCircle;
  $(".order" + currentCircle).slideDown( "slow", function() {});
  $(".order" + (currentCircle + 1)).slideUp( "slow", function() {});
  $("#cantoDisplay").text("Canto " + cantoDisplayList[currentCircle]);
});

$("#downButton").click(function() {
  console.log("down");
  console.log(currentCircle);
  currentCircle += 1;
  currentCircle = currentCircle >= 32 ? 32 : currentCircle;
  $(".order" + (currentCircle - 1)).slideUp( "slow", function() {});
  $(".order" + currentCircle).slideDown( "slow", function() {});
  $("#cantoDisplay").text("Canto " + cantoDisplayList[currentCircle]);
});

$("#beginButton").click(function() {
  console.log("test");
  $("#wrapper").css("display", "block");
  $("#header").css("display", "none");
});

$("#cantoInput").change(function(){
  var wrapChild = $("#wrapper")[0].children;
  var cantoVal = $("#cantoInput").val();
  console.log(cantoVal);
  console.log(parseInt(cantoVal));
  for(var i = 0; i < wrapChild.length; i++) {
    if($(wrapChild[i]).attr("canto") !== undefined) {
      var cantoArr = JSON.parse($(wrapChild[i]).attr("canto"));
      if(cantoArr.includes(parseInt(cantoVal))) {
        console.log("Array:", cantoArr);
        var foundClasses = $(wrapChild[i]).attr("class").split(/\s+/);
        for(var j = 0; j < foundClasses.length; j++) {
          if(foundClasses[j].substring(0,5) === "order") {
            updateLayer(foundClasses[j].substring(5,foundClasses[j].length));
          } 
        }
      }
    }
  }
})

function updateLayer(circleIndex) {
  if(currentCircle === parseInt(circleIndex)) {
    return;
  }
  $(".order" + (currentCircle)).slideUp( "slow", function() {});
  $(".order" + circleIndex).slideDown( "slow", function() {});
  currentCircle = parseInt(circleIndex);
  $("#cantoDisplay").text("Canto " + cantoDisplayList[currentCircle]);
  console.log(currentCircle);
}

var images = new Array()
function preload() {
  for (var i = 0; i <= 24; i++) {
    images[i] = new Image()
    images[i].src = "images/img"+ i +".png";
  }
}
preload();
