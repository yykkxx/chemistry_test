
// chemistry_challenge_contest/frontend/js/game.js
class ChemistryGame {
  constructor() {
    this.config = {
      timerInterval: 1000,
      maxQuestionRetries: 20,
      difficulties: {
        easy: { time: 60, color: '#4ade80', points: 10, label: '初级' },
        medium: { time: 45, color: '#60a5fa', points: 20, label: '中级' },
        hard: { time: 30, color: '#f87171', points: 40, label: '高级' },
        expert: { time: 20, color: '#c084fc', points: 60, label: '专家' }
      },
      timerBarThresholds: {
        low: 30,
        medium: 60,
        high: 100
      },
      sounds: {
        correct: new Audio('https://8bituniverse.com/files/sounds/correct.mp3'),
        wrong: new Audio('https://8bituniverse.com/files/sounds/wrong.mp3'),
        gameOver: new Audio('https://8bituniverse.com/files/sounds/game-over.mp3'),
        tick: new Audio('https://8bituniverse.com/files/sounds/tick.mp3')
      }
    };
    
    this.state = {
      difficulty: null,
      score: 0,
      highScore: 0,
      timeLeft: 0,
      timer: null,
      currentQuestion: null,
      selectedOptions: [], // 改为数组支持多选
      questionsAnswered: 0,
      correctAnswers: 0,
      isAnswering: false,
      isUnlimitedMode: false,
      isSoundEnabled: true,
      streakCount: 0,
      maxStreak: 0,
      comboMultiplier: 1,
      lastAnswerTime: 0
    };
    
    this.loadHighScore();
    this.initEventListeners();
    this.initSounds();
  }

  // 初始化事件监听
  initEventListeners() {
    document.querySelectorAll('.option').forEach((option, index) => {
      option.addEventListener('click', () => this.selectOption(index));
    });
  }

  // 初始化声音设置
  initSounds() {
    // 预加载声音
    Object.values(this.config.sounds).forEach(sound => {
      sound.load();
      sound.volume = 0.5;
    });
  }

  // 开始游戏方法，修复无法显示题目的问题
  startGame(difficulty, isUnlimited = false) {
    if (!this.config.difficulties[difficulty]) {
      console.error('Invalid difficulty level:', difficulty);
      return;
    }
    
    // 清除之前的定时器
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    
    // 重置状态
    this.state.difficulty = difficulty;
    this.state.isUnlimitedMode = isUnlimited;
    this.state.timeLeft = this.config.difficulties[difficulty].time;
    this.state.score = 0;
    this.state.questionsAnswered = 0;
    this.state.correctAnswers = 0;
    this.state.selectedOptions = [];
    this.state.isAnswering = false;
    this.state.streakCount = 0;
    this.state.comboMultiplier = 1;
    this.state.lastAnswerTime = new Date().getTime();
    
    // 更新UI
    this.updateUI('score', 0);
    this.updateTimerDisplay();
    this.updateTimerBarColor();
    
    // 高亮当前难度按钮
    this.highlightDifficultyButton(difficulty);
    
    // 加载第一个问题
    this.loadQuestion();
    
    // 如果不是无限模式，启动定时器
    if (!isUnlimited) {
      this.startTimer();
    } else {
      // 无限模式时隐藏计时器脉冲效果
      document.getElementById('timer').classList.remove('timer-pulse');
    }
  }

  // 加载问题方法，确保题目正确显示
  loadQuestion() {
    try {
      // 从问题生成器获取问题
      const question = generateChemistryQuestion(this.state.difficulty);
      
      if (!question) {
        console.error('Failed to generate question');
        return;
      }
      
      this.state.currentQuestion = question;
      this.state.selectedOptions = [];
      this.state.isAnswering = false;
      
      // 更新问题容器
      const questionContainer = document.getElementById('question-container');
      questionContainer.innerHTML = '';
      
      // 创建难度标签
      const difficultyConfig = this.config.difficulties[this.state.difficulty];
      const difficultyBadge = document.createElement('div');
      difficultyBadge.className = `inline-block px-3 py-1 mb-4 rounded-full text-xs font-semibold difficulty-badge`;
      difficultyBadge.style.backgroundColor = difficultyConfig.color;
      difficultyBadge.style.color = '#111827';
      difficultyBadge.textContent = difficultyConfig.label;
      questionContainer.appendChild(difficultyBadge);
      
      // 创建问题标题
      const questionTitle = document.createElement('h2');
      questionTitle.className = 'text-2xl font-semibold mb-6 fade-in';
      questionTitle.textContent = question.question;
      questionContainer.appendChild(questionTitle);
      
      // 渲染选项
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.innerHTML = '';
      
      question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option cursor-pointer p-4 mb-4 rounded-xl fade-in';
        optionElement.style.animationDelay = `${index * 0.1}s`;
        
        const optionText = document.createElement('p');
        optionText.className = 'text-lg';
        optionText.innerHTML = option.text;
        
        optionElement.appendChild(optionText);
        optionsContainer.appendChild(optionElement);
        
        // 为每个选项添加点击事件
        optionElement.addEventListener('click', () => this.selectOption(index));
      });
      
      // 重置按钮状态
      document.getElementById('submit-btn').disabled = true;
      document.getElementById('submit-btn').classList.remove('hidden');
      document.getElementById('next-question-btn').classList.add('hidden');
      
      // 隐藏解释容器
      document.getElementById('explanation-container').classList.add('hidden');
      
    } catch (error) {
      console.error('Error loading question:', error);
    }
  }

  // 选择选项
  selectOption(index) {
    if (this.state.isAnswering) return;
    
    const options = document.querySelectorAll('.option');
    const option = options[index];
    const isMultiple = this.state.currentQuestion?.multipleCorrect;
    
    if (isMultiple) {
      // 多选逻辑
      if (this.state.selectedOptions.includes(index)) {
        // 取消选择
        this.state.selectedOptions = this.state.selectedOptions.filter(i => i !== index);
        option.classList.remove('selected', 'animate__animated', 'animate__pulse');
      } else {
        // 添加选择
        this.state.selectedOptions.push(index);
        option.classList.add('selected', 'animate__animated', 'animate__pulse');
      }
    } else {
      // 单选逻辑
      options.forEach((opt, i) => {
        if (i === index) {
          opt.classList.add('selected', 'animate__animated', 'animate__pulse');
        } else {
          opt.classList.remove('selected', 'animate__animated', 'animate__pulse');
        }
      });
      this.state.selectedOptions = [index];
    }
    
    // 启用提交按钮
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = this.state.selectedOptions.length === 0;
    if (!submitBtn.disabled) {
      submitBtn.classList.add('animate__animated', 'animate__heartBeat');
      setTimeout(() => {
        submitBtn.classList.remove('animate__heartBeat');
      }, 1000);
    }
  }

  // 提交答案
  submitAnswer() {
    if (this.state.isAnswering || this.state.selectedOptions.length === 0) return;
    
    this.state.isAnswering = true;
    this.state.questionsAnswered++;
    
    const question = this.state.currentQuestion;
    const isMultiple = question.multipleCorrect;
    let isCorrect = false;
    
    if (isMultiple) {
      // 多选题判定逻辑
      const correctIndices = question.options
        .map((opt, i) => opt.correct ? i : null)
        .filter(i => i !== null);
      
      // 检查选择的选项是否完全匹配正确答案
      const allCorrectSelected = this.state.selectedOptions.every(optIndex => 
        question.options[optIndex].correct
      );
      const allCorrectOptionsSelected = correctIndices.every(correctIndex => 
        this.state.selectedOptions.includes(correctIndex)
      );
      
      isCorrect = allCorrectSelected && allCorrectOptionsSelected;
    } else {
      // 单选题判定逻辑
      isCorrect = question.options[this.state.selectedOptions[0]].correct;
    }
    
    const answerTime = new Date().getTime();
    const timeTaken = this.state.lastAnswerTime > 0 ? answerTime - this.state.lastAnswerTime : 0;
    this.state.lastAnswerTime = answerTime;
    
    if (isCorrect) {
      this.state.streakCount++;
      this.state.maxStreak = Math.max(this.state.maxStreak, this.state.streakCount);
      this.state.comboMultiplier = Math.min(1 + (this.state.streakCount - 1) * 0.1, 2.0);
      
      const basePoints = this.config.difficulties[this.state.difficulty].points;
      const pointsEarned = Math.round(basePoints * this.state.comboMultiplier);
      
      this.state.score += pointsEarned;
      this.state.correctAnswers++;
      
      this.updateUI('score', this.state.score);
      this.playSound('correct');
      this.showPointsAnimation(pointsEarned);
    } else {
      this.state.streakCount = 0;
      this.state.comboMultiplier = 1.0;
      this.playSound('wrong');
    }
    
    this.showAnswerFeedback(isCorrect);
    this.saveHighScore();
  }

  // 显示答案反馈
  showAnswerFeedback(isCorrect) {
    const options = document.querySelectorAll('.option');
    const question = this.state.currentQuestion;
    
    options.forEach((option, index) => {
      if (question.options[index].correct) {
        option.classList.add('bg-green-600', 'hover:bg-green-600', 'animate__animated', 'animate__bounceIn');
        option.style.boxShadow = '0 0 15px rgba(74, 222, 128, 0.5)';
      } else if (this.state.selectedOptions.includes(index)) {
        option.classList.add('bg-red-600', 'hover:bg-red-600', 'animate__animated', 'animate__shakeX');
        option.style.boxShadow = '0 0 15px rgba(248, 113, 113, 0.5)';
      }
      option.style.cursor = 'default';
    });
    
    document.getElementById('submit-btn').classList.add('hidden');
    document.getElementById('next-question-btn').classList.remove('hidden');
    document.getElementById('next-question-btn').classList.add('animate__animated', 'animate__bounceIn');
    
    const explanationContainer = document.getElementById('explanation-container');
    explanationContainer.classList.remove('hidden');
    explanationContainer.classList.add('animate__animated', 'animate__fadeInUp');
    document.getElementById('explanation-text').textContent = this.state.currentQuestion.explanation;
  }

  // 进入下一题
  nextQuestion() {
    document.getElementById('next-question-btn').classList.add('hidden');
    this.loadQuestion();
  }

  // 开始计时器
  startTimer() {
    this.state.timer = setInterval(() => {
      if (this.state.timeLeft <= 0) {
        this.endGame();
        return;
      }
      
      this.state.timeLeft--;
      
      if (this.state.timeLeft <= 10) {
        this.playSound('tick');
      }
      
      this.updateTimerDisplay();
    }, this.config.timerInterval);
  }

  // 结束游戏
  endGame() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    
    this.playSound('gameOver');
    
    // 显示游戏结束弹窗
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
      <div class="text-center py-8">
        <h2 class="text-3xl font-bold mb-4 animate__animated animate__fadeIn">游戏结束</h2>
        <p class="mb-2">得分: <span class="font-bold text-2xl">${this.state.score}</span></p>
        <p class="mb-2">回答问题数: ${this.state.questionsAnswered}</p>
        <p class="mb-2">正确答题数: ${this.state.correctAnswers}</p>
        <p class="mb-4">正确率: ${Math.round((this.state.correctAnswers / Math.max(1, this.state.questionsAnswered)) * 100)}%</p>
        
        <button id="restart-game" class="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition shadow-lg mt-4 animate__animated animate__bounceIn">
          再次挑战
        </button>
      </div>
    `;
    
    // 添加重新开始事件监听
    document.getElementById('restart-game')?.addEventListener('click', () => {
      this.startGame(this.state.difficulty, this.state.isUnlimitedMode);
    });
    
    // 清空选项区域
    document.getElementById('options-container').innerHTML = '';
    
    // 隐藏提交和下一题按钮
    document.getElementById('submit-btn').classList.add('hidden');
    document.getElementById('next-question-btn').classList.add('hidden');
    
    // 隐藏解释容器
    document.getElementById('explanation-container').classList.add('hidden');
  }

  // 更新计时器显示
  updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = this.state.isUnlimitedMode ? '∞' : this.state.timeLeft;
    
    const percentage = this.state.isUnlimitedMode ? 100 : (this.state.timeLeft / this.config.difficulties[this.state.difficulty].time) * 100;
    document.getElementById('timer-bar').style.width = `${percentage}%`;
    
    this.updateTimerBarColor();
  }

  // 更新计时器颜色
  updateTimerBarColor() {
    const timerBar = document.getElementById('timer-bar');
    const percentage = this.state.isUnlimitedMode ? 100 : (this.state.timeLeft / this.config.difficulties[this.state.difficulty].time) * 100;
    
    if (percentage <= this.config.timerBarThresholds.low) {
      timerBar.classList.remove('bg-yellow-500', 'bg-green-500');
      timerBar.classList.add('bg-red-500');
      document.getElementById('timer').classList.add('timer-pulse');
    } else if (percentage <= this.config.timerBarThresholds.medium) {
      timerBar.classList.remove('bg-red-500', 'bg-green-500');
      timerBar.classList.add('bg-yellow-500');
      document.getElementById('timer').classList.remove('timer-pulse');
    } else {
      timerBar.classList.remove('bg-red-500', 'bg-yellow-500');
      timerBar.classList.add('bg-green-500');
      document.getElementById('timer').classList.remove('timer-pulse');
    }
  }

  // 播放音效
  playSound(sound) {
    if (this.state.isSoundEnabled && this.config.sounds[sound]) {
      this.config.sounds[sound].currentTime = 0;
      this.config.sounds[sound].play().catch(e => console.warn('Sound playback error:', e));
    }
  }

  // 更新UI元素
  updateUI(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = value;
    }
  }

  // 高亮当前难度按钮
  highlightDifficultyButton(difficulty) {
    const buttons = {
      easy: document.getElementById('easy-btn'),
      medium: document.getElementById('medium-btn'),
      hard: document.getElementById('hard-btn'),
      expert: document.getElementById('expert-btn')
    };
    
    Object.keys(buttons).forEach(key => {
      if (buttons[key]) {
        if (key === difficulty) {
          buttons[key].classList.add('ring-4', 'ring-white', 'ring-opacity-50');
        } else {
          buttons[key].classList.remove('ring-4', 'ring-white', 'ring-opacity-50');
        }
      }
    });
  }

  // 显示积分动画
  showPointsAnimation(points) {
    const pointsDisplay = document.createElement('div');
    pointsDisplay.className = 'fixed text-3xl font-bold animate__animated animate__fadeOutUp';
    pointsDisplay.style.color = this.config.difficulties[this.state.difficulty].color;
    pointsDisplay.style.left = `${Math.random() * 80 + 10}%`;
    pointsDisplay.style.top = `${Math.random() * 30 + 40}%`;
    pointsDisplay.style.zIndex = '100';
    pointsDisplay.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    pointsDisplay.textContent = `+${points}`;
    
    document.body.appendChild(pointsDisplay);
    
    setTimeout(() => {
      document.body.removeChild(pointsDisplay);
    }, 1500);
  }

  // 保存最高分
  saveHighScore() {
    if (this.state.score > this.state.highScore) {
      this.state.highScore = this.state.score;
      localStorage.setItem('chemistryGameHighScore', this.state.score);
      this.updateUI('high-score', this.state.highScore);
    }
  }

  // 加载最高分
  loadHighScore() {
    const savedHighScore = localStorage.getItem('chemistryGameHighScore');
    if (savedHighScore) {
      this.state.highScore = parseInt(savedHighScore, 10);
      this.updateUI('high-score', this.state.highScore);
    }
  }
}
