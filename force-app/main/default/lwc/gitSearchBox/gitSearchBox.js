import { LightningElement , wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import searchMessage from '@salesforce/messageChannel/gitSearchMessagingChannel__c';

export default class GitSearchBox extends LightningElement {

  searchText = 'sowmya';
  connectedCallback(){
    console.log('connected callblack');
  }
  renderedCallback(){
    console.log('rendered callblack');
  }

  @wire(MessageContext)
    messageContext;


  handleChange(event){
    let inputValue = this.template.querySelectorAll("lightning-input")[0].value;
    console.log('inputValue',inputValue);
    this.searchText = inputValue;

        const payload = { isTermValid:true, searchTerm:inputValue };

        publish(this.messageContext, searchMessage, payload);
  }
}