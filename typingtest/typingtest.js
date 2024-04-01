const typing_ground = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sentence = document.querySelector('#showSentence');
const timer_show = document.querySelector('#timer-show');
let startTime, endTime, totalTimeTaken , sentences_to_write;

const sentences = ['The greatest glory in living lies not in never falling  but in rising every time we fall.', 
'If you set your goals ridiculously high and its a failure, you will fail above everyone else is success. ', 
 'The future belongs to those who believe in the beauty of their dreams.']
// step2
btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            typing_ground.removeAttribute('disabled')
            startTyping();
            break;
        case "done":
            typing_ground.setAttribute('disabled', 'true');
            endTypingTest();
            break;
    }
})
// step 3
const startTyping = () =>{
    let randomNumber = Math.floor(Math.random() * sentences.length);
    // console.log(randomNumber);
    show_sentence.innerHTML = sentences[randomNumber];
    let date = new Date();
    startTime = date.getTime();
    btn.innerText = "Done" ;
    showTimer();
}
const endTypingTest = () => {
    btn.innerText = "Start";
     showTimer();
    let date = new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime -startTime) / 1000;

    // console.log(totalTimeTaken);

    calculateTypingSpeed(totalTimeTaken);

    show_sentence.innerHTML = "";
    typing_ground.value = "";
}
const calculateTypingSpeed = (time_taken) => {
    let  totalWords = typing_ground.value.trim();
    let actualWords = totalWords === '' ? 0 : totalWords.split(" ");

     actualWords = errorhandling(actualWords);

    if(actualWords !== 0) {
        let typing_speed  =  (actualWords / time_taken) * 60;
        typing_speed = Math.round(typing_speed);
        score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & you wrote ${actualWords} correct words out of ${sentences_to_write.length} & time taken ${time_taken} sec`;
    }else{
        score.innerHTML = `Your typing speed is 0 words per minutes & time taken ${time_taken} sec`;
    }
}
// step6
let intervalID , elapsedTime=0;
const showTimer = () =>{
    if (btn.innerText === "Done"){
         intervalID = setInterval(() => {
            elapsedTime++;
            timer_show.innerHTML = elapsedTime;
        },1000)
    }else if(btn.innerText === "Start"){
        elapsedTime=0;
        clearInterval(intervalID);
        timer_show.innerHTML = "";
    }
}
// step6
const errorhandling = (words) => {
    let num =0;
     sentences_to_write = show_sentence.innerHTML;
     sentences_to_write = sentences_to_write.trim().split(" ");
     for( let i=0; i<words.length; i++){
        if(words[i] === sentences_to_write[i]){
            num ++;
        }
     }
return num;
}