resize();
highlightScroll();
cursorIncreaseAnimationSpeed();

//mobile navbar
function openNavbar(){
    var menu = document.getElementById("navHeader");
    var width = 640;

    if (window.innerWidth <= width) {
        if(menu.style.display === "none" || menu.style.display === ""){
            menu.style.display= "block";
        }
        else {
            menu.style.display = "none";
        }
    }
}

function resize(){
    // if close menu bar, and then resize to bigger window, navbar would be gone, make it when resize = make sure navbar exists
    var menu = document.getElementById("navHeader");
    var width = 640;
    window.addEventListener("resize", () => {
     if (window.innerWidth >= width) {
        menu.style.display = "block";
        }
 }); 
}

//closes navbar when click on link(mobile)
function clickClose(){
    var menu = document.getElementById("navHeader");
    var width = 640;

    if(window.innerWidth <= width){
        menu.style.display = "none";
    }

}

document.addEventListener("DOMContentLoaded", ()=>{
    var navLink = document.querySelectorAll("#navHeader");
    navLink.forEach(link =>{
        link.addEventListener("click", clickClose);
    })
})

//function: scroll speed impact animation speed
function cursorIncreaseAnimationSpeed(){
    const video = document.getElementById("backgroundAnimated");
    window.addEventListener("mousemove", ()=>{
        video.playbackRate = 3;
    }) 
    window.addEventListener("mousestop", ()=>{
        video.playbackRate = 1.0;
    })
}

(function (mouseStopDelay) {
    var timeout;
    document.addEventListener('mousemove', function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            var event = new CustomEvent("mousestop", {
                detail: {
                    clientX: e.clientX,
                    clientY: e.clientY
                },
                bubbles: true,
                cancelable: true
            });
            e.target.dispatchEvent(event);
        }, mouseStopDelay);
    });
}(10));

//function: highlight button as scroll through section
function highlightScroll()
{
    const navLinkElm = document.querySelectorAll('.navLink');
    const sectionElm = document.querySelectorAll('.section');

    let currentSection = 'home';
    window.addEventListener('scroll', () => {
        sectionElm.forEach(sectionElement => {
            if (window.scrollY >= sectionElement.offsetTop - 150) {
                currentSection = sectionElement.id;
            }
        });

        navLinkElm.forEach(navLinkElement => {
            if (navLinkElement.href.includes(currentSection)) {
                const activeElm = document.querySelector('.active');
                if (activeElm) {
                    activeElm.classList.remove('active');
                }
                navLinkElement.classList.add('active');
            }
        });
    });
}