export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector)
    }

    _handleEscUp = (evt) => {
        if(evt.key ==='Escape'){
            this.close()
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscUp)
    }

    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keyup', this._handleEscUp)

    }

    setEventListener() {
        this._popup.addEventListener('mousedown', (evt) => {
            if(evt.target ||  evt.target) {
                this.close()
            }
        })
    }
}