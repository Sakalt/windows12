// 各ウィンドウの取得
const windows = {
    'file-explorer': document.getElementById('file-explorer-window'),
    'notepad': document.getElementById('notepad-window'),
    'calendar': document.getElementById('calendar-window'),
    'camera': document.getElementById('camera-window'),
    'browser': document.getElementById('browser-window'),
    'control-panel': document.getElementById('control-panel-window'),
    'command-prompt': document.getElementById('command-prompt-window'),
    'setup': document.getElementById('setup-window'),
    'paint': document.getElementById('paint-window'),
    'calculator': document.getElementById('calculator-window')
};

// スタートメニューのアプリケーションボタンの取得とクリックイベントの設定
const startMenuApps = {
    'start-file-explorer': 'file-explorer',
    'start-notepad': 'notepad',
    'start-calendar': 'calendar',
    'start-camera': 'camera',
    'start-browser': 'browser',
    'start-control-panel': 'control-panel',
    'start-command-prompt': 'command-prompt',
    'start-setup': 'setup',
    'start-paint': 'paint',
    'start-calculator': 'calculator'
};

for (const id in startMenuApps) {
    document.getElementById(id).onclick = () => {
        const windowId = startMenuApps[id];
        windows[windowId].style.display = 'block';
        addToTaskbar(windowId);
    };
}

// ウィンドウの閉じるボタンのクリックイベントの設定
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
    button.onclick = (e) => {
        const window = e.target.closest('.window');
        window.style.display = 'none';
        removeFromTaskbar(window.id);
    };
});

// ウィンドウの最小化ボタンのクリックイベントの設定
const minimizeButtons = document.querySelectorAll('.minimize');
minimizeButtons.forEach(button => {
    button.onclick = (e) => {
        const window = e.target.closest('.window');
        window.style.display = 'none';
    };
});

// ウィンドウの最大化ボタンのクリックイベントの設定
const maximizeButtons = document.querySelectorAll('.maximize');
maximizeButtons.forEach(button => {
    button.onclick = (e) => {
        const window = e.target.closest('.window');
        if (window.classList.contains('maximized')) {
            window.classList.remove('maximized');
        } else {
            window.classList.add('maximized');
        }
    };
});

// メモ帳の保存機能
document.getElementById('notepad-save').onclick = () => {
    const text = document.getElementById('notepad-text').value;
    localStorage.setItem('notepad-text', text);
};

window.onload = () => {
    const savedText = localStorage.getItem('notepad-text');
    if (savedText) {
        document.getElementById('notepad-text').value = savedText;
    }

    // カレンダーの日付を表示
    const currentDate = new Date().toLocaleDateString();
    document.getElementById('current-date').innerText = `今日の日付: ${currentDate}`;

    // ロック画面の解除
    setTimeout(() => {
        document.getElementById('lock-screen').style.display = 'none';
    }, 3000);
};

// コマンドプロンプトの実行機能
document.getElementById('command-submit').onclick = () => {
    const command = document.getElementById('command-input').value;
    const output = document.getElementById('command-output');
    // 仮のコマンド実行処理
    output.innerText += `> ${command}\nコマンド "${command}" は認識されませんでした。\n`;
};

// カメラの撮影機能
document.getElementById('camera-capture').onclick = async () => {
    const video = document.getElementById('camera-view');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
};

// 電卓の機能
const calculatorDisplay = document.getElementById('calculator-display');
const calculatorButtons = document.querySelectorAll('.calculator-button');
let calculatorExpression = '';

calculatorButtons.forEach(button => {
    button.onclick = () => {
        const value = button.innerText;
        if (value === 'C') {
            calculatorExpression = '';
        } else if (value === '=') {
            try {
                calculatorExpression = eval(calculatorExpression);
            } catch {
                calculatorExpression = 'エラー';
            }
        } else {
            calculatorExpression += value;
        }
        calculatorDisplay.innerText = calculatorExpression;
    };
});

// スタートメニューのトグル
document.getElementById('start-button').onclick = () => {
    const startMenuContent = document.getElementById('start-menu-content');
    startMenuContent.style.display = startMenuContent.style.display === 'block' ? 'none' : 'block';
};

// タスクバーにアイコンを追加する関数
function addToTaskbar(windowId) {
    const taskbar = document.getElementById('taskbar-icons');
    const existingIcon = taskbar.querySelector(`.taskbar-icon[data-window="${windowId}"]`);
    if (!existingIcon) {
        const icon = document.createElement('div');
        icon.className = 'taskbar-icon';
        icon.dataset.window = windowId;
        icon.innerText = windowId; // アイコンのテキストを設定
        icon.onclick = () => {
            const window = windows[windowId];
            if (window.style.display === 'none') {
                window.style.display = 'block';
                icon.classList.add('active');
            } else {
                window.style.display = 'none';
                icon.classList.remove('active');
            }
        };
        taskbar.appendChild(icon);
    }
    taskbar.querySelectorAll('.taskbar-icon').forEach(icon => icon.classList.remove('active'));
    taskbar.querySelector(`.taskbar-icon[data-window="${windowId}"]`).classList.add('active');
}

// タスクバーからアイコンを削除する関数
function removeFromTaskbar(windowId) {
    const taskbar = document.getElementById('taskbar-icons');
    const icon = taskbar.querySelector(`.taskbar-icon[data-window="${windowId}"]`);
    if (icon) {
        taskbar.removeChild(icon);
    }
}

// ペイントの機能
const paintCanvas = document.getElementById('paint-canvas');
const paintContext = paintCanvas.getContext('2d');
let painting = false;

paintCanvas.onmousedown = () => painting = true;
paintCanvas.onmouseup = () => painting = false;
paintCanvas.onmousemove = (e) => {
    if (painting) {
        paintContext.lineTo(e.clientX - paintCanvas.offsetLeft, e.clientY - paintCanvas.offsetTop);
        paintContext.stroke();
    }
};

document.getElementById('paint-clear').onclick = () => {
    paintContext.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
};
// 既存のウィンドウ関連コード...

// ロック画面のパスワード機能
const lockScreen = document.getElementById('lock-screen');
const lockScreenPassword = document.getElementById('lock-screen-password');
const lockScreenSubmit = document.getElementById('lock-screen-submit');
const startupSound = document.getElementById('startup-sound');

lockScreenSubmit.onclick = () => {
    const enteredPassword = lockScreenPassword.value;
    const savedPassword = localStorage.getItem('password') || '1234';
    if (enteredPassword === savedPassword) {
        lockScreen.style.display = 'none';
        startupSound.play();
    } else {
        alert('パスワードが間違っています');
    }
};

window.onload = () => {
    // 既存のコード...
    
    // ロック画面の解除
    lockScreen.style.display = 'block';

    
