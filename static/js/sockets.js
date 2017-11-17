const ws = WebSocket;

const socket = new ws('ws://localhost:4000/');
let container;


const interpret = function(data) {
  let message;
  let url;

  if (typeof data === 'string') {
    return {
      message: data,
    }
  }

  switch(data.action) {
    case 'labeled':
      if (data.pull_request) {
        message = `${data.sender.login} added the label ${data.label.name} to pull request #${data.pull_request.number} (${data.pull_request.title}) ${data.repository.name}`;
        url = data.pull_request.html_url;
      } else {
        message = `${data.sender.login} added the label ${data.label.name} to issue #${data.issue.number} (${data.issue.title}) ${data.repository.name}`;
        url = data.issue.html_url;
      }
      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message,
        url,
      }
    case 'unlabeled':
      if (data.pull_request) {
        message = `${data.sender.login} removed the label ${data.label.name} to pull request #${data.pull_request.number} (${data.pull_request.title}) ${data.repository.name}`;
        url = data.pull_request.html_url;
      } else {
        message = `${data.sender.login} removed the label ${data.label.name} to issue #${data.issue.number} (${data.issue.title}) ${data.repository.name}`;
        url = data.issue.html_url;
      }

      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message,
        url,
      }
    case 'opened':
    case 'reopened':
      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message: `${data.sender.login} opened pull request #${data.pull_request.number} - ${data.pull_request.title} on repository ${data.repository.name}`,
        url: data.pull_request.html_url,
      }
    case 'closed':
      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message: `${data.sender.login} closed pull request #${data.pull_request.number} - ${data.pull_request.title} on repository ${data.repository.name}`,
        url: data.pull_request.html_url,
      }
    case 'review_requested':
      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message: `${data.sender.login} Requested a review from ${data.requested_reviewer.login} for PR #${data.pull_request.number} - ${data.pull_request.title} on repository ${data.repository.name}`,
        url: data.pull_request.html_url,
      }
    case 'review_request_removed':
      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message: `${data.sender.login} recinded a request for ${data.requested_reviewer.login} to review PR #${data.pull_request.number} - ${data.pull_request.title} on repository ${data.repository.name}`,
        url: data.pull_request.html_url,
      }
    case 'dismiss':
      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message: `${data.sender.login} recinded a request for ${data.requested_reviewer.login} to review PR #${data.pull_request.number} - ${data.pull_request.title} on repository ${data.repository.name}`,
        url: data.pull_request.html_url,
      }
    case 'dismissed':
      return {
        avatar: data.sender.avatar_url,
        title: 'Label Added',
        message: `${data.sender.login} dismissed a request for PR #${data.pull_request.number} - ${data.pull_request.title} on repository ${data.repository.name}`,
        url: data.pull_request.html_url,
      }
    case 'submitted':
      return {
        avatar: data.sender.avatar_url,
        title: 'Submitted a review',
        message: `${data.sender.login} submitted a review for PR #${data.pull_request.number} - ${data.pull_request.title} on repository ${data.repository.name}`,
        url: data.pull_request.html_url,
      }
  }
}

socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

socket.addEventListener('close', function (event) {
  console.log('Server went away!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log(event);
  let data = {};

  if (event.data) {
    data = event.data;
    try {
      data = JSON.parse(event.data);
    } catch(e) {
      data = event.data;
    }
  }
  console.log(data);
  const message = interpret(data);

  if (!container) {
    container = document.getElementById('messageBox');
  }

  const div = document.createElement('div');
  div.className = 'message';
  div.innerHTML = message.message;
  container.appendChild(div);
});
