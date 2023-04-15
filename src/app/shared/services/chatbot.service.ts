import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  conversation = new Subject<Message[]>();
  
  messageMap:any = {
    "hello": "hi, How can i help you?",
    "order pizza": "Delivery or Takeaway?",
    "delivery": "Which type of pizza would you like to order?",
    "cheese": "Pizza Size?",
    "regular": "Should i Place order now?",
    "yes": "Order placed successfully.Thank you!",
    "default": "I can't understand. Can you please repeat"
  }

  private endpoint = 'https://your-chatbot-api-endpoint.com';

  constructor(private http: HttpClient) {}

  // sendMessage(message: string): Observable<any> {
  //   const body = {
  //     queryInput: {
  //       text: {
  //         text: message,
  //         languageCode: 'en-US'
  //       }
  //     }
  //   };

  //   return this.http.post(`${this.endpoint}/v1/projects/your-project-id/agent/sessions/your-session-id:detectIntent`, body);
  // }

  // sendMessage(message: string): Observable<any> {
  //   const body = { message };
  //   return this.http.post(`${this.endpoint}/chat`, body);
  // }

  sendMessage(message: string): Observable<string> {
    // Simulate the chatbot response
    console.log("Sameed");
    const response = `You said: "${message}" - I'm a chatbot!`;
    return of(response);
  }

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);  
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));

    const utterance = new SpeechSynthesisUtterance(botMessage.content);
    speechSynthesis.speak(utterance);
    
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1000);
  }

  getBotMessage(question: string){
    if(question.includes("hello.")){
      question = "hello";
    }
    else if(question.includes("order pizza.")){
      question = "order pizza";
    }
    else if(question.includes("delivery.")){
      question = "delivery";
    }
    else if(question.includes("cheese.")){
      question = "cheese";
    }
    else if(question.includes("regular.")){
      question = "regular";
    }
    else if(question.includes("yes.")){
      question = "yes";
    }
    else{
      question = question;
    }
    console.log("question " + question);
    let answer = this.messageMap[question];
    console.log("answer " + answer);
    return answer || this.messageMap['default'];
  }
}
