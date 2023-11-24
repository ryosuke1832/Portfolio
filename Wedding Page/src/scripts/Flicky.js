// Flickityを初期化
var elem = document.querySelector(".carousel");
var flkty = new Flickity(elem, {
  cellAlign: "left",
  contain: true,
  initialIndex: 1,
  pageDots: false,
});

function loadParticipantData(participantId) {
  localStorage.setItem("participantId", participantId);
}

/* ーーーーーーーーーーーーーー　紙吹雪 ページ3　ーーーーーーーーーーーーーーーーー*/

document.addEventListener("DOMContentLoaded", function () {
  let hasSlideInOccurred = false;

  flkty.on("change", function (index) {
    var rightImageSlide = document.querySelector(".right-image-slide");

    if (index === 2) {
      if (!hasSlideInOccurred) {
        rightImageSlide.style.right = "0%";
        rightImageSlide.addEventListener(
          "transitionend",
          function () {
            startConfettiAnimation();
            hasSlideInOccurred = true;
          },
          { once: true }
        );
      } else {
        setTimeout(startConfettiAnimation, 500);
      }
    }
  });
});

function startConfettiAnimation() {
  const container = document.getElementById("confetti-container-right");
  const maxConfettiCount = 1000;
  let generatedConfettiCount = 0;

  const generateConfetti = () => {
    if (generatedConfettiCount >= maxConfettiCount) return;

    const confetti = document.createElement("div");
    confetti.className = "confetti-right";
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.right = `105px`;
    confetti.style.bottom = `85px`;
    confetti.style.animationDelay = `-${Math.random() * 15}s`;
    confetti.style.animationDuration = `${1 + Math.random() * 2}s`; // アニメーション時間を短縮
    confetti.style.animationName = "shootFall";
    confetti.style.animationTimingFunction = "linear";
    const angle = 170 + Math.random() * 120;
    const radian = (angle * Math.PI) / 180;
    confetti.style.setProperty("--angle", `${angle}deg`);
    confetti.style.setProperty("--cos", Math.cos(radian));
    confetti.style.setProperty("--sin", Math.sin(radian));
    container.appendChild(confetti);

    generatedConfettiCount++;
  };

  for (let i = 0; i < maxConfettiCount; i++) {
    generateConfetti();
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/* ーーーーーーーーーーーーーー　紙吹雪 ページ1　ーーーーーーーーーーーーーーーーー*/

document.addEventListener("DOMContentLoaded", function () {
  let hasSlideInOccurreLeft = false;

  flkty.on("change", function (index) {
    var leftImageSlide = document.querySelector(".left-image-slide");

    if (index === 0) {
      if (!hasSlideInOccurreLeft) {
        leftImageSlide.style.left = "0%";
        leftImageSlide.addEventListener(
          "transitionend",
          function () {
            startConfettiAnimationleft();
            hasSlideInOccurreLeft = true;
          },
          { once: true }
        );
      } else {
        setTimeout(startConfettiAnimationleft, 500);
      }
    }
  });
});

function startConfettiAnimationleft() {
  const containerleft = document.getElementById("confetti-container-left");
  const maxConfettiCountleft = 1000;
  let generatedConfettiCountleft = 0;

  const generateConfettiLeft = () => {
    if (generatedConfettiCountleft >= maxConfettiCountleft) return; // 修正

    const confettileft = document.createElement("div");
    confettileft.className = "confetti-left";
    confettileft.style.backgroundColor = getRandomColor();
    confettileft.style.left = `105px`;
    confettileft.style.bottom = `85px`;
    confettileft.style.animationDelay = `-${Math.random() * 15}s`;
    confettileft.style.animationDuration = `${1 + Math.random() * 2}s`;
    confettileft.style.animationName = "shootFall";
    confettileft.style.animationTimingFunction = "linear";
    const angle = 250 + Math.random() * 120;
    const radian = (angle * Math.PI) / 180;
    confettileft.style.setProperty("--angle", `${angle}deg`);
    confettileft.style.setProperty("--cos", Math.cos(radian));
    confettileft.style.setProperty("--sin", Math.sin(radian));
    containerleft.appendChild(confettileft); // 修正

    generatedConfettiCountleft++;
  };

  for (let i = 0; i < maxConfettiCountleft; i++) {
    generateConfettiLeft();
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("DOMContentLoaded", function () {
  function setupCirclePopup(circleSelector, popupSelector) {
    const circles = document.querySelectorAll(circleSelector);

    circles.forEach((circle) => {
      const popup = circle.querySelector(popupSelector);
      if (popup) {
        circle.addEventListener("click", function (e) {
          // Prevents the body click event from hiding the popup immediately
          e.stopPropagation();

          // Hide all other popups
          const allPopups = document.querySelectorAll(
            ".popup-left, .popup-right"
          );
          allPopups.forEach((p) => (p.style.display = "none"));

          // Toggle the clicked circle's popup
          popup.style.display =
            popup.style.display === "none" ? "block" : "none";
        });
      }
    });

    // Close popup if clicked outside the circle
    document.body.addEventListener("click", function (e) {
      if (isAnyPopupOpen() && !e.target.closest(circleSelector)) {
        const allPopups = document.querySelectorAll(
          ".popup-left, .popup-right"
        );
        allPopups.forEach((p) => (p.style.display = "none"));

        // Prevent any other action (like opening another popup or following a link)
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  function isAnyPopupOpen() {
    const popups = document.querySelectorAll(".popup-left, .popup-right");
    for (let popup of popups) {
      if (popup.style.display !== "none") {
        return true;
      }
    }
    return false;
  }

  setupCirclePopup(".circle-man", ".popup-left");
  setupCirclePopup(".circle-man", ".popup-right");
  setupCirclePopup(".circle-woman", ".popup-left");
  setupCirclePopup(".circle-woman", ".popup-right");
});
