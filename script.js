// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var mousecircle = document.querySelector("#mouse-circle");

window.addEventListener("mousemove",(dets)=>{
    mousecircle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
    // console.log(dets)
})

var tl = gsap.timeline();

tl.from("nav",{
    y:-50,
    duration:0.8,   
    opacity:0,
})

tl.from(".heromain div",{
    x:150,
    opacity:0,
    stagger:-0.4
})

tl.from(".right-heromain h4",{
    y:50,
    opacity:0,
    stagger:0.2
})

// gsap.from("#about .elem",{
//     y:100,
//     opacity:0,
//     stagger:0.3,
//     scrolltrigger:{
//         trigger:"#about",
//         scroller:"#main",
//         markers:true,
//         start:"top 50%",
//         end:"top -10%",
//         scrub:true
//     }
// })

 let hoverCard  = document.querySelectorAll(".elem");

 hoverCard.forEach((e)=>{
    var rotate = 0;
    var diff = 0;

    e.addEventListener("mouseenter",()=>{
        gsap.to(e.childNodes[1],{
            display:"block",
            scale:1
        })
    })

    e.addEventListener("mouseleave",()=>{
        gsap.to(e.childNodes[1],{
            display:"none",
            scale:0
        })
    })
    e.addEventListener("mousemove",(dets)=>{
        diff = dets.clientX -rotate;
        rotate = dets.clientX
        
        gsap.to(e.childNodes[1],{
            ease:Power3,
            x:dets.x, 
            y:dets.y -e.getBoundingClientRect().y.top,
            rotate:gsap.utils.clamp(-20,20,diff*0.5)
        })
    })
 })