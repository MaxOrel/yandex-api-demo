export class Form {
    constructor(formSelectors, submitHandler = null) {
        this._form = document.querySelector(formSelectors);
        this._submitHandler = submitHandler;
    }

    setSubmitAction(action){
        this._submitHandler = action;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitHandler(e)
        })
    }
}