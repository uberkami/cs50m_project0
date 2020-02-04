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
      toDoArray.push(text)
      let removeInput = document.getElementById("tempInput")
      removeInput.parentNode.removeChild(removeInput)
      fillList()
    }
  }
}

function fillList() {
  let liItems = list.getElementsByTagName("li")

  console.log("liItems", liItems)
  // empty list
  for (let j = liItems.length; j > 0; j--){
    list.removeChild(list.childNodes[j-1])
  }
  for (let i = 0; i < toDoArray.length; i++) {
    let id = i
    let newToDo = document.createElement('li')
    newToDo.setAttribute("id", "note" + id)
    // Input Eingabefeld entfernen

    // Checkbox in Listenelement einfügen
    let newCheckbox = document.createElement('input')
    newCheckbox.type = "checkbox"
    newCheckbox.setAttribute("id", id)
    newCheckbox.setAttribute("onclick", "checkNote()")
    newToDo.appendChild(newCheckbox)
    newToDo.appendChild(document.createTextNode(toDoArray[i]))

    // delete Button generieren
    let deleteButton = document.createElement('button')
    deleteButton.id = id
    deleteButton.textContent = "delete"
    deleteButton.setAttribute("onclick", "deleteNote(" + id + ")")

    newToDo.appendChild(deleteButton)

    list.appendChild(newToDo)
  }
  button.disabled = false
  itemCountSpan.innerHTML = toDoArray.length
  checkNote()
}

function deleteNote(id) {
  list.removeChild(list.childNodes[id])
  // remove element from arraylist with id
  toDoArray.splice(id, 1)
  checkNote()
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
