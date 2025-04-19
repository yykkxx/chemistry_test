
// chemistry_challenge_contest/frontend/js/game.js
class ChemistryGame {
  constructor() {
    this.difficultyConfig = {
      easy: { time: 60, color: '#4ade80', points: 10 },
      medium: { time: 45, color: '#60a5fa', points: 20 },
      hard: { time: 30, color: '#f87171', points: 40 },
      expert: { time: 20, color: '#c084fc', points: 60 }
    };
    
    this.state = {
      difficulty: null,
      score: 0,
      highScore: 0,
      timeLeft: 0,
      timer: null,
      currentQuestion: null,
      selectedOption: null,
      questionsAnswered: 0,
      correctAnswers: 0,
      isAnswering: false,
      isUnlimitedMode: false
    };
    
    this.loadHighScore();
    this.initEventListeners();
  }

  loadHighScore() {
    const savedHighScore = localStorage.getItem('chemistryGameHighScore');
    if (savedHighScore) {
      this.state.highScore = parseInt(savedHighScore, 10);
      this.updateUI('high-score', this.state.highScore);
    }
  }

  saveHighScore() {
    if (this.state.score > this.state.highScore) {
      this.state.highScore = this.state.score;
      localStorage.setItem('chemistryGameHighScore', this.state.highScore);
      this.updateUI('high-score', this.state.highScore);
    }
  }

  startGame(difficulty, isUnlimited = false) {
    // 清除任何存在的计时器
    this.clearTimer();
    
    this.state.difficulty = difficulty;
    this.state.isUnlimitedMode = isUnlimited;
    this.state.score = 0;
    this.state.questionsAnswered = 0;
    this.state.correctAnswers = 0;
    
    if (this.state.isUnlimitedMode) {
      this.state.timeLeft = Infinity;
      document.getElementById('timer').textContent = '∞';
      document.getElementById('timer-container').classList.add('hidden');
    } else {
      this.state.timeLeft = this.difficultyConfig[difficulty].time;
      document.getElementById('timer').textContent = this.state.timeLeft;
      document.getElementById('timer-container').classList.remove('hidden');
    }
    
    this.updateUI('score', this.state.score);
    this.updateTimerBar(100, false);
    this.generateQuestion();
    
    if (!this.state.isUnlimitedMode) {
      this.startTimer();
    }
  }

  startTimer() {
    this.clearTimer();
    
    const startTime = this.state.timeLeft;
    const timerBar = document.getElementById('timer-bar');
    
    this.state.timer = setInterval(() => {
      this.state.timeLeft--;
      
      if (this.state.timeLeft <= 0) {
        this.clearTimer();
        this.showGameOver();
        return;
      }
      
      this.updateUI('timer', this.state.timeLeft);
      const percentage = (this.state.timeLeft / startTime) * 100;
      this.updateTimerBar(percentage, this.state.timeLeft <= 10);
    }, 1000);
  }

  clearTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.state.timer = null;
    }
  }

  updateTimerBar(percentage, isPulsing) {
    const timerBar = document.getElementById('timer-bar');
    const timerDisplay = document.getElementById('timer');
    
    timerBar.style.width = `${Math.max(0, percentage)}%`;
    
    if (isPulsing) {
      timerDisplay.classList.add('timer-pulse');
      timerBar.classList.add('bg-red-500');
      timerBar.classList.remove('bg-green-500', 'bg-blue-500');
    } else {
      timerDisplay.classList.remove('timer-pulse');
      timerBar.classList.remove('bg-red-500');
      
      if (percentage > 60) {
        timerBar.classList.add('bg-green-500');
        timerBar.classList.remove('bg-blue-500');
      } else {
        timerBar.classList.add('bg-blue-500');
        timerBar.classList.remove('bg-green-500');
      }
    }
  }

  generateQuestion() {
    this.state.isAnswering = false;
    this.state.selectedOption = null;
    
    const question = generateChemistryQuestion(this.state.difficulty);
    this.state.currentQuestion = question;
    
    this.renderQuestion(question);
    
    // 确保提交按钮正确显示
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.classList.remove('hidden');
    submitBtn.style.display = 'inline-flex';
    
    document.getElementById('next-question-btn').classList.add('hidden');
    document.getElementById('explanation-container').classList.add('hidden');
  }

  renderQuestion(question) {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    
    // 添加难度标签
    const difficultyTag = `<span class="difficulty-tag ${this.state.difficulty} px-3 py-1 rounded-full text-xs font-medium">
      ${this.state.difficulty.toUpperCase()}
    </span>`;
    
    // 渲染问题
    questionContainer.innerHTML = `
      <div class="w-full text-center">
        <div class="mb-3">${difficultyTag}</div>
        <h2 class="text-xl font-semibold mb-6">${question.question}</h2>
      </div>
      <div id="question-actions" class="question-actions absolute bottom-6">
        <button id="submit-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition" disabled>
          提交答案
        </button>
        <button id="next-question-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition hidden">
          下一题
        </button>
      </div>
    `;
    
    // 渲染选项
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option bg-gray-700 hover:bg-gray-600 p-4 rounded-lg cursor-pointer transition';
      optionElement.innerHTML = `<span class="option-text">${option.text}</span>`;
      optionElement.dataset.index = index;
      
      optionElement.addEventListener('click', () => this.selectOption(index));
      optionsContainer.appendChild(optionElement);
    });
    
    // 重新绑定提交按钮事件
    document.getElementById('submit-btn').addEventListener('click', () => this.submitAnswer());
    document.getElementById('next-question-btn').addEventListener('click', () => this.nextQuestion());
  }

  selectOption(index) {
    if (this.state.isAnswering) return;
    
    const options = document.querySelectorAll('#options-container .option');
    options.forEach((option, i) => {
      option.classList.remove('bg-indigo-600', 'bg-gray-700');
      option.classList.add(i === index ? 'bg-indigo-600' : 'bg-gray-700');
    });
    
    this.state.selectedOption = index;
    
    // 启用提交按钮
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = false;
    submitBtn.classList.remove('hidden');
    submitBtn.style.display = 'inline-flex';
  }

  submitAnswer() {
    if (this.state.isAnswering || this.state.selectedOption === null) return;
    
    this.state.isAnswering = true;
    const isCorrect = this.state.currentQuestion.options[this.state.selectedOption].correct;
    const options = document.querySelectorAll('#options-container .option');
    
    options.forEach((option, index) => {
      if (this.state.currentQuestion.options[index].correct) {
        option.classList.add('correct-answer');
      } else if (index === this.state.selectedOption) {
        option.classList.add('wrong-answer');
      }
      option.classList.remove('bg-indigo-600', 'bg-gray-700', 'hover:bg-gray-600');
      option.style.cursor = 'default';
      
      // 移除选项点击事件
      option.replaceWith(option.cloneNode(true));
    });
    
    this.state.questionsAnswered++;
    if (isCorrect) {
      this.state.correctAnswers++;
      const points = this.difficultyConfig[this.state.difficulty].points;
      // 无限模式得分加倍
      this.state.score += this.state.isUnlimitedMode ? points * 2 : points;
      this.updateUI('score', this.state.score);
    }
    
    // 显示解释
    document.getElementById('explanation-text').textContent = this.state.currentQuestion.explanation;
    document.getElementById('explanation-container').classList.remove('hidden');
    
    // 隐藏提交按钮，显示下一题按钮
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.classList.add('hidden');
    submitBtn.style.display = 'none';
    
    document.getElementById('next-question-btn').classList.remove('hidden');
    
    // 保存最高分
    this.saveHighScore();
  }

  nextQuestion() {
    if (this.state.isUnlimitedMode) {
      this.generateQuestion();
      return;
    }
    
    this.clearTimer();
    this.state.timeLeft = this.difficultyConfig[this.state.difficulty].time;
    this.updateUI('timer', this.state.timeLeft);
    this.updateTimerBar(100, false);
    
    setTimeout(() => {
      this.startTimer();
      this.generateQuestion();
    }, 50);
  }

  showGameOver() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">游戏结束!</h2>
        <p class="mb-2">你的得分: <span class="score-display">${this.state.score}</span></p>
        <p class="mb-6">正确率: ${Math.round((this.state.correctAnswers / this.state.questionsAnswered) * 100)}%</p>
        <button id="restart="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition">
          重新开始
        </button>
      </div>
    `;
    
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('explanation-container').classList.add('hidden');
    
    // 隐藏提交按钮
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.classList.add('hidden');
    submitBtn.style.display = 'none';
    
    document.getElementById('restart-btn').addEventListener('click', () => {
      this.startGame(this.state.difficulty, this.state.isUnlimitedMode);
    });
  }

  updateUI(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = value;
  }

  initEventListeners() {
    // 已在renderQuestion中重新绑定了事件，这里不需要重复绑定
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.game = new ChemistryGame();
});
