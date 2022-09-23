import { Popup } from "./popup.js";

export class PopupImage extends Popup{
    constructor(popupSelector){
        super(popupSelector)
    }

    open(name){
        console.log('тут логика открытия карточки', name);
        super.open()
    }


}