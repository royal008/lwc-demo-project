import { LightningElement , wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import searchMessage from '@salesforce/messageChannel/gitSearchMessagingChannel__c';
export default class GitSearchBox extends LightningElement {

  searchText = 'sowmya';

  constructor(){
    super();
    console.log('constructor callblack parent');
  }
  connectedCallback(){
    
    console.log('connected callblack parent');
  }
  renderedCallback(){
    console.log('rendered callblack parent');
  }

  @wire(MessageContext)
    messageContext;
  
    handleChange(event){
   // this.template.querySelector('c-git-child-search').logInConsole();
    let inputValue = this.template.querySelectorAll("lightning-input")[0].value;
    console.log('inputValue',inputValue);
   // this.searchText = inputValue;

        const payload = { isTermValid:true, searchTerm:inputValue };

        publish(this.messageContext, searchMessage, payload);
  }
}