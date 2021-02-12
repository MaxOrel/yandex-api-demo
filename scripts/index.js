const api = new Api({
  url: "https://api-test.pa7lux.ru/streams/",
  headers: {
    "content-type": "application/json",
    // "Authorization":"12sfsd1"
  }
})

const page = document.querySelector('.page');
const createTodoListForm = (...arg) => new TodoListForm(...arg);
const createTodoListItem = (...arg) => new TodoListItem(...arg);

api
  .getAllTasks()
  .then((data) => {
    console.log(data);
    const newData = data.map(item=>{
      return {name: item.name, id: item.id}
    })
    console.log(newData)
    const todoList = new TodoList(
      newData,
      createTodoListForm,
      createTodoListItem,
      api
    );
    todoList.render(page);
  })
  .catch(err=>console.log(err))
