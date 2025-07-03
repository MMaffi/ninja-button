const myText = document.getElementById("myText");
const originalText = myText.dataset.originalText;
let isAnimating = false;
let intervalId;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-`~[]\\{}|;\':",./<>?';

function scrambleText(text, revealProgress) {
  let scrambled = '';
  for (let i = 0; i < text.length; i++) {
    if (i < revealProgress) {
      scrambled += text[i];
    } else {
      scrambled += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }
  return scrambled;
}

function animateIn() {
  let progress = 0;
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (progress > originalText.length) {
      clearInterval(intervalId);
      return;
    }
    myText.textContent = scrambleText(originalText, progress);
    progress++;
  }, 50);
}

function animateOut() {
  clearInterval(intervalId);
  let tempText = myText.textContent;
  intervalId = setInterval(() => {
    myText.textContent = generateRandomString(tempText.length);
  }, 80);
}

function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

myText.addEventListener("mouseover", () => {
  if (!isAnimating) {
    isAnimating = true;
    animateOut();
  }
});

myText.addEventListener("mouseout", () => {
  isAnimating = false;
  animateIn();
});

const buttons = document.querySelectorAll("div.buttons button");

function centerButton(button, index, total) {
    const spacing = window.innerWidth / (total + 1);
    const x = spacing * (index + 1) - button.offsetWidth / 2;
    const y = window.innerHeight / 2 - button.offsetHeight / 2;
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

function moveButtonRandomly(button) {
    const padding = 50;
    const maxX = window.innerWidth - button.offsetWidth - padding;
    const maxY = window.innerHeight - button.offsetHeight - padding;

    let randomX, randomY;

    do {
        randomX = Math.floor(Math.random() * maxX) + padding;
        randomY = Math.floor(Math.random() * maxY) + padding;
    } while (isNearCurrentPosition(button, randomX, randomY));

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

function centerButton(button, index, total) {
    const buttonWidth = button.offsetWidth;
    const totalWidth = buttonWidth * total + 50 * (total - 1);
    const startX = (window.innerWidth - totalWidth) / 2;
    const yOffset = 70;
    const x = startX + index * (buttonWidth + 20);
    const y = window.innerHeight / 2 - button.offsetHeight / 2 + yOffset;
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

function isNearCurrentPosition(button, x, y) {
    const currentX = parseFloat(button.style.left);
    const currentY = parseFloat(button.style.top);
    const dx = currentX - x;
    const dy = currentY - y;
    return Math.sqrt(dx * dx + dy * dy) < 150;
}

buttons.forEach((button, index) => {
    centerButton(button, index, buttons.length);

    button.addEventListener("mouseenter", () => {
        moveButtonRandomly(button);
    });
});

const modal = document.getElementById("congratsModal");
const closeModal = document.getElementById("closeModal");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    location.reload();
});