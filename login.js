
const mobileNumber=document.getElementById("mobileNo");
const loader=document.getElementById("loader");
const btnCreate=document.getElementById("loginAccount");



loader.style.visibility="hidden";
btnCreate.addEventListener("click",function()
{
    var mobile=mobileNumber.value;
    if(mobile.length==10)
    {
        loader.style.visibility="visible";
        btnCreate.innerHTML="Please Wait...";   
        var userRef=firebase.database().ref("users/");
        userRef.once('value', function(snapshot) 
        {
            if (snapshot.hasChild(mobile))
            {
                document.cookie="mobile="+mobile;
                location.href="main.html";
            }
            else
            {
                alert('Account Not Exist !. Click Create Account');
                loader.style.visibility="hidden";
                btnCreate.innerHTML="Login";    
            }
        });
    }
    else
    {
        alert("Invalid Mobile Number");
    }
});
