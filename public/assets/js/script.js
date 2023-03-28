var trigger = false;

function openMenu() {  //Function to open/close the menu on mobile


        if(trigger==false) //open menu
        {
            document.getElementById("nav").style.height = "auto";
            document.getElementById("nav").style.display = "block";
            trigger=true;
        }
        else //close menu
        {
            document.getElementById("nav").style.height = "0px";
            document.getElementById("nav").style.display = "none";
            trigger=false;
        }

        //console.log(trigger);
  }

  window.addEventListener("resize", (event) => { //listens to window resize to to be able to reset the trigger boolean. also to prevent the nav to be hidden on desktop

    var browserWidth = window.innerWidth;
    
    if(browserWidth>=768)
    {
        document.getElementById("nav").style.height = "auto";
        document.getElementById("nav").style.display = "block";
        trigger=true;
    }

    else
    {
        document.getElementById("nav").style.height = "0px";
        document.getElementById("nav").style.display = "none"; 
        trigger=false;

    }
    //console.log(trigger);

  });

  