const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

const confettiPieces = [];
let animationFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function moveNoButton() {
  const padding = 14;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

["mouseenter", "pointerdown", "touchstart", "focus"].forEach((eventName) => {
  noBtn.addEventListener(eventName, (event) => {
    event.preventDefault();
    moveNoButton();
  });
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

function launchConfetti() {
  confettiPieces.length = 0;
  const colors = ["#ff5fa2", "#ffd166", "#7ddf96", "#7bc8ff", "#c6a2ff"];

  for (let i = 0; i < 260; i += 1) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: 5 + Math.random() * 8,
      speedY: 2 + Math.random() * 4,
      speedX: -2 + Math.random() * 4,
      rotation: Math.random() * Math.PI * 2,
      spin: -0.15 + Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  const start = performance.now();

  function animate(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach((piece) => {
      piece.x += piece.speedX;
      piece.y += piece.speedY;
      piece.rotation += piece.spin;

      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.65);
      ctx.restore();
    });

    if (now - start < 4300) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(animate);
}

yesBtn.addEventListener("click", () => {
  document.body.classList.add("celebrate");
  result.textContent = "Wow Good Job Puchu You Made The Right Choice, Proud Of You Come Give Me A Puchhi Now 😘";
  launchConfetti();
  yesBtn.disabled = true;
  yesBtn.textContent = "Sahi Jawab!!! 7 Crore 💰💰";
});
