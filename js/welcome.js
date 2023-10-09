//Random welcome phrase
var intro = document.getElementById('Welcome')
var introPhrase =
[
    'Hello!',
    'Howdy!',
    'Welcome friend.',
    'Hello friend :)',
    'Welcome traveler.',
    'I wish you wellness as you enter my domain.',
    'ʕ •ᴥ•ʔ',
    '[^._.^]ﾉ彡',
    'Hey! I hope you like art.',
    'Greetings traveler',
    'yo',
    'Well uh... you\'re here now, so hello?',
    'Su casa es mi casa! Or is it the other way around?',
    'Surprise!',
    'Art!!!!!!',
    '(Eating crayons)',
    'The local art goblin says hi.'
]

function randomPhrase()
{
    let i = (Math.random() * introPhrase.length) | 0;
    Welcome.innerText = introPhrase[i];
}

randomPhrase();


//Portfolio open modal

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget); 
        openModal(modal);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})

function openModal(modal)
{
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active'); 
}

function closeModal(modal)
{
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal);
    })
})

function toTopOfPage()
{
    window.scrollTo(0,0);
}