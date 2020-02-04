const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const button = document.getElementById("buttonNewToDo")
const toDoArray = []

function addToList(event) {
  if (event.key === 'Enter') {
    let text = document.getElementById("tempInput").value

    if (text !== null && text !== '') {
      let newToDo = document.createElement('li')
      newToDo.setAttribute("id", "note" + toDoArray.length)

      // Checkbox in Listenelement einfügen
      let newCheckbox = document.createElement('input')
      newCheckbox.type = "checkbox"
      newCheckbox.setAttribute("id", toDoArray.length)
      newCheckbox.setAttribute("onclick", "checkNote()")
      newToDo.appendChild(newCheckbox)
      newToDo.appendChild(document.createTextNode(text))
      toDoArray.push(text)

      // Input Eingabefeld entfernen
      let removeInput = document.getElementById("tempInput")
      removeInput.parentNode.removeChild(removeInput)
      list.appendChild(newToDo)
      button.disabled = false
      itemCountSpan.innerHTML = toDoArray.length
      checkNote()
    }
  }
}

function checkNote() {
  let checkedCount = 0
  for (let i = 0; i < toDoArray.length; i++) {
    if (document.getElementById(i).checked) {
      checkedCount++
    }
  }
  uncheckedCountSpan.innerHTML = toDoArray.length - checkedCount
}

function newTodo() {
  button.disabled = true
  let tempInput = document.createElement('input')
  tempInput.setAttribute("type", "text")
  tempInput.setAttribute("autofocus", "true")
  tempInput.setAttribute("id", "tempInput")
  tempInput.setAttribute("placeholder", "new Task")
  tempInput.setAttribute("onkeypress", "addToList(event)")
  list.appendChild(tempInput)
}
