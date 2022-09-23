

export class Todo {

    static _template = document.querySelector('#todo-item-template').content;

    constructor({data, handleClickCopy, handleClickEdit, handleClickText, handlClickDelete}, selectors){
       this._data = data;
       this._name = data.name;
       this._handleClickCopy = handleClickCopy;
       this._handleClickEdit = handleClickEdit;
       this._handleClickText = handleClickText;
       this._handlClickDelete = handlClickDelete;
       this._selectors = selectors;
    //    this._handleClickDeleteTodo = this._handleClickDeleteTodo.bind(this);
    }

    createTodo() {
        this._view = Todo._template.querySelector('.todo-item').cloneNode(true);
        this.todoText = this._view.querySelector(this._selectors.text);
        const todoButtonDel = this._view.querySelector(this._selectors.buttonDel);
        const todoButtonCopy = this._view.querySelector(this._selectors.buttonCopy);
        const todoButtonEdit = this._view.querySelector(this._selectors.buttonEdit);
      
        todoButtonDel.addEventListener('click', () => this._handlClickDelete(this))
        todoButtonCopy.addEventListener('click', () => {
            this._handleClickCopy(this);
        })
        todoButtonEdit.addEventListener('click', (evt) => {
            this._handleClickEdit(evt, this);
        })

        this.todoText.addEventListener('click', () => {
            this._handleClickText(this._name)
        })
      
        this.todoText.textContent = this._name;
        return this._view;
    }

    remove () {
        this._view.remove();
        this._view = null;
    }

    getId(){
        return this._data._id;
    }

    getData(){
        const {name, _id, iframeLink} = this._data;
        return {name, _id, iframeLink};
    }


}

