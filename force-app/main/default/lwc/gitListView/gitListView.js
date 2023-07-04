import { LightningElement, api,wire,track} from 'lwc';
import { subscribe,unsubscribe,APPLICATION_SCOPE, MessageContext} from 'lightning/messageService';
import searchMessage from '@salesforce/messageChannel/gitSearchMessagingChannel__c';
import insertContact from '@salesforce/apex/GitComponentController.insertContact';
import { getRecord } from 'lightning/uiRecordApi';

const QUERY_USER_ENDPOINT_URL = 'https://api.github.com/search/users?q=';
export default class GitListView extends LightningElement {

    subscription = null;

    @api personName;

    retrivedUsers = [];
    selectedUser = '';
    retriveduserName ='';

    @wire(MessageContext)
    messageContext;

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                searchMessage,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

   async handleMessage(message){
        console.log('handleMessage', message);
        this.personName = message.searchTerm;
        let queryEndPoint = QUERY_USER_ENDPOINT_URL+this.personName;
        try{
        const RESPONSE=await fetch(queryEndPoint);
        const USER_LIST=await RESPONSE.json();
        console.log(USER_LIST.items);
        this.retrivedUsers=USER_LIST.items;
        }catch(error){
            console.log(error);
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleOnUserClicked(event){
        console.log(event.detail);
        this.selectedUser = event.detail;
    }

    @wire(getRecord, { recordId: '0015i00000li0SWAAY', fields: 'Account.Name' })
    wiredRecord({ error, data }) {
    if(error){
    console.log(error) ;
    }else if(data){
        console.log(data);
        this.retriveduserName=data.fields.Name.value;
    }
    }
    async handleSaveUserClick(){
        console.log('save user to SF');
        try{
            const isSuccess = await insertContact({contactName : this.selectedUser});
            console.log('Record created '+isSuccess);
        }catch(error){
        console.log(error);
        }
        
    }
}