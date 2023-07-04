// Function to scroll to the latest message
function scrollToLatestMessage() {
    const latestMessage = document.querySelector('.Chat-message:last-child');
    if (latestMessage) {
      latestMessage.scrollIntoView();
    }
  }
  
  // Function to get DOM elements
  function getElements() {
    const messageContainer = document.querySelector('.js-messageContainer');
    const inputForm = document.querySelector('.js-inputForm');
    const inputField = document.querySelector('.js-inputField');
    const dots = document.querySelector('.js-dots');
    const modal = document.querySelector('#modal');
    const wottIcon = document.querySelector('#wottIcon');
    const closeModal = document.querySelector('#closeModal');
    const sendButton = document.querySelector('#sendButton');
  
    return { messageContainer, inputForm, inputField, dots, modal, wottIcon, closeModal, sendButton };
  }
  
  // Function to handle "wottIcon" click event
  function handleWottIconClick(modal) {
    modal.style.display = "block";
  }
  
  // Function to handle "closeModal" click event
  function handleCloseModalClick(modal) {
    modal.style.display = "none";
  }
  
  // Function to send the user message to the API
//   async function sendUserMessage(userMessage) {
//     try {
//       const response = await fetch('API_ENDPOINT_URL', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ message: userMessage })
//       });
//       if (!response.ok) {
//         throw new Error('Failed to send user message');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
  // Function to call the API and get the bot's message
  async function getBotMessage() {
    const url = 'http://localhost/chat/1'; // API endpoint URL
    const username = 'ogiles';
    const password = '123';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bot message');
      }
      const data = await response.json();
      return data.message; // Assuming the API response has a "message" field
    } catch (error) {
      console.error(error);
      return 'Sorry, an error occurred. Try again later'; // Default message in case of an error
    }
  }
  
  // Function to handle form submission
  async function handleSubmitForm(e, inputField, messageContainer, dots, inputForm) {
    e.preventDefault();
  
    const userMessage = inputField.value;
    const messageDivUser = document.createElement('div');
    const messageBubbleUser = `<span class="Chat-bubble">${userMessage}</span><br><span class="Chat-timestamp">You - ${new Date().toLocaleTimeString()}</span>`;
  
    if (!userMessage) return;
  
    messageDivUser.classList.add('Chat-message', 'Chat-message--user');
    messageDivUser.innerHTML += messageBubbleUser;
  
    // await sendUserMessage(userMessage); // Send user message to the API
  
    const messageDivBot = document.createElement('div');
    const botMessage = await getBotMessage(); // Call the API to get the bot's message
    messageContainer.insertBefore(messageDivUser, dots);
    messageContainer.classList.add('Chat-messages--typing');
  
    const messageBubbleBot = `<span class="Chat-bubble">${botMessage}</span><br><span class="Chat-timestamp">Wott - ${new Date().toLocaleTimeString()}</span>`;
    messageDivBot.classList.add('Chat-message', 'Chat-message--bott');
    messageDivBot.innerHTML += messageBubbleBot;
    messageContainer.insertBefore(messageDivBot, dots);
  
    inputForm.reset();
  
    scrollToLatestMessage(); // Scroll to the latest message
  }
  
  // Get DOM elements
  const { messageContainer, inputForm, inputField, dots, modal, wottIcon, closeModal, sendButton } = getElements();
  
  // Attach event listeners
  wottIcon.addEventListener('click', () => {
    handleWottIconClick(modal);
  });
  
  closeModal.addEventListener('click', () => {
    handleCloseModalClick(modal);
  });
  
  inputForm.addEventListener('submit', (e) => {
    handleSubmitForm(e, inputField, messageContainer, dots, inputForm);
  });
  
  sendButton.addEventListener('click', (e) => {
    handleSubmitForm(e, inputField, messageContainer, dots, inputForm);
  });
  