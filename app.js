document.addEventListener('DOMContentLoaded', () => {
    // ロード画面を隠す
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('lock-screen').style.display = 'block';
    }, 3000); // 3秒後にローディング画面を隠す

    // ロック画面解除
    document.getElementById('unlock-button').addEventListener('click', () => {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
    });

    // 時間と日付の表示
    function updateDateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString('ja-JP', {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
        });

        document.getElementById('time').textContent = time;
        document.getElementById('date').textContent = date;
        document.getElementById('today-date').textContent = date;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // アプリ起動ロジック
    const windows = {
        'start-file-explorer': 'file-explorer-window',
        'start-notepad': 'notepad-window',
        'start-calendar': 'calendar-window',
        'start-camera': 'camera-window',
        'start-browser': 'browser-window',
        'start-control-panel': 'control-panel-window',
        'start-command-prompt': 'command-prompt-window',
        'start-setup': 'setup-window',
        'start-paint': 'paint-window'
    };

    Object.keys(windows).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            document.getElementById(windows[id]).style.display = 'block';
        });
    });

    // ウィンドウを閉じる
    document.querySelectorAll('.window .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (event) => {
            event.target.closest('.window').style.display = 'none';
        });
    });

    // メモ帳の保存
    document.getElementById('save-notepad').addEventListener('click', () => {
        const content = document.getElementById('notepad-content').value;
        localStorage.setItem('notepad-content', content);
        alert('メモ帳の内容が保存されました。');
    });

    // 保存されたメモ帳の内容を読み込む
    const savedContent = localStorage.getItem('notepad-content');
    if (savedContent) {
        document.getElementById('notepad-content').value = savedContent;
    }

    // カメラの動作
    const video = document.getElementById('camera-stream');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error('カメラを起動できませんでした。', err);
        });

    document.getElementById('capture-button').addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'capture.png';
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    });

    // ブラウザの初期ページ設定
    const browserFrame = document.getElementById('browser-frame');
    browserFrame.src = 'https://www.example.com'; // 初期ページは例として設定

    // コマンドプロンプトの動作
    const commandInput = document.getElementById('command-input');
    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            // コマンドの処理を追加する
            commandInput.value = '';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // ここに追加するコードを記述します
    // タスクバーのアイコン表示
    const taskbarIcons = document.querySelectorAll('.taskbar-icon');
    taskbarIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const appId = icon.dataset.appId;
            const windowId = icon.dataset.windowId;
            const windowElement = document.getElementById(windowId);
            if (windowElement.style.display === 'none') {
                windowElement.style.display = 'block';
            } else {
                windowElement.style.display = 'none';
            }
        });
    });

    // スタートメニューのトグル機能
    const startMenuToggle = document.getElementById('start-menu-toggle');
    const startMenu = document.getElementById('start-menu');
    startMenuToggle.addEventListener('click', () => {
        if (startMenu.style.display === 'none' || startMenu.style.display === '') {
            startMenu.style.display = 'block';
        } else {
            startMenu.style.display = 'none';
        }
    });
});

// 背景画像の設定
document.body.style.backgroundImage = 'url("img/windows10.png")';
