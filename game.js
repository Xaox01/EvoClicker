const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(gameConfig);

let backgroundLayer1;
let backgroundLayer2;
let isInMenu = true;

function preload() {
    this.load.image('background', './img/background.png');
}

function create() {
    backgroundLayer1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0);
    backgroundLayer2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0);

    backgroundLayer1.scrollFactorX = 0.3;
    backgroundLayer1.scrollFactorY = 0.3;
    backgroundLayer2.scrollFactorX = 0.5;
    backgroundLayer2.scrollFactorY = 0.5;

    const startButton = this.add.dom(400, 250, 'a', 'font-size: 16px', 'Zacznij grę');
    const continueButton = this.add.dom(400, 300, 'a', 'font-size: 16px', 'Kontynuuj');
    const settingsButton = this.add.dom(400, 350, 'a', 'font-size: 16px', 'Ustawienia');

    startButton.addListener('click');
    continueButton.addListener('click');
    settingsButton.addListener('click');

    startButton.on('click', startGame);
    continueButton.on('click', continueGame);
    settingsButton.on('click', openSettings);
}

function update() {
    if (isInMenu) {
        backgroundLayer1.tilePositionX += 0.5;
        backgroundLayer1.tilePositionY += 0.5;
        backgroundLayer2.tilePositionX -= 0.3;
        backgroundLayer2.tilePositionY -= 0.3;
    }
}

function startGame() {
    console.log('Rozpocznij grę');
    // Tutaj dodaj kod, który rozpoczyna grę
    isInMenu = false;
}

function continueGame() {
    console.log('Kontynuuj');
    // Tutaj dodaj kod, który kontynuuje grę
    isInMenu = false;
}

function openSettings() {
    console.log('Otwórz ustawienia');
    // Tutaj dodaj kod, który otwiera ustawienia
    isInMenu = false;
}
