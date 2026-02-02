// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
  const warnings = [];

  // Check required fields
  if (!config.valentineName) {
    warnings.push("Valentine's name is not set! Using default.");
    config.valentineName = "My Love";
  }

  // Validate colors
  const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  Object.entries(config.colors).forEach(([key, value]) => {
    if (!isValidHex(value)) {
      warnings.push(`Invalid color for ${key}! Using default.`);
      config.colors[key] = getDefaultColor(key);
    }
  });

  // Validate animation values
  if (parseFloat(config.animations.floatDuration) < 5) {
    warnings.push("Float duration too short! Setting to 5s minimum.");
    config.animations.floatDuration = "5s";
  }

  if (
    config.animations.heartExplosionSize < 1 ||
    config.animations.heartExplosionSize > 3
  ) {
    warnings.push(
      "Heart explosion size should be between 1 and 3! Using default.",
    );
    config.animations.heartExplosionSize = 1.5;
  }

  // Log warnings if any
  if (warnings.length > 0) {
    console.warn("⚠️ Configuration Warnings:");
    warnings.forEach((warning) => console.warn("- " + warning));
  }
}

// Default color values
function getDefaultColor(key) {
  const defaults = {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757",
  };
  return defaults[key];
}

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Validate configuration first
  validateConfig();

  // Set texts from config
  document.getElementById("valentineTitle").textContent =
    `${config.valentineName}, mein Bebop...`;

  // Set first question texts
  document.getElementById("question1Text").textContent =
    config.questions.first.text;
  document.getElementById("yesBtn1").textContent =
    config.questions.first.yesBtn;
  document.getElementById("noBtn1").textContent = config.questions.first.noBtn;
  document.getElementById("secretAnswerBtn").textContent =
    config.questions.first.secretAnswer;

  // Set second question texts
  document.getElementById("question2Text").textContent =
    config.questions.second.text;
  document.getElementById("startText").textContent =
    config.questions.second.startText;
  document.getElementById("nextBtn").textContent =
    config.questions.second.nextBtn;

  // Set third question texts
  document.getElementById("question3Text").textContent =
    config.questions.third.text;
  document.getElementById("yesBtn3").textContent =
    config.questions.third.yesBtn;
  document.getElementById("noBtn3").textContent = config.questions.third.noBtn;

  // Create initial floating elements
  createFloatingElements();
});

// Create floating hearts, bears, and roses
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");

  // Create hearts
  config.floatingEmojis.hearts.forEach((heart) => {
    const div = document.createElement("div");
    div.className = "heart emoji-interactive";
    div.innerHTML = heart;
    setRandomPosition(div);
    addEmojiInteractions(div);
    container.appendChild(div);
  });

  // Create bears
  config.floatingEmojis.bears.forEach((bear) => {
    const div = document.createElement("div");
    div.className = "bear emoji-interactive";
    div.innerHTML = bear;
    setRandomPosition(div);
    addEmojiInteractions(div);
    container.appendChild(div);
  });

  // Create roses
  if (config.floatingEmojis.roses) {
    config.floatingEmojis.roses.forEach((rose) => {
      const div = document.createElement("div");
      div.className = "rose emoji-interactive";
      div.innerHTML = rose;
      setRandomPosition(div);
      addEmojiInteractions(div);
      container.appendChild(div);
    });
  }
}

// Set random position for floating elements
function setRandomPosition(element) {
  element.style.left = Math.random() * 100 + "vw";
  element.style.animationDelay = Math.random() * 5 + "s";
  element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// Add interactive behaviors to emojis
function addEmojiInteractions(element) {
  let isDragging = false;
  let startX, startY;
  let offsetX, offsetY;
  let trail = [];
  
  // Click event - pop effect
  element.addEventListener('click', function(e) {
    if (!isDragging) {
      this.classList.add('emoji-pop');
      setTimeout(() => {
        this.classList.remove('emoji-pop');
      }, 300);
    }
  });
  
  // Mouse down - start dragging
  element.addEventListener('mousedown', function(e) {
    isDragging = true;
    this.classList.add('dragging');
    
    // Get the initial position
    const rect = this.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Stop the floating animation
    this.style.animation = 'none';
    this.style.position = 'fixed';
    
    e.preventDefault();
  });
  
  // Mouse move - drag and create trail
  document.addEventListener('mousemove', function(e) {
    if (isDragging && element.classList.contains('dragging')) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      element.style.left = x + 'px';
      element.style.top = y + 'px';
      
      // Create trail effect
      createTrail(e.clientX, e.clientY, element.innerHTML);
    }
  });
  
  // Mouse up - stop dragging
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      element.classList.remove('dragging');
    }
  });
  
  // Touch events for mobile
  element.addEventListener('touchstart', function(e) {
    isDragging = true;
    this.classList.add('dragging');
    
    const rect = this.getBoundingClientRect();
    const touch = e.touches[0];
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    
    this.style.animation = 'none';
    this.style.position = 'fixed';
    
    e.preventDefault();
  });
  
  document.addEventListener('touchmove', function(e) {
    if (isDragging && element.classList.contains('dragging')) {
      const touch = e.touches[0];
      const x = touch.clientX - offsetX;
      const y = touch.clientY - offsetY;
      
      element.style.left = x + 'px';
      element.style.top = y + 'px';
      
      // Create trail effect
      createTrail(touch.clientX, touch.clientY, element.innerHTML);
    }
  });
  
  document.addEventListener('touchend', function() {
    if (isDragging) {
      isDragging = false;
      element.classList.remove('dragging');
    }
  });
}

// Create trail effect when dragging
function createTrail(x, y, emoji) {
  const trailElement = document.createElement('div');
  trailElement.className = 'emoji-trail';
  trailElement.innerHTML = emoji;
  trailElement.style.left = x + 'px';
  trailElement.style.top = y + 'px';
  
  document.querySelector('.floating-elements').appendChild(trailElement);
  
  // Remove trail element after animation
  setTimeout(() => {
    trailElement.remove();
  }, 1000);
}

// Function to show next question
function showNextQuestion(questionNumber) {
  document
    .querySelectorAll(".question-section")
    .forEach((q) => q.classList.add("hidden"));
  document
    .getElementById(`question${questionNumber}`)
    .classList.remove("hidden");
}

// Function to move the "No" button when clicked
function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

// Love meter functionality
const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

function setInitialPosition() {
  loveMeter.value = 100;
  loveValue.textContent = 100;
  loveMeter.style.width = "100%";
}

loveMeter.addEventListener("input", () => {
  const value = parseInt(loveMeter.value);
  loveValue.textContent = value;

  if (value > 100) {
    extraLove.classList.remove("hidden");
    const overflowPercentage = (value - 100) / 9900;
    const extraWidth = overflowPercentage * window.innerWidth * 0.8;
    loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
    loveMeter.style.transition = "width 0.3s";

    // Show different messages based on the value
    if (value >= 5000) {
      extraLove.classList.add("super-love");
      extraLove.textContent = config.loveMessages.extreme;
    } else if (value > 1000) {
      extraLove.classList.remove("super-love");
      extraLove.textContent = config.loveMessages.high;
    } else {
      extraLove.classList.remove("super-love");
      extraLove.textContent = config.loveMessages.normal;
    }
  } else {
    extraLove.classList.add("hidden");
    extraLove.classList.remove("super-love");
    loveMeter.style.width = "100%";
  }
});

// Initialize love meter
window.addEventListener("DOMContentLoaded", setInitialPosition);
window.addEventListener("load", setInitialPosition);

// Celebration function
function celebrate() {
  document
    .querySelectorAll(".question-section")
    .forEach((q) => q.classList.add("hidden"));
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");

  // Set celebration messages
  document.getElementById("celebrationTitle").textContent =
    config.celebration.title;
  document.getElementById("celebrationMessage").textContent =
    config.celebration.message;
  document.getElementById("celebrationEmojis").textContent =
    config.celebration.emojis;

  // Create heart explosion effect
  createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    const randomHeart =
      config.floatingEmojis.hearts[
        Math.floor(Math.random() * config.floatingEmojis.hearts.length)
      ];
    heart.innerHTML = randomHeart;
    heart.className = "heart";
    document.querySelector(".floating-elements").appendChild(heart);
    setRandomPosition(heart);
  }
}


