import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
	
  @Input("open") openEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input("title") title: string ='';
  @Input("saveText") saveText: string = 'Ok';
  @Input("cancelText") cancelText: string = 'Cancel';
  @Input("visible") visible: boolean = false;
  @Input("save") save = this.close;
  @Input("modalSize") modalSize: string = "";
  @Output("close") closeEvent: EventEmitter<{ action: string, initiator: any }> = new EventEmitter<{ action: string, initiator: any }>();

  private initiator: any;

  private tick_then(fn) { 
    setTimeout(fn, 0);
  }

  constructor() {
  }

  ngOnInit() {
    this.openEvent.subscribe(initiator => {
      this.visible = !!initiator; //TODO revisit this
      this.initiator = initiator;
    })
  }

  close(action: string, event: Event) {
    if (action == 'ok')
      this.closeEvent.emit({ action: "closing", initiator: event });
      
    if (event.defaultPrevented)
      return;

    this.visible = false;
    this.closeEvent.emit({ action: action, initiator: this.initiator });
  }
  
  toggleVisiblity() {
    this.visible = !this.visible;
  }

}
