export class List {
    constructor(containerSelector, renderer) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(todoNode){
        this._container.append(todoNode)
    }

    renderItems(todosArray){
        todosArray.forEach( todoData => {
            this._renderer(todoData)
        });
    }
}