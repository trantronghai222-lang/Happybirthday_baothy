const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

const audioUpload = document.getElementById("audioUpload");
const audio = document.getElementById("celebrationAudio");
const toggleAudio = document.getElementById("toggleAudio");

const fireworks = [];
const particles = [];
const gravity = 0.02;

const colors = [
  "#ff6b6b",
  "#ffd166",
  "#06d6a0",
  "#4cc9f0",
  "#b5179e",
  "#f72585",
];

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = canvas.height * (0.2 + Math.random() * 0.5);
    this.speed = 2 + Math.random() * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      this.explode();
      return false;
    }
    return true;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  explode() {
    const count = 50 + Math.floor(Math.random() * 20);
    for (let i = 0; i < count; i += 1) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2 + Math.random() * 2;
    this.alpha = 1;
    this.velocity = {
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4,
    };
  }

  update() {
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.012;
    return this.alpha > 0;
  }

  draw() {
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const animate = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i -= 1) {
    const active = fireworks[i].update();
    fireworks[i].draw();
    if (!active) {
      fireworks.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const active = particles[i].update();
    particles[i].draw();
    if (!active) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
};

animate();

audioUpload.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }
  const url = URL.createObjectURL(file);
  audio.src = url;
  toggleAudio.textContent = "Play celebration audio";
});

toggleAudio.addEventListener("click", async () => {
  if (!audio.src) {
    toggleAudio.textContent = "Add your audio above first";
    return;
  }
  if (audio.paused) {
    await audio.play();
    toggleAudio.textContent = "Pause celebration audio";
  } else {
    audio.pause();
    toggleAudio.textContent = "Play celebration audio";
  }
});
