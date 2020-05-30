const namePlace=document.getElementById("namePlace");
const mobPlace=document.getElementById("mobPlace");
const balPlace=document.getElementById("balPlace");
const pbBal=document.getElementById("pbBal");
const level=document.getElementById("level");
const loader=document.getElementById("loader");
const userData=document.getElementById("userData");
const btnWithDraw=document.getElementById("withdraw");

const tasker=document.getElementById("tasker");
const t1s=document.getElementById("t1s");
const t2s=document.getElementById("t2s");
const t3s=document.getElementById("t3s");

var name,mobile,bal,t1,t2,t3;

mobile=(getCookie("mobile"));
if(mobile.length!=10)
{
  location.href="index.html";
}


btnWithDraw.addEventListener("click",function()
{

  alert("Your Balece is : ₹ "+bal+"\n Please Complete All The Tasks To Withdraw Money");

});


loadUser();

function loadUser()
{
    return firebase.database().ref('users').child(mobile).once('value').then(function(snapshot) 
    {
        name = (snapshot.val() && snapshot.val().N) || 'unknown';
        bal = (snapshot.val() && snapshot.val().B) || 'unknown';
        t1 = (snapshot.val() && snapshot.val().TS1) || 'unknown';
        t2 = (snapshot.val() && snapshot.val().TS2) || 'unknown';
        t3 = (snapshot.val() && snapshot.val().TS3) || 'unknown';
        namePlace.innerHTML=name;
        mobPlace.innerHTML=mobile;
        balPlace.innerHTML=bal;
        if(t1=="0"){t1s.innerHTML="Pending"}else{t1s.innerHTML="Completed"}
        if(t2=="0"){t2s.innerHTML="Pending"}else{t2s.innerHTML="Completed"}
        if(t3=="0"){t3s.innerHTML="Pending"}else{t3s.innerHTML="Completed"}

        loader.style.display="none";
        tasker.style.display="block";
        userData.style.display="block";
        level.style.width=bal+"%";
        pbBal.innerHTML=bal;
        if(t1=="1"&&t2=="1"&&t3=="1"){tasker.style.display="none";}
    
    });
}







function getCookie(cname) 
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
