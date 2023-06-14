const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        create: create
    }
};

const game = new Phaser.Game(gameConfig);

function create() {
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

function startGame() {
    console.log('Rozpocznij grę');
    // Tutaj dodaj kod, który rozpoczyna grę
}

function continueGame() {
    console.log('Kontynuuj');
    // Tutaj dodaj kod, który kontynuuje grę
}

function openSettings() {
    console.log('Otwórz ustawienia');
    // Tutaj dodaj kod, który otwiera ustawienia
}
