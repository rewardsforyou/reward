const fullName=document.getElementById("fullName");
const mobileNumber=document.getElementById("mobileNo");
const refererNumber=document.getElementById("refererNo");
const loader=document.getElementById("loader");
const btnCreate=document.getElementById("createAccount");


loader.style.visibility="hidden";
btnCreate.addEventListener("click",function()
{
    var name,mobile,referer,error_msg="";
    name=fullName.value.trim();
    mobile=mobileNumber.value.trim();
    referer=refererNumber.value.trim();
    if(name.length<2){error_msg+="\nInvalid Name";}
    if(name.length!=10){error_msg+="\n\nEnter Valid 10 Digit Mobile Number";}
    if(referer.length!=10){referer="";}
    if(name.length>=3&&mobile.length==10)
    {
        loader.style.visibility="visible";
        btnCreate.innerHTML="Please Wait....";
        var userRef=firebase.database().ref("users/");
        userRef.once('value', function(snapshot) 
        {
            if (snapshot.hasChild(mobile))
            {
              alert('Account Already Exist !. Click Login');
              loader.style.visibility="hidden";
              btnCreate.innerHTML="Create Account";
            }
            else
            {
                firebase.database().ref('users/' + mobile).set({
                    N: name,
                    M: mobile,
                    B : "10",
                    TS1:"0",
                    TS2:"0",
                    TS3:"0",
                    R:referer
                  },
                  function(error)
                  {
                    if(error)
                    {
                        alert("Something went wrong , Try After Some Time");
                    }
                    else
                    {
                        document.cookie="mobile="+mobile;
                        location.href="main.html";
                    }
                  });
            }
          });
        
    }
    else
    {
        alert(error_msg);
    }
});

function getCookie(cname) {
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

