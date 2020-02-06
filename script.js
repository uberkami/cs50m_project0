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

// const toDoArray = []

function addToList(event) {
  if (event.key === 'Enter') {
    let text = document.getElementById("tempInput").value
    // Input Eingabefeld entfernen
    let removeInput = document.getElementById("tempInput")
    removeInput.parentNode.removeChild(removeInput)
    if (text !== null && text !== '') {

      // random ID generieren (gibt kein check dass es die ID nicht zweimal gibt)
      let id = Math.floor(Math.random() * 10000)
      let newToDo = document.createElement('li')
      newToDo.setAttribute("id", "note" + id)
      newToDo.setAttribute("class", 'todo-container')

      // Checkbox in Listenelement einfügen
      let newCheckbox = document.createElement('input')
      newCheckbox.type = "checkbox"
      newCheckbox.setAttribute("id", id)
      newCheckbox.setAttribute("class", 'todo-checkbox')
      newCheckbox.setAttribute("onclick", "checkNote()")
      newToDo.appendChild(newCheckbox)
      newToDo.appendChild(document.createTextNode(text))

      // delete Button generieren
      let deleteButton = document.createElement('button')
      deleteButton.id = id
      deleteButton.textContent = "delete"
      deleteButton.setAttribute("onclick", "deleteNote(" + id + ")")
      deleteButton.setAttribute("class", 'todo-delete')

      newToDo.appendChild(deleteButton)

      list.appendChild(newToDo)
    }
    button.disabled = false
    

    // itemCountSpan.innerHTML = toDoArray.length
    checkNote()
  }
}

function deleteNote(id) {
  let liItems = list.getElementsByTagName("li")
  for (let delItem of liItems) {
    if (delItem.id === "note" + id) {
      // let delIndex = toDoArray.indexOf(delItem.childNodes[1].textContent)
      list.removeChild(delItem)
      // toDoArray.splice(delIndex, 1)
      checkNote()
    }
  }
}

function checkNote() {
  let count = list.getElementsByTagName("li")
  itemCountSpan.innerHTML = count.length
  let checked = list.getElementsByTagName("input")
  let checkedCount = 0
  for (let item of checked) {
    if (item.checked) {
      checkedCount++
    }
  }
  uncheckedCountSpan.innerHTML = count.length - checkedCount
}

function newTodo() {
  button.disabled = true
  let tempInput = document.createElement('input')
  tempInput.setAttribute("type", "text")
  tempInput.autofocus = true
  // tempInput.setAttribute("autofocus", "true")
  tempInput.setAttribute("id", "tempInput")
  tempInput.setAttribute("placeholder", "new Task")
  tempInput.setAttribute("onkeypress", "addToList(event)")
  list.appendChild(tempInput)
}
