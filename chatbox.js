const messageContainer = document.querySelector('.js-messageContainer')
const inputForm = document.querySelector('.js-inputForm')
const inputField = document.querySelector('.js-inputField')
const dots = document.querySelector('.js-dots')
const modal = document.querySelector('#modal')
const wottIcon = document.querySelector('#wottIcon')
const closeModal = document.querySelector('#closeModal')

wottIcon.addEventListener('click', () => {
    modal.style.display = "block"
})

closeModal.addEventListener('click', () => {
    modal.style.display = "none"
})


// clear chat window with clear

inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const userMessage = inputField.value    
    const messageDiv = document.createElement('div')
    const messageBubbleUser = `<span class="Chat-bubble">${userMessage}</span>`
    
    if (!userMessage) return
    
    messageDiv.classList.add('Chat-message', 'Chat-message--user')
    messageDiv.innerHTML += messageBubbleUser
    
    messageContainer.insertBefore(messageDiv, dots)
    messageContainer.classList.add('Chat-messages--typing')
    // setTimeout(() => {
    // }, 2000)
    // const bubble = document.querySelector('.Chat-messages--typing') 
    // Hides bubble after 2 seconds
    // bubble.style.display = "none"
    const botMessage = 'I am a bot'
    const messageBubbleBot = `<span class="Chat-bubble">${botMessage}</span>`
    messageDiv.classList.add('Chat-message', 'Chat-message--bott')
    messageDiv.innerHTML += messageBubbleBot

    e.preventDefault()
    inputForm.reset()
})