
AOS.init({
    duration: 1200, 
    once: true,
});

function countdown(num) {

    const countdownElement = document.querySelector('.countdown'); // Assuming you have an element for the countdown
    num--;
    const interval = setInterval(() => {
        countdownElement.innerText = num; // Update the element with the current number
        num--;

    }, 1000);

}

function ban(time) {

    if (time === 'na') {
        document.querySelector('.bPop').innerHTML = `
            <p class="h">YOU AR NOW BENNED!</p>
            <p>FOR <span class="countdown">15</span> SECONDZ</p>
        `;
        countdown(15); // Start the countdown
    } else {
        document.querySelector('.bPop').innerHTML = `
            <p>THANK YOU SER</p>
            <p class="h">BUT YOU AR STILL BENNED!</p>
            <p>FOR <span class="countdown">5</span> SECONDZ</p>
        `;
        countdown(5); // Start the countdown

    }

    document.querySelector('.bannedPopup').style.display = 'flex'
    document.querySelector('body').style.overflow = 'hidden'


    if (time === 'na') {
        setTimeout(() => {
            document.querySelector('.bannedPopup').style.display = 'none'
            document.querySelector('body').style.overflow = 'unset'
        }, 15000);
    } else {
        setTimeout(() => {
            document.querySelector('.bannedPopup').style.display = 'none'
            document.querySelector('body').style.overflow = 'unset'
        }, 5000);
    }

}







let msg = document.querySelector('.sendbtn');
const inputMsg = document.querySelector('#sendmsg')
let msgNum = 0;
let canMsg = true;
let messages = []; // Array to store all messages

let round = 0

function sendMsg(isMe, message) {
    if (!canMsg) return; // Prevent sending messages if canMsg is false

    round+=1

    canMsg = false;

    const newMsg = {
        id: msgNum++,
        text: message,
        from: isMe ? 'me' : 'user'
    };

    const pletoMsg1 = {
        id: msgNum++,
        text: 'GO AWEY, I AM IN ZE TOILET!! I WEILL CALL ZE COPS',
        from: 'pletomsg'
    };

    const pletoMsg2 = {
        id: msgNum++,
        text: '1 MAWR MESSSAGE I DARE U',
        from: 'pletomsg'
    };


    messages.push(newMsg);
    renderMessages();
    document.querySelector('.typing').style.display = 'unset'

    setTimeout(() => {
        canMsg = true;
        if (round === 1) {
            messages.push(pletoMsg1);
        } else if (round === 2) {
            messages.push(pletoMsg2);
        } 
        else if (round === 3) {
            document.querySelector('.cops').style.display = 'flex'   
            document.querySelector('.send .blocked').style.display = 'unset'   
            document.querySelector('.send input').style.display = 'none'
            document.querySelector('.send button').style.display = 'none'

        }
        document.querySelector('.typing').style.display = 'none'
        renderMessages();
    }, 2000);

}

function renderMessages() {
    const messageContainer = document.querySelector('.messages');
    messageContainer.innerHTML = ''; // Clear previous messages

    messages.forEach((msg) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(msg.from); // Add class based on 'me' or 'user'
        const p = document.createElement('p');
        p.innerText = msg.text;
        messageDiv.appendChild(p);
        messageContainer.appendChild(messageDiv);



        // const cops = document.createElement('div');
        // const calling = document.createElement('p');
        // cops.classList = 'cops'
        // calling.classList = 'calling'
        // calling.innerText = 'PLETO IZ DIALING 911';
        // cops.appendChild(calling)
        // messageContainer.appendChild(cops)

    });
}

// Example usage

function initMsg() {

    sendMsg(true, inputMsg.value); 
    inputMsg.value = ''; 

    console.log(inputMsg.value)
}



let opened = false

function openMsgs() {
    if (!opened) {
        document.querySelector('.speek').style.display = 'flex'
        opened = true
    } else {
        document.querySelector('.speek').style.display = 'none'
        opened = false
    }
}

document.querySelector('.root').addEventListener('click', function() {
    document.querySelector('.speek').style.display = 'none'
})





function copyCA() {
    navigator.clipboard.writeText('8s25CdyJxN5M82s5s1bJughkWwy8s6uw7qHD3oi76qaZ')

    document.querySelector('button.copy').innerHTML = 'COPIED'
    setTimeout(() => {
        document.querySelector('button.copy').innerHTML = 'COPY'
    }, 1000);
}