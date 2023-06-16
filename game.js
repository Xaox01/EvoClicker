const gameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  scene: {
    preload: preload,
    create: create
  }
};

let game;
let settingsWindow;
let backgroundMusic;
let soundVolume = 0.1;
let soundSlider;

function preload() {
  this.load.image('background', './img/background.png');
  this.load.image('background2', './img/background2.png');
  this.load.image('new-object', './sprite/ameba.png'); 
  this.load.audio('button-sound', './sounds/settingsAudio.wav');
  this.load.audio('background-music', './music/theme.wav');
}

function create() {
  const background = this.add.image(0, 0, 'background').setOrigin(0);
  background.displayWidth = game.config.width;
  background.displayHeight = game.config.height;

  const startButton = document.getElementById('start-button');
  const continueButton = document.getElementById('continue-button');
  const settingsButton = document.getElementById('settings-button');

  [startButton, continueButton, settingsButton].forEach(button => {
    button.addEventListener('mouseover', () => {
      button.classList.add('highlight');
    });

    button.addEventListener('mouseout', () => {
      button.classList.remove('highlight');
    });

    createButton(button, playButtonSound);
  });

  startButton.addEventListener('click', startGame);
  continueButton.addEventListener('click', continueGame);
  settingsButton.addEventListener('click', openSettings);

  backgroundMusic = this.sound.add('background-music');
  backgroundMusic.play({ loop: true });
  backgroundMusic.setVolume(soundVolume);

  soundSlider = document.getElementById('sound-slider');
  soundSlider.addEventListener('input', updateVolume);

  const stopMusicButton = document.getElementById('stop-music-button');
  stopMusicButton.addEventListener('click', stopMusic);

  const params = new URLSearchParams(window.location.search);
  const inGame = params.get('inGame');
  if (inGame === 'true') {
    startGame();
  }
}

function createButton(buttonElement, clickHandler) {
  buttonElement.addEventListener('click', () => {
    playButtonSound();
    clickHandler();
  });
}

function startGame() {
  console.log('Rozpocznij grę');
  const params = new URLSearchParams(window.location.search);
  params.set('inGame', 'true');
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  if (!game) {
    game = new Phaser.Game(gameConfig);
    game.scene.add('menuScene', MenuScene);
    game.scene.add('gameScene', GameScene);
  }
  game.scene.stop('menuScene');
  game.scene.start('gameScene');
  document.getElementById('menu-container').style.display = 'none';
}

function continueGame() {
  console.log('Kontynuuj');
}

function openSettings() {
  console.log('Otwórz ustawienia');
  const windowWidth = 400;
  const windowHeight = 300;
  const windowX = (game.config.width - windowWidth) / 2;
  const windowY = (game.config.height - windowHeight) / 2;

  const settingsWindowElement = document.createElement('div');
  settingsWindowElement.style.width = windowWidth + 'px';
  settingsWindowElement.style.height = windowHeight + 'px';
  settingsWindowElement.style.position = 'absolute';
  settingsWindowElement.style.left = windowX + 'px';
  settingsWindowElement.style.top = windowY + 'px';
  settingsWindowElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  settingsWindowElement.style.borderRadius = '4px';
  settingsWindowElement.style.padding = '16px';
  settingsWindowElement.style.boxSizing = 'border-box';
  settingsWindowElement.style.fontFamily = "'Press Start 2P', cursive";
  settingsWindowElement.style.color = '#fff';
  settingsWindowElement.style.fontSize = '16px';

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Zamknij';
  closeButton.style.position = 'absolute';
  closeButton.style.bottom = '16px';
  closeButton.style.left = '50%';
  closeButton.style.transform = 'translateX(-50%)';
  closeButton.style.padding = '8px 12px';
  closeButton.style.fontSize = '14px';
  closeButton.style.backgroundColor = '#000';
  closeButton.style.border = '2px solid #fff';
  closeButton.style.borderRadius = '4px';
  closeButton.style.color = '#fff';
  closeButton.style.fontFamily = "'Press Start 2P', cursive";
  closeButton.style.cursor = 'pointer';
  closeButton.classList.add('highlight');

  createButton(closeButton, closeSettings);

  const soundSliderLabel = document.createElement('label');
  soundSliderLabel.textContent = 'Głośność:';
  soundSliderLabel.style.display = 'block';
  soundSliderLabel.style.marginTop = '16px';

  soundSlider = document.createElement('input');
  soundSlider.id = 'sound-slider';
  soundSlider.type = 'range';
  soundSlider.min = '0';
  soundSlider.max = '1';
  soundSlider.step = '0.1';
  soundSlider.value = soundVolume.toString();
  soundSlider.addEventListener('input', updateVolume);

  soundSliderLabel.appendChild(soundSlider);

  settingsWindowElement.appendChild(soundSliderLabel);
  settingsWindowElement.appendChild(closeButton);
  document.body.appendChild(settingsWindowElement);

  settingsWindow = settingsWindowElement;
}

function updateVolume() {
  soundVolume = parseFloat(soundSlider.value);
  backgroundMusic.setVolume(soundVolume);
}

function closeSettings() {
  console.log('Zamknij ustawienia');
  settingsWindow.remove();
}

function playButtonSound() {
  const buttonSound = new Audio('./sounds/settingsAudio.wav');
  buttonSound.play();
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });
  }

  preload() {
    this.load.image('background2', './img/background2.png');
    this.load.image('new-object', './img/ameba.png'); 
  }

  create() {
    const background = this.add.image(0, 0, 'background2').setOrigin(0);
    background.displayWidth = game.config.width;
    background.displayHeight = game.config.height;

    const newObject = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'new-object');
    newObject.setOrigin(0.5);
    newObject.setDisplaySize(200, 200); 
  }

  update() {
    // Logika gry
  }
}

window.addEventListener('load', () => {
  game = new Phaser.Game(gameConfig);
  game.scene.add('menuScene', MenuScene);
  game.scene.add('gameScene', GameScene);

  const params = new URLSearchParams(window.location.search);
  const inGame = params.get('inGame');
  if (inGame === 'true') {
    game.scene.start('gameScene');
    document.getElementById('menu-container').style.display = 'none';
  } else {
    game.scene.start('menuScene');
  }
});
