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
// ipc handlers - communicates with main process

const {ipcRenderer} = require('electron')

function ipcRunCommand1(checked) {
  ipcRenderer.send('run-command-1', checked)
}

function ipcRunCommand2(checked) {
  ipcRenderer.send('run-command-2', checked)
}
