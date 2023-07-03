import { LightningElement,api } from 'lwc';

export default class GitChildSearch extends LightningElement {
@api fromParentName;

@api 
logInConsole(){
console.log('log in console api');
}

 @api notFromParentName;
 constructor(){
    super();
    console.log('child Constructor');
 }
 connectedCallback(){
   console.log('child connected');
 }

 renderedCallback(){
    console.log('child rendered');
 }
}