// Pacman.js - Real-time version integrated with jsPsych

// 假设 Mazelevel.js 已加载
if (typeof mazeLevels === 'undefined') {
    console.error('mazeLevels not defined - ensure Mazelevel.js is loaded before Pacman.js');
}

// --- 全局变量配置 ---
var currentLevel = 0;
// 复制一份地图数据以防修改原数组
var currentMaze = [];
var pacmanX = 1;
var pacmanY = 1;
var ghostX = 7;
var ghostY = 7;
var gameState = 'playing';  // 'playing', 'win', 'lose', 'timeout'
var blockSize = 40;
var gameStartTime = 0;      // 将在 trial 开始时赋值
var timeLimit = 120 * 1000; // 2分钟限时
var ghostInterval = null;   // 鬼魂移动定时器 ID
var gameCheckInterval = null; // 游戏状态检查定时器 ID
var keyboardListener = null; // 键盘监听器

// 初始化地图工具函数
function initLevel() {
    if (mazeLevels[currentLevel]) {
        currentMaze = mazeLevels[currentLevel].map(row => row.split(''));
    }
}

// --- 绘图函数 ---

function drawMaze(ctx) {
    // 清空画布
    ctx.clearRect(0, 0, 600, 360); // 假设 canvas 宽600 高360

    for (var row = 0; row < currentMaze.length; row++) {
        for (var col = 0; col < currentMaze[row].length; col++) {
            var block = currentMaze[row][col];
            // 兼容 Mazelevel.js 中的两种墙壁字符 '#' 或 '█'
            if (block === '#' || block === '█') {
                ctx.fillStyle = 'rgb(50,50,50)';
                ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (block === '*') {
                ctx.font = '40px Arial';
                ctx.fillStyle = 'orange';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('★', col * blockSize + blockSize / 2, row * blockSize + blockSize / 2);
                ctx.textAlign = 'left';
                ctx.textBaseline = 'alphabetic';
            } else if (block === ' ') {
                ctx.fillStyle = 'rgba(50,50,50,0.05)';
                ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
            }
        }
    }
}

function drawGhost(ctx) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(
        ghostX * blockSize + blockSize / 2,
        ghostY * blockSize + blockSize / 2,
        blockSize / 2 - 2,
        0,
        2 * Math.PI
    );
    ctx.closePath();
    ctx.fill();
}

function drawPacman(ctx) {
    ctx.fillStyle = 'rgb(256,200,0)';
    ctx.beginPath();
    ctx.arc(
        pacmanX * blockSize + blockSize / 2,
        pacmanY * blockSize + blockSize / 2,
        blockSize / 2 - 2,
        0.2 * Math.PI,
        1.8 * Math.PI
    );
    ctx.lineTo(pacmanX * blockSize + blockSize / 2, pacmanY * blockSize + blockSize / 2);
    ctx.fill();
}

function drawMessage(ctx, text, color) {
    ctx.fillStyle = color;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 600 / 2, 360 / 2 - 20);
    ctx.font = 'bold 24px Arial';
    ctx.fillText('2秒后继续...', 600 / 2, 360 / 2 + 30);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
}

function drawTimeUp(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, 600, 360);
    ctx.fillStyle = 'orange';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("TIME'S UP!", 600 / 2, 360 / 2 - 20);
    ctx.font = 'bold 24px Arial';
    ctx.fillText('即将进入下一阶段...', 600 / 2, 360 / 2 + 30);
}

// --- 游戏逻辑函数 ---

function isWall(x, y) {
    if (!currentMaze[y] || !currentMaze[y][x]) return true;
    var cell = currentMaze[y][x];
    return cell === '#' || cell === '█';
}

function resetGameParams() {
    pacmanX = 1;
    pacmanY = 1;
    ghostX = 7;
    ghostY = 7;
    gameState = 'playing';
    initLevel();
}

function checkLogic(ctx) {
    if (gameState !== 'playing') return;

    // 1. 吃豆子
    if (currentMaze[pacmanY][pacmanX] === '*') {
        gameState = 'win';
        fullRender(ctx); // 重绘以去掉星星
        drawMessage(ctx, 'WIN!', 'green');
        
        setTimeout(function() {
            if (gameState === 'timeout') return; // 防止超时后操作
            currentLevel = (currentLevel + 1) % mazeLevels.length;
            resetGameParams();
            fullRender(ctx); // 恢复画面
        }, 2000);
        return;
    }

    // 2. 碰鬼
    if (pacmanX === ghostX && pacmanY === ghostY) {
        gameState = 'lose';
        drawMessage(ctx, 'GAME OVER!', 'red');
        
        setTimeout(function() {
            if (gameState === 'timeout') return;
            resetGameParams();
            fullRender(ctx);
        }, 2000);
    }
}

// 完整的渲染流程
function fullRender(ctx) {
    if (gameState === 'timeout') return;
    drawMaze(ctx);
    drawGhost(ctx);
    if (gameState === 'playing') {
        drawPacman(ctx);
    }
}

// 鬼魂AI
function moveGhost(ctx) {
    if (gameState !== 'playing') return;

    var possibleMoves = [];
    if (!isWall(ghostX, ghostY - 1)) possibleMoves.push({ x: ghostX, y: ghostY - 1 });
    if (!isWall(ghostX, ghostY + 1)) possibleMoves.push({ x: ghostX, y: ghostY + 1 });
    if (!isWall(ghostX - 1, ghostY)) possibleMoves.push({ x: ghostX - 1, y: ghostY });
    if (!isWall(ghostX + 1, ghostY)) possibleMoves.push({ x: ghostX + 1, y: ghostY });

    if (possibleMoves.length > 0) {
        var randomIndex = Math.floor(Math.random() * possibleMoves.length);
        var newPos = possibleMoves[randomIndex];
        ghostX = newPos.x;
        ghostY = newPos.y;
    }

    // 鬼魂移动后检查碰撞并重绘
    fullRender(ctx);
    checkLogic(ctx);
}

// --- JsPsych Trial 定义 ---

var pacmanTrial = {
    type: jsPsychCanvasKeyboardResponse,
    canvas_size: [360, 600], 
    choices: "NO_KEYS", // 关键：禁止按键自动结束 trial
    record_data: false,
    stimulus: function(c) {
        // 初始静态渲染，这里的 c 是由 jsPsych 传入的 canvas 元素
        initLevel();
        var ctx = c.getContext('2d');
        fullRender(ctx);
    },
    prompt: '<p style="color: #000;font-size: 24px;">方向键(↑↓←→)控制 Pacman，吃★胜利！碰鬼失败！</p>',
    on_load: function() {
        // 1. 获取 Canvas 元素 (修复点：使用通用的 querySelector('canvas') 而不是 ID)
        var canvas = document.querySelector('canvas');
        if (!canvas) {
            console.error("Pacman Error: Canvas element not found in on_load");
            return;
        }
        var ctx = canvas.getContext('2d');

        // 2. 初始化计时
        gameStartTime = Date.now();
        resetGameParams();

        // 3. 定义键盘事件 (替代 jsPsych 的自动处理)
        var handleKeys = function(e) {
            if (gameState !== 'playing') return;
            
            // 阻止方向键滚动页面
            if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }

            var newX = pacmanX;
            var newY = pacmanY;

            if (e.key === 'ArrowUp') newY--;
            if (e.key === 'ArrowDown') newY++;
            if (e.key === 'ArrowLeft') newX--;
            if (e.key === 'ArrowRight') newX++;

            // 移动判定
            if (newX >= 0 && newX < currentMaze[0].length && 
                newY >= 0 && newY < currentMaze.length && 
                !isWall(newX, newY)) {
                
                pacmanX = newX;
                pacmanY = newY;
                
                // 玩家移动后立即重绘和检查
                fullRender(ctx);
                checkLogic(ctx);
            }
        };

        // 绑定键盘事件
        document.addEventListener('keydown', handleKeys);
        keyboardListener = handleKeys; // 保存引用以便移除

        // 4. 启动鬼魂自动移动 (800ms一次，参考 Pacman.html)
        ghostInterval = setInterval(function() {
            moveGhost(ctx);
        }, 800);

        // 5. 启动超时检查 (每100ms检查一次)
        gameCheckInterval = setInterval(function() {
            var elapsedTime = Date.now() - gameStartTime;
            
            // 检查是否超时
            if (elapsedTime >= timeLimit) {
                gameState = 'timeout';
                
                // 停止所有计时器和监听器
                clearInterval(ghostInterval);
                clearInterval(gameCheckInterval);
                document.removeEventListener('keydown', keyboardListener);
                
                // 绘制结束画面
                drawTimeUp(ctx);

                // 2秒后自动结束 trial，跳转到下一个实验 block
                setTimeout(function() {
                    jsPsych.finishTrial({
                        final_level: currentLevel,
                        reason: 'timeout'
                    });
                }, 2000);
            }
        }, 100);
    },
    on_finish: function() {
        // 清理资源，防止内存泄漏或影响后续 trial
        if (ghostInterval) clearInterval(ghostInterval);
        if (gameCheckInterval) clearInterval(gameCheckInterval);
        if (keyboardListener) document.removeEventListener('keydown', keyboardListener);
        gameState = 'playing'; // 重置状态给下一次（如果有）
    }
};

// 导出变量
var trial_distractor = {
    timeline: [pacmanTrial]
};