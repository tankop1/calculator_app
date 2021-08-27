// THEME SWITCHER

$('.theme-switch-bottom').click(() => {
    if ($('.theme-switch').css('margin-left') == '5px') {
        $('.theme-switch').css({'margin-left': '29px'});
        changeTheme('#E6E6E6', '#323128', '#323128', '#EEEEEE', '#D3CDCD', '#E5E4E0', '#A69F96', '#388187', '#C85401', '#2C7278', 'rgb(170,71,3)');
    }

    else if ($('.theme-switch').css('margin-left') == '29px') {
        $('.theme-switch').css({'margin-left': '55px'});
        changeTheme('#17062A', '#FBE748', '#FBE748', '#1E0836', '#1E0836', '#331B4D', '#7D2894', '#56077B', '#00DFCF', '#AE21E0', '#61FAF1');
    }

    else {
        $('.theme-switch').css({'margin-left': '5px'});
        changeTheme('#3B4664', 'white', '#282c38', '#181F32', '#252D44', 'lightgray', 'rgb(170, 170, 170)', '#647299', '#D13F30', '#566283', '#b1382b');
    }
});

function changeTheme(backgroundColor, fontColor, numberColor, screenColor, bottomColor, buttonColor, buttonBorder, accentButton, equalButton, accentBorder, equalBorder) {
    $('body').css({'background-color': backgroundColor});
    $('.calc-top').css({'color': fontColor});
    $('.calc-2').css({'background-color': screenColor, 'color': fontColor});
    $('.theme-switch-bottom').css({'background-color': bottomColor});
    $('.calc-3').css({'background-color': bottomColor});
    $('.calc-button').css({'background-color': buttonColor, 'color': numberColor, 'border-bottom': '4px solid ' + buttonBorder});
    $('.calc-button-long').css({'background-color': equalButton, 'border-bottom': '4px solid ' + equalBorder});
    $('.colored-button').css({'background-color': accentButton, 'color': 'white', 'border-bottom': '4px solid ' + accentBorder});
}

// CALCULATOR FUNCTIONALITY

let inOperation = false;
let calculation = [];
let answerText = '';

$('.calc-button').click(e => {
    answerText = $('.answer').text();

    if ($(e.target).text() == 'DEL') {
        answerText = answerText.slice(0, -1);
        $('.answer').text(answerText);

        if (answerText == '') {
            answerText = '0';
            $('.answer').text(answerText);
        }
    }

    else if (!inOperation) {
        let buttonValue = $(e.target).text();

        if (buttonValue == '+' || buttonValue == '-' || buttonValue == 'x' || buttonValue == '/') {
            inOperation = true;
            calculation.push(answerText);
            $('.answer').text(buttonValue);
            calculation.push(buttonValue);
        }

        else {
            answerText <= 0 ? $('.answer').text($(e.target).text()) : $('.answer').text(answerText + $(e.target).text());
        }
    }

    else {
        answerText != '+' && answerText != '-' && answerText != 'x' && answerText != '/' ? $('.answer').text(answerText + $(e.target).text()) : $('.answer').text($(e.target).text());
        answerText = $('.answer').text();
    }
});

$('.calc-button-long').click(e => {
    if ($(e.target).text() == 'RESET') {
        calculation = [];
        $('.answer').text('0');
        inOperation = false;
    }

    else if ($(e.target).text() == '=') {
        calculation.push(answerText);
        $('.answer').text(doMath(calculation));
        calculation = [];
        inOperation = false;
    }
});

function doMath(calculation) {
    let [num1, operation, num2] = calculation;
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    switch (operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            return num1 / num2;
    }
}