import { Component, OnInit } from '@angular/core';
import { ChatbotService, Message } from '../shared/services/chatbot.service';
import { VoiceRecognitionService } from '../shared/services/voice-recognition.service'

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  messages: Message[] = [];
	value: string = '';
	chatFlag: boolean = false;

	constructor(public chatService: ChatbotService, public voiceService: VoiceRecognitionService) { }

	ngOnInit() {
		this.chatService.conversation.subscribe((val) => {
			this.messages = this.messages.concat(val);
		});
		this.voiceService.init();
	}

	openChatBot() {
		this.chatFlag = !this.chatFlag;
	}

	sendMessage() {
		this.chatService.getBotAnswer(this.value);
		this.value = '';
	}

	startService() {
		this.voiceService.start()
	}

	stopService() {
		const msg = this.voiceService.stop();
		this.chatService.getBotAnswer(msg);
	}

}
