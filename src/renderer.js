/*
  This is the main javascript file for main.html. To simplify things, add this
  file to the bottom of the webpage. This DOM should be fully instantiated at
  that point so we don't need on load handlers here.
*/

console.log('renderer process loaded')

// =================================================
// Javascript handlers

/*
  Another method for this event handlers would be to use a single handler, and
  pass the data in via parameters, like so:

  function handleClick(checked, command) {
  ...
  }

  The html would then look like this:

  onclick="handleClick(this.checked, 'command')"
*/
function runCommand1(checked) {
  console.log(`running command 1 - checked: ${checked}`)

  ipcRunCommand1(checked)
}

function runCommand2(checked) {
  console.log(`running command 2 - checked: ${checked}`)

  ipcRunCommand2(checked)
}

// =================================================
// DOM manipulation functions

function reportStatus(id, status, error) {
  const element = document.getElementById(id)

  if (element) {
    element.innerHTML = `<p>command completed:<i> ${status}</i></p>`

    if (error) {
      element.classList.add('error')
    }
  } else {
    console.error(`could not find element with id: ${id}`)
  }
}

function runningStatus(id) {
  const element = document.getElementById(id)

  if (element) {
    element.innerHTML = `<p>running...</p>`
    element.classList.remove('error')
  } else {
    console.error(`could not find element with id: ${id}`)
  }
}

// =================================================
// ipc handlers - communicates with main process

const {ipcRenderer} = require('electron')
const status1id = 'command-1-status'
const status2id = 'command-2-status'

function ipcRunCommand1(checked) {
  runningStatus(status1id)
  ipcRenderer.send('run-command-1', checked)
}

function ipcRunCommand2(checked) {
  runningStatus(status2id)
  ipcRenderer.send('run-command-2', checked)
}

ipcRenderer.on('run-command-1-result', (event, err, data, stderr) => {
  if (!err) {
    console.log(`run-command-1 completed: ${data}`)
    reportStatus(status1id, data)
  } else {
    console.log(`run-command-1 completed with errors: ${stderr}`)
    reportStatus(status1id, stderr, true)
  }
})

ipcRenderer.on('run-command-2-result', (event, err, data, stderr) => {
  if (!err) {
    console.log(`run-command-2 completed: ${data}`)
    reportStatus(status2id, data)
  } else {
    console.log(`run-command-2 completed with errors: ${stderr}`)
    reportStatus(status2id, stderr, true)
  }
})
