import { Api } from "./api.js";
import { Form } from "./form.js";
import { List } from "./list.js";
import { PopupImage } from "./popup-image.js";
import { Popup } from "./popup.js";
import { Todo } from "./todo.js";

const selectors = {
  form: '.todos__form',
  input: '.todo-form__input',
  list: '.todos__list',
  template: '#todo-item-template',
  item: '.todo-item',
  text: '.todo-item__text',
  buttonDel: '.todo-item__del',
  buttonCopy: '.todo-item__copy',
  buttonEdit: '.todo-item__edit',
  buttonSubmit: '.todo-form__submit-btn'
}

const form = document.querySelector(selectors.form);
const input = form.querySelector(selectors.input);
const submitButton = form.querySelector(selectors.buttonSubmit);

const config = {
  url: 'https://api.todo-list.ru',
  headers: {
      "content-type": "application/json",
      // "Authorization": "123123123sdfsdf"
  }
}

function createTodo(dataTodo) {
  const todoItem = new Todo({ 
    data: dataTodo,
    handleClickCopy : (todoInstance) => {
      const { name } = todoInstance.getData()
      api.addTask({name})
        .then(function(dataFromServer){
          todoList.addItem(createTodo(dataFromServer))
          input.value = ""
        })
        .catch(function(err){
          console.log('Ошибка', err);
          errorPopup.open()
        })

      todoList.addItem(todoInstance.createTodo())
    },
    handleClickEdit : (evt, todoInstance) => {
      const todoText = evt.target.closest(selectors.item).querySelector(selectors.text);

      input.value = todoText.textContent;
      
      submitButton.textContent = 'Изменить';
      function editTodo(evt){
        evt.preventDefault();
        
        api.editTask({name: input.value}, todoInstance.getId())
          .then(function(dataFromServer){
            todoText.textContent = dataFromServer.name;
            submitButton.textContent = 'Добавить';
            input.value = '';
            todoFormInstance.setSubmitAction(addTodo)
          })
          .catch(function(err){
            console.log('Ошибка', err);
            errorPopup.open()
          })
      }
  
      todoFormInstance.setSubmitAction(editTodo)
    },
    handleClickText: (data) => {
      successPopup.open(data);
    },
    handlClickDelete: (todoInstance) => {
      console.log();
      api.removeTask(todoInstance.getId())
        .then(()=> {
          todoInstance.remove();
        })
        .catch(function(err){
          console.log('Ошибка', err);
          errorPopup.open()
        })
    }
  }, selectors);
  return todoItem.createTodo();
}

function addTodo(evt){
  evt.preventDefault();

  const dataToServer = {name: input.value}
  api.addTask(dataToServer)
    .then(function(dataFromServer){
      todoList.addItem(createTodo(dataFromServer))
      input.value = ""
    })
    .catch(function(err){
      console.log('Ошибка', err);
      errorPopup.open()
    })
}

const api = new Api(config);

const todoList = new List(selectors.list, (dataTodo) => {
  todoList.addItem(createTodo(dataTodo))
});

const todoFormInstance = new Form(selectors.form, addTodo);
todoFormInstance.setEventListeners()

const successPopup = new Popup('.popup_type_success');
successPopup.setEventListener();

const errorPopup = new Popup('.popup_type_error');
errorPopup.setEventListener();



api.getAllTasks()
  .then(function(data) {
    todoList.renderItems(data);
  })
  .catch(function(err){
    console.log('Ошибка', err);
    errorPopup.open()
  })

// let userId = null;

  // api.getAllInfo()
  //   .then(function([dataOneTask, dataAllTask]){

  //   })
  //   .catch(function(err){
  //     console.error('Ошибка',err);
  //   })