// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
  // Your Valentine's name that will appear in the title
  // Example: "Jade", "Sarah", "Mike"
  valentineName: "Sarah Pia",

  // The title that appears in the browser tab
  // You can use emojis! 💝 💖 💗 💓 💞 💕
  pageTitle: "Willst du mein Valentinstag Date sein?",

  // Floating emojis that appear in the background
  // Find more emojis at: https://emojipedia.org
  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"], // Heart emojis
    bears: ["🧸", "🐻"], // Cute bear emojis
  },

  // Questions and answers
  // Customize each question and its possible responses
  questions: {
    first: {
      text: "Magst du mich?", // First interaction
      yesBtn: "Ja!", // Text for "Yes" button
      noBtn: "Nein😞", // Text for "No" button
      secretAnswer: "Ich mag dich nicht sondern ich liebe dich! ❤️", // Secret hover message
    },
    second: {
      text: "Wie sehr magst du mich?", // For the love meter
      startText: "Soooo sehr:", // Text before the percentage
      nextBtn: "Weiter ❤️", // Text for the next button
    },
    third: {
      text: "Willst du mein Valentinstag Date sein, am 14. Februar 2025? 🌹", // The big question!
      yesBtn: "Jaaaaa!", // Text for "Yes" button
      noBtn: "Nein😞", // Text for "No" button
    },
  },

  // Love meter messages
  // They show up depending on how far they slide the meter
  loveMessages: {
    extreme: "WOOOOW du liebst mich sooo sehr?? 🥰🚀💝", // Shows when they go past 5000%
    high: "Bis zur unendlichkeit und noch viel weiter! 🚀💝", // Shows when they go past 1000%
    normal: "Und weiter 🥰", // Shows when they go past 100%
  },

  // Messages that appear after they say "Yes!"
  celebration: {
    title: "Yay! 🎉💝💖💝💓",
    message: "Und jetzt komm endlich zu mir und Küss mich!",
    emojis: "🎁💖🤗💝💋❤️💕", // These will bounce around
  },

  // Color scheme for the website
  // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
  colors: {
    backgroundStart: "#ffafbd", // Gradient start (try pastel colors for a soft look)
    backgroundEnd: "#ffc3a0", // Gradient end (should complement backgroundStart)
    buttonBackground: "#ff6b6b", // Button color (should stand out against the background)
    buttonHover: "#ff8787", // Button hover color (slightly lighter than buttonBackground)
    textColor: "#ff4757", // Text color (make sure it's readable!)
  },

  // Animation settings
  // Adjust these if you want faster/slower animations
  animations: {
    floatDuration: "15s", // How long it takes hearts to float up (10-20s recommended)
    floatDistance: "50px", // How far hearts move sideways (30-70px recommended)
    bounceSpeed: "0.5s", // Speed of bouncing animations (0.3-0.7s recommended)
    heartExplosionSize: 1.5, // Size of heart explosion effect (1.2-2.0 recommended)
  },

};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
