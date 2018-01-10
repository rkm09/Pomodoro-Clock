var wk = 25,
    br = 5,
    cnt = 1,
    flag = 0,
    time;
var mn = 1,
    sc = 0,
    ds = "",
    go = 0,
    gow = 1,
    first = true;
var wks = "25",
    brs = "05",
    dragging = false,
    iX,
    oX;
var cl_wk = "#00cc44";
//--timer begins--------------------
function timer() {
  $("#slider").hide();
  $("#slider2").hide();
  time = setInterval(function () {
    //console.log("dd");      
    if (first === false) {
      //single digit additions
      var scs = "",
          mns = "";
      //------------------
      if (mn < 10) mns = "0" + mn;else mns = mn + "";
      if (sc < 10) scs = "0" + sc;else scs = sc + "";
      //-----string display------//
      ds = mns + ":" + scs;
      if (sc === 0) {
        if (flag === 1 || gow === 0) {
          $("#break,#val").css("color", "crimson");
          $("#work").css("color", "#006622");
          $("#tom").css("box-shadow", "0 0 3rem crimson inset");
          $("#work").html("WORK");
          $("#break").html("&hearts; BREAK &hearts;");
          flag = 0;
        } else if (flag === 2 || gow === 1) {
          $("#work,#val").css("color", cl_wk);
          $("#break").css("color", "#5d091a");
          $("#tom").css("box-shadow", "0 0 3rem" + cl_wk + " inset");
          $("#work").html("&hearts; WORK &hearts;");
          $("#break").html("BREAK");
          flag = 0;
        }
      }
      //-----display------------//
      $("#val").html(ds);
      //---------------------------
      if (mn === 0 && sc === 0 && gow === 1) {
        mn = br;flag = 1;gow = 0;
        var aud = document.getElementById("aud");
        aud.play();
      } else if (mn === 0 && sc === 0 && gow === 0) {
        mn = wk;flag = 2;gow = 1;
        var aud = document.getElementById("aud");
        aud.play();
      }
    } //not first
    //change to 59 on 0
    if (sc === 0 & flag === 0) {
      mn--;sc = 59;
    } else if (sc !== 0 & flag === 0) sc--;
    //console.log(sc+" kk");
    first = false;
  }, 1000);
}
//--jquery document ready------------//
$(document).ready(function () {
  //----------val btn click----------//  
  $("#val").on("click", function () {
    if (go === 1) {
      go = 0;pause();
    } else if (go === 0) {
      go = 1;start();
    }
  }); // val btn end

  //---settings: work click-------//
  $("#work").on("click", function () {
    go = 0; // for val toggle
    pause();
    $("#slider").show();
    $("#val").text(wks + ":00"); //display last set val
    $("#work,#val").css("color", cl_wk);
    $("#work").html("&hearts; WORK &hearts;");
    $("#break").html("BREAK");
    $("#break").css("color", "#5d091a");
    $("#tom").css("box-shadow", "0 0 3rem" + cl_wk + " inset");
    $("#slider2").hide();
    sc = 0;mn = wk; //reset
    gow = 1; // type tracking
  });
  //------------------------------//  

  //---settings: break click------//
  $("#break").on("click", function () {
    go = 0;pause();
    $("#slider2").show();
    $("#val").text(brs + ":00");
    $("#break,#val").css("color", "crimson");
    $("#break").html("&hearts; BREAK &hearts;");
    $("#work").html("WORK");
    $("#work").css("color", "#006622");
    $("#slider").hide();
    $("#tom").css("box-shadow", "0 0 3rem crimson inset");
    sc = 0;mn = br; //reset
    gow = 0;
  });
  //------------------------------//
  $("#work").hover(function (e) {
    if (gow === 0) $(this).css("color", e.type === "mouseenter" ? "#00cc44" : "#006622");
  });
  $("#break").hover(function (e) {
    if (gow === 1) $(this).css("color", e.type === "mouseenter" ? "crimson" : "#5d091a");
  });
}); //----jquery ready end-----//

//-------fns----------------------------//
function start() {
  if (first === true) {
    mn = wk;
    $("#work").html("&hearts; WORK &hearts;");
    $("#break").html("BREAK");
    $("#val").html("" + mn + ":00");
    $("#val").css({ "color": cl_wk, "font-size": "2.3rem", "letter-spacing": ".2rem" });
    $("#tom").css("box-shadow", "0 0 3rem" + cl_wk + " inset");
  }
  timer();
} //end of start()
function pause() {
  clearInterval(time);
}
//--------------------------------------//
function update() {
  var k = $("#ss").val();
  $("#s2").html("Value: " + k);
  if (gow === 1) {
    wk = k;mn = wk;flag = 2;
  } else if (gow === 0) {
    br = k;mn = br;flag = 1;
  }
  sc = 0;
}
//--------slider movement capture--------------//

$("#s11,#s22").mousedown(function (e) {
  dragging = true;
  iX = e.clientX - this.offsetLeft;
  this.setCapture && this.setCapture();
  return false;
});
$(document).mouseup(function (e) {
  dragging = false;
  $("#s11,#s22").releaseCapture();
  if (e.stopPropogation) e.stopPropagation();else e.cancelBubble = true;
});
document.onmousemove = function (e) {
  if (dragging) {
    oX = e.clientX - iX;
    if (oX < 0) oX = 0;else if (oX > 300) oX = 300;
    console.log(oX + "---ox");
    if (gow === 1) $("#s11").css({ "left": oX + "px" });else if (gow === 0) $("#s22").css({ "left": oX + "px" });
    sliderSet(); //map to desired
    return false;
  }
};
function sliderSet() {
  var o = [0, 300];
  var n = [1, 60];
  var val = oX;
  var v = (val - o[0]) * (n[1] - n[0]) / (o[1] - o[0]) + n[0];
  v = Math.round(v);
  console.log(v);
  if (gow === 1) {
    wk = v;
    mn = wk;
    sc = 0;
    wks = "";
    if (wk < 10) wks = "0" + wk;else wks = "" + wk;
    $("#val").text(wks + ":00");
  } else if (gow === 0) {
    br = v;
    mn = br;
    sc = 0;
    brs = "";
    if (br < 10) brs = "0" + br;else brs = "" + br;
    $("#val").text(brs + ":00");
  }
}
//--------slider settings end--------------//