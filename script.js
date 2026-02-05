const audioUpload = document.getElementById("audioUpload");
const audio = document.getElementById("celebrationAudio");
const toggleAudio = document.getElementById("toggleAudio");
const joyField = document.getElementById("joyField");

const colors = [
  "#ff6b6b",
  "#ffd166",
  "#06d6a0",
  "#4cc9f0",
  "#b5179e",
  "#f72585",
];

const joyMessages = ["WOW", "LOVE", "HAPPY", "SMILE", "SHINE"];

const createJoyElements = () => {
  joyField.innerHTML = "";
  const messageCount = 18;
  const orbCount = 14;
  const confettiCount = 40;

  for (let i = 0; i < messageCount; i += 1) {
    const joy = document.createElement("span");
    joy.className = "joy-item";
    joy.textContent = joyMessages[i % joyMessages.length];
    joy.style.left = `${Math.random() * 100}%`;
    joy.style.top = `${Math.random() * 100}%`;
    joy.style.setProperty("--duration", `${6 + Math.random() * 6}s`);
    joy.style.transform = `rotate(${Math.random() * 12 - 6}deg)`;
    joyField.appendChild(joy);
  }

  for (let i = 0; i < orbCount; i += 1) {
    const orb = document.createElement("span");
    orb.className = "light-orb";
    orb.style.left = `${Math.random() * 100}%`;
    orb.style.top = `${Math.random() * 100}%`;
    orb.style.setProperty("--size", `${40 + Math.random() * 90}px`);
    orb.style.setProperty("--duration", `${4 + Math.random() * 4}s`);
    joyField.appendChild(orb);
  }

  for (let i = 0; i < confettiCount; i += 1) {
    const confetti = document.createElement("span");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.background = colors[i % colors.length];
    confetti.style.setProperty("--duration", `${6 + Math.random() * 6}s`);
    confetti.style.animationDelay = `${Math.random() * 4}s`;
    joyField.appendChild(confetti);
  }
};

window.addEventListener("resize", createJoyElements);
createJoyElements();

audioUpload.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }
  const url = URL.createObjectURL(file);
  audio.src = url;
  audio.loop = true;
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
