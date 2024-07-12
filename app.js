document.addEventListener('DOMContentLoaded', () => {
    const lockScreen = document.getElementById('lock-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const desktop = document.getElementById('desktop');
    const passwordInput = document.getElementById('password-input');
    const unlockButton = document.getElementById('unlock-button');
    const startMenuIcon = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const closeButtons = document.querySelectorAll('.window-control.close');
    const startFileExplorer = document.getElementById('start-file-explorer');
    const fileExplorerWindow = document.getElementById('file-explorer-window');
    const startNotepad = document.getElementById('start-notepad');
    const notepadWindow = document.getElementById('notepad-window');
    const startCalendar = document.getElementById('start-calendar');
    const calendarWindow = document.getElementById('calendar-window');
    const startCamera = document.getElementById('start-camera');
    const cameraWindow = document.getElementById('camera-window');
    const startBrowser = document.getElementById('start-browser');
    const browserWindow = document.getElementById('browser-window');
    const startControlPanel = document.getElementById('start-control-panel');
    const controlPanelWindow = document.getElementById('control-panel-window');
    const startCommandPrompt = document.getElementById('start-command-prompt');
    const commandPromptWindow = document.getElementById('command-prompt-window');
    const startSetup = document.getElementById('start-setup');
    const setupWindow = document.getElementById('setup-window');
    const startPaint = document.getElementById('start-paint');
    const paintWindow = document.getElementById('paint-window');

    // ローディング画面の表示時間
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        lockScreen.style.display = 'flex';
    }, 3000); // 3秒表示

    // ロック画面の解除
    unlockButton.addEventListener('click', () => {
        const password = passwordInput.value;
        if (password === '1234') {
            lockScreen.style.display = 'none';
            loadingScreen.style.display = 'flex';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                desktop.style.display = 'block';
            }, 3000); // 3秒待機
        } else {
            alert('パスワードが違います');
        }
    });

    // スタートメニューの表示/非表示
    startMenuIcon.addEventListener('click', () => {
        startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    });

    // ウィンドウを閉じる
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.window').style.display = 'none';
        });
    });

    // アプリの起動
    startFileExplorer.addEventListener('click', () => {
        fileExplorerWindow.style.display = 'block';
    });

    startNotepad.addEventListener('click', () => {
        notepadWindow.style.display = 'block';
    });

    startCalendar.addEventListener('click', () => {
        calendarWindow.style.display = 'block';
    });

    startCamera.addEventListener('click', () => {
        cameraWindow.style.display = 'block';
    });

    startBrowser.addEventListener('click', () => {
        browserWindow.style.display = 'block';
    });

    startControlPanel.addEventListener('click', () => {
        controlPanelWindow.style.display = 'block';
    });

    startCommandPrompt.addEventListener('click', () => {
        commandPromptWindow.style.display = 'block';
    });

    startSetup.addEventListener('click', () => {
        setupWindow.style.display = 'block';
    });

    startPaint.addEventListener('click', () => {
        paintWindow.style.display = 'block';
    });
});
