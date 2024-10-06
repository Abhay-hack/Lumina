document.addEventListener("DOMContentLoaded", function() {
  if (typeof Shery !== 'undefined') {
      Shery.mouseFollower();
      Shery.makeMagnet(".magnet");
      Shery.hoverWithMediaCircle(".hvr", {
        videos: ["/image/0.mp4", "/image/2.mp4", "/image/3.mp4"],
      });

      gsap.to(".fleftelm", {
          scrollTrigger: {
              trigger: "#fimages",
              pin: true,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
          },
          y: "-300%",
          ease: "power1.out",
      });

      let sections = document.querySelectorAll(".fleftelm");
      Shery.imageEffect(".images", {
          style: 4,
          config: { onMouse: { value: 1 } },
          slideStyle: (setScroll) => {
              sections.forEach(function (section, index) {
                  ScrollTrigger.create({
                      trigger: section,
                      start: "top top",
                      scrub: 1,
                      onUpdate: function (prog) {
                          setScroll(prog.progress + index);
                      },
                  });
              });
          },
      });
  } else {
      console.error("Shery is not defined.");
  }
});

document.addEventListener("DOMContentLoaded", function() {
    var faqQuestions = document.getElementsByClassName("faq-question");

    for (var i = 0; i < faqQuestions.length; i++) {
        faqQuestions[i].addEventListener("click", function() {
            this.classList.toggle("active");

            var answer = this.nextElementSibling;
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        });
    }
});