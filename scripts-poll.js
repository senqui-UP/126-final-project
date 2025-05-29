// Function to fetch the current poll
function fetchPoll() {
    fetch('get_poll.php')
        .then(response => response.json())
        .then(data => {
            console.log('get_poll.php:', data);
            if (data.status === "success") {
                fetch(`check_user_vote.php?poll_id=${data.poll_id}`)
                    .then(res => res.json())
                    .then(voteData => {
                        console.log('check_user_vote.php:', voteData);
                        if (voteData.status === "voted") {
                            fetchPollResults(data.poll_id, voteData.option_id);
                        } else {
                            displayPoll(data);
                        }
                    })
                    .catch(() => displayPoll(data));
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error fetching poll:', error));
}

// Function to display the poll
function displayPoll(data) {
    const pollContainer = document.getElementById('poll-container');
    pollContainer.innerHTML = `<h2>${data.question}</h2>`;
    data.options.forEach(option => {
        pollContainer.innerHTML += `
        <label class="poll-option">
        <input type="radio" name="option_id" value="${option.option_id}" required>
        ${option.option_text}
        </label>
    `;
    });
    pollContainer.innerHTML += `<button onclick="submitVote(${data.poll_id})">Vote</button>`;
    console.log("Poll data:", data);
}

// Function to submit a vote
function submitVote(pollId) {
    const selectedOption = document.querySelector('input[name="option_id"]:checked');
    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    const optionId = selectedOption.value;
    const body = new URLSearchParams({
        poll_id: pollId,
        option_id: optionId
    });

    fetch('process_poll.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === "success") {
            // fetch and display poll results after voting
            fetchPollResults(pollId, optionId);
        }
    })
    .catch(error => console.error('Error submitting vote:', error));
}

// Function to fetch poll results
function fetchPollResults(pollId, selectedOptionId) {
    fetch(`get_poll_results.php?poll_id=${pollId}`)
        .then(response => response.json())
        .then(data => {
            console.log('get_poll_results.php:', data);
            if (data.status === "success") {
                displayPollResults(data, selectedOptionId);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error fetching poll results:', error));
}

//Function to display poll results
function displayPollResults(data, selectedOptionId) {
    const pollContainer = document.getElementById('poll-container');
    pollContainer.innerHTML = `<h2>${data.question}</h2>`;

    data.options.forEach(option => {
        const isSelected = String(option.option_id) === String(selectedOptionId);
        pollContainer.innerHTML += `
            <label class="poll-option${isSelected ? ' selected' : ''}">
                <input type="radio" name="option_id" value="${option.option_id}" ${isSelected ? 'checked' : ''} disabled>
                ${option.option_text}
                <span class="vote-info">(${option.percentage}%)</span>
            </label>
        `;
    });

    pollContainer.innerHTML += `<p id="totalVotesInfo">Total Votes: ${data.total_votes}</p>`;
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('other-polls-modal');
    const btn = document.getElementById('view-other-polls-btn');
    const closeBtn = document.getElementById('close-other-polls');
    const listDiv = document.getElementById('other-polls-list');

    btn.onclick = function() {
        fetch('get_other_polls.php')
            .then(res => res.json())
            .then(data => {
                if (data.status === "success" && data.polls.length > 0) {
                let html = '';
                data.polls.forEach(poll => {
                    let totalVotes = poll.options.reduce((sum, opt) => sum + Number(opt.votes), 0);
                    html += `
                    <div class="modal-poll-card">
                        <div class="modal-poll-question">${poll.question}</div>
                        <div>
                            ${poll.options.map(opt => `
                                <div class="modal-poll-option">
                                    <span>${opt.option_text}</span>
                                    <span>${opt.percentage}% <span style="color:#888;">(${opt.votes} votes)</span></span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="modal-poll-total">Total votes: ${totalVotes}</div>
                    </div>
                    `;
                });
                listDiv.innerHTML = html;
            } else {
                listDiv.innerHTML = "<p>No other polls found.</p>";
            }
                modal.style.display = "block";
            });
    };

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});




// Fetch the poll when the page loads
window.onload = fetchPoll;
