```javascript
let chatbot = document.querySelector('#chatbot');
let repositoryList = [];
let companyInfo = {};

async function initChatbot() {
    let response = await fetch('./assets/chatbot_conversations.txt');
    let data = await response.text();
    let conversations = data.split('\n');
    chatbot.innerHTML = conversations[0];
}

function sendMessage() {
    let userMessage = document.querySelector('#user-input').value;
    chatbot.innerHTML += `<p>User: ${userMessage}</p>`;
    receiveMessage(userMessage);
}

function receiveMessage(userMessage) {
    let botMessage = `I'm sorry, I didn't understand that. Could you please rephrase?`;
    if (userMessage.toLowerCase().includes('repository')) {
        botMessage = `Here are the repositories: ${repositoryList.join(', ')}`;
    } else if (userMessage.toLowerCase().includes('company')) {
        botMessage = `Or4cl3 AI Solutions is a company that ${companyInfo.description}`;
    }
    chatbot.innerHTML += `<p>Chatbot: ${botMessage}</p>`;
}

async function loadRepositoryOverview() {
    let response = await fetch('./assets/repositories_overview.txt');
    let data = await response.text();
    repositoryList = data.split('\n');
}

async function loadCompanyOverview() {
    let response = await fetch('./assets/company_overview.txt');
    let data = await response.text();
    companyInfo = JSON.parse(data);
}

window.onload = async () => {
    await loadRepositoryOverview();
    await loadCompanyOverview();
    initChatbot();
}
```