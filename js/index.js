class Timer {
    constructor() {

        this.iconsPath = './assets/icons/sprite.svg#';

        this.hoursInput = null;
        this.minutesInput = null;
        this.secondsInput = null;
        this.editButton = null;
        this.runButton = null;
        this.rerunButton = null;
        this.alarm = null;
        this.alarmButtons = null;
        this.timeInputs = null;

        this.isEdit = true;
        this.isCounting = false;
        this.isRunning = false;

        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.totalTime = 0;
        this.currentTime = 0;
        this.interval = null;

        this.UiSelectors = {
            hoursInput: 'hours',
            minutesInput: 'minutes',
            secondsInput: 'seconds',
            editButton: '[data-edit]',
            runButton: '[data-run]',
            rerunButton: '[data-rerun]',
            alarm: '[data-audio]',
            alarmButton: '[data-alarm]',
            timeInput: '[data-input]'
        }
    }

    initializeTimer() {
        this.hoursInput = document.getElementById(this.UiSelectors.hoursInput);
        this.minutesInput = document.getElementById(this.UiSelectors.minutesInput);
        this.secondsInput = document.getElementById(this.UiSelectors.secondsInput);
        this.editButton = document.querySelector(this.UiSelectors.editButton);
        this.runButton = document.querySelector(this.UiSelectors.runButton);
        this.rerunButton = document.querySelector(this.UiSelectors.rerunButton);
        this.alarmButton = document.querySelector(this.UiSelectors.alarmButton);
        this.alarm = document.querySelector(this.UiSelectors.alarm);
        this.timeInputs = document.querySelectorAll(this.UiSelectors.timeInput);

        this.addListeners();
    }

    addListeners() {
        this.editButton.addEventListener('click', () => this.switchEditButton());
        this.runButton.addEventListener('click', () => this.switchRunButton());
        this.alarmButton.addEventListener('click', ()=> this.resetTimer());
        this.rerunButton.addEventListener('click', () => this.refresh());
    }

    switchEditButton() {
        this.isEdit =! this.isEdit;
        if(!this.isEdit) {
            
          
        this.editButton.querySelector('use').setAttribute('xlink:href', `${this.iconsPath}edit_black_24dp`);
        this.runButton.removeAttribute('disabled');
        this.timeInputs.forEach(input => input.setAttribute('disabled', '')); 
        this.getInputValues();
        this.setInputValues();
            return;
        }

        this.disabledElementsForEdit();
        

    }

    disabledElementsForEdit() {
        this.editButton.querySelector('use').setAttribute('xlink:href', `${this.iconsPath}done_black_24dp`);
        this.runButton.setAttribute('disabled', '');
        this.timeInputs.forEach(input => input.removeAttribute('disabled'));
    }

    switchRunButton() {
        this.isRunning = !this.isRunning;
        if(this.isRunning) {
        this.runButton.querySelector('use').setAttribute('xlink:href', `${this.iconsPath}pause_black_24dp`);
        this.editButton.setAttribute('disabled', '');
        this.interval = setInterval(() => this.updateTime(), 1000);
        return;
        }

        clearInterval(this.interval);
        this.editButton.removeAttribute('disabled');
        this.runButton.querySelector('use').setAttribute('xlink:href', `${this.iconsPath}play_arrow_black_24dp`);

    }

    updateTime() {
        if(this.currentTime) {
            this.currentTime--;
            this.setInputValues();
            return;
        }

        clearInterval(this.interval);
        // this.disabledElementsForEdit();
        // this.runButton.querySelector('use').setAttribute('xlink:href', `${this.iconsPath}play_arrow_black_24dp`);
        // this.isEdit = true;
        // this.isRunning = false;
        this.alarm.play();
        this.alarmButton.classList.remove('hide');
    }

    getInputValues() {
        this.hours = parseInt(this.hoursInput.value);
        this.minutes = parseInt(this.minutesInput.value);
        this.seconds = parseInt(this.secondsInput.value);

        this.calculateTotalTime();
    }

    setInputValues() {

        const seconds = this.currentTime % 60;
        const minutes = (this.currentTime / 60) % 60;
        const hours = this.currentTime / 3600;
        
        this.hoursInput.value = hours <10 ? `0${Math.floor(hours).toFixed(0)}` : Math.floor(hours).toFixed(0);
        this.minutesInput.value = minutes <10 ? `0${Math.floor(minutes).toFixed(0)}` : Math.floor(minutes).toFixed(0);
        this.secondsInput.value = seconds <10 ? `0${Math.floor(seconds).toFixed(0)}` : Math.floor(seconds).toFixed(0);
    }

    calculateTotalTime() {
        this.totalTime = this.seconds + this.minutes*60 + this.hours * 3600;
        this.currentTime = this.totalTime;
    }

    refresh() {
        this.currentTime = this.totalTime;
        this.setInputValues();
    }

    resetTimer() {
        this.alarm.pause();
        this.alarmButton.classList.add('hide');
        this.disabledElementsForEdit();
        this.runButton.querySelector('use').setAttribute('xlink:href', `${this.iconsPath}play_arrow_black_24dp`);
        this.isEdit = true;
        this.isRunning = false;
        this.totalTime = 0;
        this.currentTime = 0;
    }

}