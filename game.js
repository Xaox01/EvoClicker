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

const game = new Phaser.Game(gameConfig);

let settingsWindow;
let backgroundMusic;

function preload() {
    this.load.image('background', './img/background.png');
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

    document.addEventListener('click', playBackgroundMusic);
}

function createButton(buttonElement, clickHandler) {
    buttonElement.addEventListener('click', () => {
        playButtonSound();
        clickHandler();
    });
}

function startGame() {
    console.log('Rozpocznij grę');
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

    settingsWindowElement.appendChild(closeButton);
    document.body.appendChild(settingsWindowElement);

    settingsWindow = settingsWindowElement;
}

function closeSettings() {
    console.log('Zamknij ustawienia');
    settingsWindow.remove();
}

function playButtonSound() {
    const buttonSound = new Audio('./sounds/settingsAudio.wav');
    buttonSound.play();
}

function playBackgroundMusic() {
    document.removeEventListener('click', playBackgroundMusic); // Usunięcie nasłuchiwania kliknięcia

    backgroundMusic = game.sound.add('background-music', { loop: true });
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
}
