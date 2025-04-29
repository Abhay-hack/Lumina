var tl = gsap.timeline()
tl.from("#nav .icon",{
    opacity:0,
    delay:1,
    duration:1,
    y:-30
})
tl.from("#right a",{
    opacity:0,
    duration:1,
    y:-30,
    stagger:0.3
})