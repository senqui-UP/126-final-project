// freedomwall.js updated to store daily poll results by date

console.log("freedomwall.js loaded");

const todaysPoll = [
  {
    "Who is most likely to lead a drug cartel?": [
      "Stefan Niedes",
      "Christian Hernia",
      "Nina Claudia Del Rosario",
      "Samantha Lansoy",
      "Michaela Borces"
    ]
  },
  {
    "Who would win a hotdog eating contest?": [
      "Keith Ashly Domingo",
      "Christian Joseph Hernia",
      "Eryl Joseph Aspera",
      "I am out of names",
      "I don't know"
    ]
  }
];

const POLL_STORAGE_KEY = 'fw_daily_poll';
const RESULTS_STORAGE_KEY = 'fw_poll_results';

function getTodayDateKey() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // e.g. "2025-05-17"
}

async function createRandomPoll() {
  const entry = todaysPoll[Math.floor(Math.random() * todaysPoll.length)];
  const question = Object.keys(entry)[0];
  const options = entry[question].map(text => ({ text }));

  const response = await fetch("https://api.pollsapi.com/v1/create/poll", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api_key': 'Bearer 417Q13HZXSM4H2PXKH4JEZTY2VNC'
    },
    body: JSON.stringify({
      question,
      options,
      settings: { expiration: "24h" }
    })
  });

  const poll = await response.json();
  const todayKey = getTodayDateKey();

  localStorage.setItem(POLL_STORAGE_KEY, JSON.stringify({
    id: poll.id,
    dateKey: todayKey,
    question,
    options: poll.options
  }));

  return poll;
}
/*
async function loadPoll() {
  const todayKey = getTodayDateKey();
  const stored = localStorage.getItem(POLL_STORAGE_KEY);

  if (stored) {
    const pollData = JSON.parse(stored);

    if (pollData.dateKey !== todayKey) {
      localStorage.removeItem(POLL_STORAGE_KEY);
      location.reload();
      return;
    }

    const poll = await fetch(`https://pollsapi.com/api/poll/${pollData.id}`, {
      headers: {
        'Authorization': 'Bearer 417Q13HZXSM4H2PXKH4JEZTY2VNC'
      }
    }).then(res => res.json());

    const container = document.getElementById('poll');
    container.innerHTML = `
      <h3>${poll.question}</h3>
      ${poll.options.map(opt =>
        `<button onclick="vote('${poll.id}', '${opt.id}')">${opt.text}</button>`
      ).join('<br>')}
    `;
  } else {
    const poll = await createRandomPoll();
    const container = document.getElementById('poll');

    container.innerHTML = `
      <h3>${poll.question}</h3>
      ${poll.options.map(opt =>
        `<button onclick="vote('${poll.id}', '${opt.id}')">${opt.text}</button>`
      ).join('<br>')}
    `;
  }
}

async function vote(pollId, optionId) {
  await fetch(`https://api.pollsapi.com/v1/get/votes/${pollId}?offset=0&limit=25`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api_key': 'Bearer 417Q13HZXSM4H2PXKH4JEZTY2VNC'
    },
    body: JSON.stringify({ option_id: optionId })
  });

  const updatedPoll = await fetch(`https://pollsapi.com/api/poll/${pollId}`, {
    headers: {
      'Authorization': 'Bearer 417Q13HZXSM4H2PXKH4JEZTY2VNC'
    }
  }).then(res => res.json());

  savePollResults(updatedPoll);
  showResults(updatedPoll);
}

function savePollResults(poll) {
  const todayKey = getTodayDateKey();
  const results = JSON.parse(localStorage.getItem(RESULTS_STORAGE_KEY)) || {};

  const highest = poll.options.reduce((prev, curr) => curr.votes > prev.votes ? curr : prev, { votes: -1 });
  results[todayKey] = {
    question: poll.question,
    topAnswer: highest.text,
    votes: highest.votes
  };

  localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
}

function showResults(poll) {
  const container = document.getElementById('poll');
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  container.innerHTML = `
    <h3>${poll.question}</h3>
    ${poll.options.map(opt => {
      const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
      return `
        <div class="poll-option">
          <span>${opt.text}</span>
          <div class="bar-bg">
            <div class="bar-fill" style="width:${percent}%"></div>
          </div>
          <span class="percent">${percent}%</span>
        </div>
      `;
    }).join('')}
    <p class="thank-you">Thanks for voting!</p>
  `;
}

window.onload = function () {
  loadPoll();
};
*/