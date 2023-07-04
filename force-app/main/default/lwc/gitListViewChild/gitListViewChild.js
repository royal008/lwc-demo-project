import { LightningElement, api } from 'lwc';

export default class GitListViewChild extends LightningElement {
    @api retrivedUser;

     handleButtonClick() {
        const selectedEvent = new CustomEvent('userclicked', {detail: this.retrivedUser.login});
        this.dispatchEvent(selectedEvent);

    }
}