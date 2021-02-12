const onError = (res)=>{
  if(res.ok){
    return res.json();
  }
  return Promise.reject('Сервер не доступен')
}

class Api{
  constructor(config){
    this._url = config.url;
    this.headers = config.headers;
  }

  getAllTasks(){
    return fetch(this._url, {
      method: "GET",
      headers: this._headers
    }).then(onError)
  }


  addTask(data){
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onError)
  }


  removeTask(id){
    return fetch(`${this._url}${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onError)
  }


}
