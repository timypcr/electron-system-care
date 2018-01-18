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

function reportStatus(id, status) {
  const element = document.getElementById(id)

  if (element) {
    element.innerHTML = `<p><i>command completed with status: ${status}</i></p>`
  } else {
    console.error(`could not find element with id: ${id}`)
  }
}

function runningStatus(id) {
  const element = document.getElementById(id)

  if (element) {
    element.innerHTML = `<i>running...</i>`
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

ipcRenderer.on('run-command-1-result', (event, arg) => {
  console.log(`run-command-1 exited with status: ${arg}`)
  reportStatus(status1id, arg)
})

ipcRenderer.on('run-command-2-result', (event, arg) => {
  console.log(`run-command-2 exited with status: ${arg}`)
  reportStatus(status2id, arg)
})
