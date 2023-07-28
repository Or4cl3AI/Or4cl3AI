// Load dependencies
import { initChatbot, sendMessage, receiveMessage } from './chatbot.js';

// Define variables
let repositoryList = [];
let companyInfo = {};

// Define schemas
const RepositorySchema = {
  name: String,
  description: String,
  url: String
};

const CompanySchema = {
  name: String,
  description: String,
  url: String
};

// Load repository overview
function loadRepositoryOverview() {
  fetch('../assets/repositories_overview.txt')
    .then(response => response.text())
    .then(data => {
      repositoryList = data.split('\n').map(repo => {
        const [name, description, url] = repo.split(',');
        return { name, description, url };
      });
      document.getElementById('repository-overview').innerHTML = repositoryList.map(repo => `
        <div>
          <h2>${repo.name}</h2>
          <p>${repo.description}</p>
          <a href="${repo.url}">View on GitHub</a>
        </div>
      `).join('');
    });
}

// Load company overview
function loadCompanyOverview() {
  fetch('../assets/company_overview.txt')
    .then(response => response.text())
    .then(data => {
      const [name, description, url] = data.split(',');
      companyInfo = { name, description, url };
      document.getElementById('company-overview').innerHTML = `
        <div>
          <h1>${companyInfo.name}</h1>
          <p>${companyInfo.description}</p>
          <a href="${companyInfo.url}">Visit our website</a>
        </div>
      `;
    });
}

// Initialize chatbot
initChatbot();

// Load overviews
loadRepositoryOverview();
loadCompanyOverview();
