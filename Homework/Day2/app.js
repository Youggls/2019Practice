(function () {
    let originalHour = 0;
    let originalMinute = 0;
    let originalSecond = 0;
    let originalForm = document.getElementById("timeform").innerHTML;
    let stat = 1;
    let isCountUp = true;
    let totalTime = 0;
    let restTime = 0;
    let timmer;
    let hourInput = document.getElementById('hour');
    hourInput.addEventListener('blur', checkHour, false);
    let minuteInput = document.getElementById('minute');
    minuteInput.addEventListener('blur', check, false);
    let secondInput = document.getElementById('second');
    secondInput.addEventListener('blur', check, false);
    document.getElementById('countup').addEventListener('click', countUpClick, false);
    document.getElementById('countdown').addEventListener('click', countDownClick, false);
    document.onkeydown = keyDown;
    function keyDown() {
        console.log(stat);
        if ((stat === 2 || stat === 3) && event.keyCode === 32) {
            if (stat === 2) {
                stat = 3;
                pause();
            } else {
                stat = 2;
                resume();
            }
        } else if (stat === 1 && event.keyCode === 13) {
            countUpClick();
            stat = 2;
        }
    }

    
    function setTotalTime() {
        originalHour = parseInt(document.getElementById('hour').value);
        originalMinute = parseInt(document.getElementById('minute').value);
        originalSecond = parseInt(document.getElementById('second').value);
        totalTime += originalHour * 60 * 60 * 1000 + originalMinute * 60 * 1000 + originalSecond * 1000;
    }

    function countUp() {
        if (restTime + 1000 > totalTime) {
            changePage(4);
        } else {
            restTime += 1000;
            let hour = parseInt((restTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minute = parseInt((restTime % (1000 * 60 * 60)) / (1000 * 60));
            let second = parseInt((restTime % (1000 * 60)) / (1000));
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            document.getElementById("time").innerText = hour + ":" + minute + ":" + second;
        }
    }

    function countDown() {
        if (restTime - 1000 < 0) {
            changePage(4);
        } else {
            restTime -= 1000;
            let hour = parseInt((restTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minute = parseInt((restTime % (1000 * 60 * 60)) / (1000 * 60));
            let second = parseInt((restTime % (1000 * 60)) / (1000));
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            document.getElementById("time").innerText = hour + ":" + minute + ":" + second;
        }
    }

    function countUpClick() {
        if (checkMinuteAndSecond(document.getElementById('minute')) &&
            checkMinuteAndSecond(document.getElementById('second')) &&
            checkHour()) {
            isCountUp = true;
            setTotalTime();
            changePage(2);
            stat = 2;
            timmer = window.setInterval(countUp, 1000);
        }

    }

    function countDownClick() {
        if (checkMinuteAndSecond(document.getElementById('minute')) &&
            checkMinuteAndSecond(document.getElementById('second')) &&
            checkHour()) {
            isCountUp = false;
            setTotalTime();
            restTime = totalTime;
            changePage(2);
            let hour = originalHour;
            let minute = originalMinute;
            let second = originalSecond;
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            document.getElementById('time').innerText = hour + ":" + minute + ":" + second;
            stat = 2;
            timmer = window.setInterval(countDown, 1000);
        }
    }

    function changePage(stat) {
        let form = document.getElementById('timeform');
        let parent = form.parentElement;
        let newForm = document.createElement("form");
        newForm.id = "timeform";
        newForm.classList = ["timeform"];
        if (stat === 1) {
            newForm.innerHTML = originalForm;
            parent.removeChild(form);
            parent.appendChild(newForm);
            let hourInput = document.getElementById('hour');
            hourInput.addEventListener('blur', checkHour, false);
            let minuteInput = document.getElementById('minute');
            minuteInput.addEventListener('blur', check, false);
            let secondInput = document.getElementById('second');
            secondInput.addEventListener('blur', check, false);
            document.getElementById('countup').addEventListener('click', countUpClick, false);
            document.getElementById('countdown').addEventListener('click', countDownClick, false);
        } else if (stat === 2 || stat === 3 || stat === 4) {
            let newHint = document.createElement("label");
            newHint.id = "hint";
            newHint.classList = ['hint'];
            let hour = originalHour;
            let minute = originalMinute;
            let second = originalSecond;
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            if (stat === 2) {
                if (isCountUp) {
                    newHint.innerText = "正在正计时 " +  hour + ":" + minute + ":" + second;
                } else {
                    newHint.innerText = "正在倒计时 " +  hour + ":" + minute + ":" + second;
                }
            } else if (stat === 3) {
                if (isCountUp) {
                    newHint.innerText = "暂停正计时 " +  hour + ":" + minute + ":" + second;
                } else {
                    newHint.innerText = "暂停倒计时 " +  hour + ":" + minute + ":" + second;
                }
            } else if (stat === 4) {
                if (isCountUp) {
                    newHint.innerText = "倒计时 " +  hour + ":" + minute + ":" + second + " 已结束";
                } else {
                    newHint.innerText = "正计时 " +  hour + ":" + minute + ":" + second + " 已结束";
                }
            }
            newForm.appendChild(newHint);
            if (stat !== 4) {
                let pauseOrResumeBtn = document.createElement("button");
                pauseOrResumeBtn.id = "pause";
                pauseOrResumeBtn.type = "button";
                pauseOrResumeBtn.classList = ["submit"];
                pauseOrResumeBtn.style.marginLeft = "20px";
                pauseOrResumeBtn.style.marginTop = "15px";
                if (stat === 2) {
                    pauseOrResumeBtn.innerText = "暂停计时器";
                    pauseOrResumeBtn.onclick = pause;
                } else {
                    pauseOrResumeBtn.innerText = "恢复计时器";
                    pauseOrResumeBtn.onclick = resume;
                }
                newForm.appendChild(pauseOrResumeBtn);
            }
            let clearBtn = document.createElement("button");
            clearBtn.id = "clear";
            clearBtn.type = "button"
            clearBtn.classList = ["submit"];
            clearBtn.style.background = "#DD2E1D";
            clearBtn.style.marginLeft = "599px";
            clearBtn.innerText = "清空计时器";
            clearBtn.onclick = clear;
            newForm.appendChild(clearBtn);
            let restartBtn = document.createElement("button");
            restartBtn.type = "button"
            restartBtn.id = "resume";
            restartBtn.classList = ["submit"];
            restartBtn.style.background = "#FFB020";
            restartBtn.innerText = "重新再计时";
            restartBtn.style.marginLeft = "20px";
            restartBtn.onclick = restart;
            newForm.appendChild(restartBtn);
            parent.removeChild(form);
            parent.appendChild(newForm);
        }
    }

    function clear() {
        originalHour = 0;
        originalMinute = 0;
        originalSecond = 0;
        stat = 1;
        restTime = 0;
        totalTime = 0;
        isCountUp = true;
        timmer = window.clearInterval(timmer);
        document.getElementById('time').innerText = "00:00:00";
        changePage(1);
    }

    function restart() {
        timmer = window.clearInterval(timmer);
        if (isCountUp) {
            restTime = 0;
            document.getElementById('time').innerText = "00:00:00";
            timmer = window.setInterval(countUp, 1000);
        } else {
            let hour = originalHour;
            let minute = originalMinute;
            let second = originalSecond;
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            document.getElementById('time').innerText = hour + ":" + minute + ":" + second;
            restTime = totalTime;
            timmer = window.setInterval(countDown, 1000);
        }
        stat = 2;
        changePage(2);
    }

    function pause() {
        stat = 3;
        timmer = window.clearInterval(timmer);
        changePage(3);
    }

    function resume() {
        stat = 2;
        if (isCountUp) {
            timmer = window.setInterval(countUp, 1000);
        } else {
            timmer = window.setInterval(countDown, 1000);
        }
        changePage(2);
    }

    function checkMinuteAndSecond(tag) {
        let rev = false;

        rev = checkIsInteger(tag);
        let num = tag.value;
        if (num >= 60) {
            tag.value = 59;
        } else if (num < 0) {
            tag.value = 0;
        }
        return rev;
    }

    function check() {
        let rev = false;
        rev = checkIsInteger(this);
        let num = this.value;
        if (num >= 60) {
            this.value = 59;
        } else if (num < 0) {
            this.value = 0;
        }
        return rev;
    }

    function checkHour() {
        let tag = document.getElementById('hour');
        let rev = false;
        rev = checkIsInteger(tag);
        let num = tag.value;
        if (num < 0) {
            tag.value = 0;
        }
        return rev;
    }

    function checkIsInteger(tag) {
        let num = tag.value;
        console.log(num);
        if (num == "" || num == "undefined" || num == undefined || num == null) {
            return false;
        } else {
            if (!isNaN(num)) {
                tag.value = Math.round(parseFloat(num));
                return true;
            } else {
                return false;
            }
        }
    }
})();