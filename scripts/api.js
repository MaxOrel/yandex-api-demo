export class Api {
    #onResponce(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject({message: 'Ошибка на стороне сервера', res})
    }

    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }


    // getAllInfo(){
    //   return Promise.all([this.getTaskById(288), this.getAllTasks()]) 
    // }

    getTaskById(idTask){
        return fetch(`${this._url}/tasks/${idTask}`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this.#onResponce)
    }

    getAllTasks(){
        return fetch(`${this._url}/tasks`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this.#onResponce)
    }

    removeTask(idTask){
        return fetch(`${this._url}/tasks/${idTask}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponce)
    }

    addTask(data){
        return fetch(`${this._url}/tasks`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.#onResponce)
    }

    editTask(data, idTask){
        return fetch(`${this._url}/tasks/${idTask}`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.#onResponce)
    }
}