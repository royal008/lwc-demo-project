import { LightningElement } from 'lwc';

export default class GitSearchBox extends LightningElement {
  connectedCallback(){
    console.log('connected callblack');
  }
  renderedCallback(){
    console.log('rendered callblack');
  }
  handleChange(event){
    let inputValue = this.template.querySelectorAll("lightning-input")[0].value;
    console.log('inputValue',inputValue);
  }
}
