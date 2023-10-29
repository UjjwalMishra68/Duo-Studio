const loco = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

}
loco()
const cursor = new MouseFollower();
Shery.makeMagnet(".magnet");

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        scrub: 2,
        start: "top 30%",
        end: " top 0",
    }
});
tl.to(".page1Content_container h1", {
    duration: 2,
    x: -200,
}, "page1text_anime")

tl.to(".page1Content_container h2", {
    x: 200,
    duration: 2,
}, "page1text_anime")

tl.from(".page1Content_container video", {
    scale: 0,
    duration: 2,
}, "page1text_anime")
tl.to(".page1Content_container h4", {
    opacity: 0,
}, "page1text_anime")

const tl2 = gsap.timeline()
tl2.to(".main", {
    backgroundColor: "white",
    color: "black",
    scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        start: "top 20%",
        end: "top 30%",
        scrub: 2,
    }
})
tl2.from(".page2_right img", {
    opacity: 0,
    x: -250,
    duration: 2.5,
    scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        scrub: 1,
        start: "top 20%",
        end: "top 10%"
    }
})
