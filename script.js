const classNames = {  
  STD_DELETE: 'std-delete',
  STD_ITEM: 'std-container',
  STD_CHECKBOX: 'std-checkbox',
  STD_TEXT: 'std-text',
}

const list = document.getElementById('std-list');
const stdCountSpan = document.getElementById('std-count');
const noShowCountSpan = document.getElementById('unchecked-count');

let items = [];




//function to create a person  block 

function Person(name){
  this.name = prompt('enter a name')
  this.checked = true
  this.element = null
  this.checkbox = null
   
}



//placing toggleCheck on Person.prototype
 //makes it available to all instances of Person
Person.prototype.toggleCheck = function(){
  this.checked = !this.checked
  if (this.element  && this.checkbox) {
    this.checkbox.checked = this.checked
  } else {
    this.element = studentDisplay(this)
  }
}   


function studentDisplay(student){
  if (student.element) return student.element	
  const deleteButton = document.createElement('button')
  deleteButton.innerHTML = 'Delete'
  deleteButton.className = classNames.STD_DELETE
  deleteButton.onclick = removeStudent
  deleteButton.refStudent = student
  
  const checkbox = document.createElement('input')
  checkbox.className = classNames.STD_CHECKBOX
  checkbox.type = 'checkbox'
  checkbox.checked = student.checked
  checkbox.refStudent = student
  checkbox.onchange = toggleChecked
  
  const span = document.createElement('span')
  span.className = classNames.STD_TEXT
  span.setAttribute('contenteditable', 'true')
  span.innerHTML = student.name
  
  const li = document.createElement('li')
  li.className = classNames.STD_ITEM
   li.appendChild(deleteButton)
  li.appendChild(checkbox)
  li.appendChild(span)
 
  
  student.element  = li
  student.checkbox = checkbox
  return li
}



 function display(){
   list.innerHTML = ''
   items.map(studentDisplay).forEach(student => list.appendChild(student))
   noShowCountSpan.innerHTML = count(items, student => !student.checked)
   stdCountSpan.innerHTML = items.length
   return false
	
}

function count(arr, fn) {
  return arr.reduce((acc, next) => fn(next) ? acc + 1 : acc, 0)
}

function addNewStudent() {
  const student = new Person(name) 
  if ((student.name =='') || (student.name == null))
   {
	  alert('enter a name ')
   }
    else
	{
    let newName = true
		items.map(std => {
      if(student.name === std.name)
      {
        newName = false
      }
    })
     if(newName)
     {
	     items.push(student)
	     return display()
     }
     }
}



function toggleChecked() {
  this.refStudent.toggleCheck()
  return display()
}

function removeStudent() {
  const student = this.refStudent
  items = items.filter(t => t !== student)
  return display()
}

 
  


  
