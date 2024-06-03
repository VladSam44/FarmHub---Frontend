import { Component } from '@angular/core';
import { OpenAiService } from '../../services/open-ai.service';
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  searchTxtVal:string= '';
  output : string = "";
  showOutput : boolean = false
  title = 'OpenAIAngularApp';
  isLoading:boolean = false;
  constructor(private service: OpenAiService){
  }
  getResult()
  {
    this.isLoading = true;
    this.output = "";
    this.service.getData(this.searchTxtVal).subscribe(data =>{

       this.output = data as string;
       this.showOutput = true
       this.isLoading = false;
     })
  }
}
