document.addEventListener('DOMContentLoaded', () => {
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

    // セットアップ画面の処理
    const setupScreen = document.getElementById('setup-screen');
   document.addEventListener('DOMContentLoaded', () => {
    const setupScreen = document.getElementById('setup-screen');

    // ローカルストレージからユーザー名とパスワードを取得
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
        // ユーザー名とパスワードが保存されていない場合はセットアップ画面を表示
        setupScreen.style.display = 'block';
    } else {
        // ユーザー名とパスワードが保存されている場合はセットアップ画面を非表示
        setupScreen.style.display = 'none';
    }

    // セットアップ処理
    const setupSubmit = document.getElementById('setup-submit');
    setupSubmit.onclick = () => {
        const usernameInput = document.getElementById('setup-username');
        const passwordInput = document.getElementById('setup-password');
        const usernameValue = usernameInput.value;
        const passwordValue = passwordInput.value;

        if (usernameValue && passwordValue) {
            // ユーザー名とパスワードを保存
            localStorage.setItem('username', usernameValue);
            localStorage.setItem('password', passwordValue);

            // セットアップ画面を非表示にするなどの処理を追加可能
            setupScreen.style.display = 'none';
        } else {
            alert('ユーザー名とパスワードを入力してください');
        }
    };
});

    // 初期表示処理
    if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
        setupScreen.style.display = 'block';
    } else {
        lockScreen.style.display = 'block';
    }

    // ウィンドウ機能
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        const header = window.querySelector('.window-header');
        const minimizeButton = window.querySelector('.minimize');
        const maximizeButton = window.querySelector('.maximize');
        const closeButton = window.querySelector('.close');
        
        header.onmousedown = (e) => {
            let shiftX = e.clientX - window.getBoundingClientRect().left;
            let shiftY = e.clientY - window.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                window.style.left = pageX - shiftX + 'px';
                window.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(e) {
                moveAt(e.pageX, e.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            window.onmouseup = () => {
                document.removeEventListener('mousemove', onMouseMove);
                window.onmouseup = null;
            };
        };

        header.ondragstart = () => false;

        minimizeButton.onclick = () => {
            window.style.display = 'none';
        };

        maximizeButton.onclick = () => {
            if (window.classList.contains('maximized')) {
                window.classList.remove('maximized');
            } else {
                window.classList.add('maximized');
            }
        };

        closeButton.onclick = () => {
            window.style.display = 'none';
            const taskbarIcon = document.querySelector(`#taskbar-icons .taskbar-icon[data-app="${window.id}"]`);
            if (taskbarIcon) {
                taskbarIcon.remove();
            }
        };
    });

    // タスクバーアイコンの表示
    const taskbarIcons = document.getElementById('taskbar-icons');
    const startMenu = document.getElementById('start-menu');
    const startButton = document.getElementById('start-button');

    startButton.onclick = () => {
        startMenu.style.display = startMenu.style.display === 'none' ? 'flex' : 'none';
    };

    document.querySelectorAll('.start-menu-app').forEach(app => {
        app.onclick = () => {
            const appId = app.id.replace('start-', '') + '-window';
            const appWindow = document.getElementById(appId);
            if (appWindow) {
                appWindow.style.display = 'flex';
                startMenu.style.display = 'none';
                if (!document.querySelector(`#taskbar-icons .taskbar-icon[data-app="${appWindow.id}"]`)) {
                    const taskbarIcon = document.createElement('div');
                    taskbarIcon.classList.add('taskbar-icon');
                    taskbarIcon.dataset.app = appWindow.id;
                    taskbarIcon.style.backgroundImage = `url('img/${app.id.replace('start-', '')}.png')`;
                    taskbarIcons.appendChild(taskbarIcon);

                    taskbarIcon.onclick = () => {
                        appWindow.style.display = appWindow.style.display === 'none' ? 'flex' : 'none';
                        taskbarIcon.classList.toggle('active');
                    };
                }
            }
        };
    });

    // メモ帳の保存機能
    const notepadContent = document.getElementById('notepad-content');
    const saveNotepad = document.getElementById('save-notepad');

    saveNotepad.onclick = () => {
        const content = notepadContent.value;
        localStorage.setItem('notepadContent', content);
        alert('メモが保存されました');
    };

    // メモ帳の初期表示
    const savedNotepadContent = localStorage.getItem('notepadContent');
    if (savedNotepadContent) {
        notepadContent.value = savedNotepadContent;
    }

    // カメラの撮影機能
    const takePhotoButton = document.getElementById('take-photo');
    const photoDisplay = document.getElementById('photo-display');
    const photoInput = document.getElementById('photo-input');

    takePhotoButton.onclick = () => {
        photoInput.click();
    };

    photoInput.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            photoDisplay.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    // ブラウザの機能
    const browserContent = document.getElementById('browser-content');
    const browserUrlInput = document.getElementById('browser-url');
    const goUrlButton = document.getElementById('go-url');
    const backUrlButton = document.getElementById('back-url');
    const forwardUrlButton = document.getElementById('forward-url');

    goUrlButton.onclick = () => {
        const url = browserUrlInput.value;
        browserContent.src = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    };

    backUrlButton.onclick = () => {
        if (browserContent.contentWindow.history.length > 1) {
            browserContent.contentWindow.history.back();
        }
    };

    forwardUrlButton.onclick = () => {
        browserContent.contentWindow.history.forward();
    };

    // 時計の表示
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateTime, 1000);
    updateTime();

    // ウィジェットの初期表示
    const widgetContent = document.querySelector('#widget-window .window-content');
    widgetContent.innerHTML = `
        <h2>天気</h2>
        <p>今日は晴れです。</p>
        <h2>ニュース</h2>
        <p>地元のニュースを表示中...</p>
    `;

    // カレンダーの表示
    const calendarDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarWindow = document.getElementById('calendar-window');
    const calendarDate = document.getElementById('calendar-date');

    function updateCalendar() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        let calendarHTML = '';
        calendarHTML += `<div>${year}/${month + 1}</div>`;
        calendarHTML += '<div class="calendar-days">';
        calendarDays.forEach(day => calendarHTML += `<div>${day}</div>`);
        calendarHTML += '</div>';

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarHTML += '<div></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarHTML += `<div>${day}</div>`;
        }

        calendarDate.innerHTML = calendarHTML;
    }

    updateCalendar();

    // スタートメニューの初期表示
    const startMenuApps = document.querySelectorAll('.start-menu-app');
    startMenuApps.forEach(app => {
        app.addEventListener('mouseenter', () => {
            const appId = app.id.replace('start-', '') + '-window';
            const appWindow = document.getElementById(appId);
            if (appWindow && appWindow.style.display === 'none') {
                app.classList.add('highlighted');
            }
        });

        app.addEventListener('mouseleave', () => {
            app.classList.remove('highlighted');
        });
    });
});
// 電卓のJavaScript関数
let calculatorDisplay = document.getElementById('calculator-display');
let calculatorMemory = '';
let calculatorOperator = '';

function appendNumber(number) {
    calculatorDisplay.value += number;
}

function appendOperator(operator) {
    calculatorMemory = calculatorDisplay.value;
    calculatorOperator = operator;
    calculatorDisplay.value = '';
}

function clearCalculator() {
    calculatorDisplay.value = '';
    calculatorMemory = '';
    calculatorOperator = '';
}

function calculate() {
    let result;
    const num1 = parseFloat(calculatorMemory);
    const num2 = parseFloat(calculatorDisplay.value);

    switch (calculatorOperator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return;
    }

    calculatorDisplay.value = result;
}
