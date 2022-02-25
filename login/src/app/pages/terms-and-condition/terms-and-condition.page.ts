import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.page.html',
  styleUrls: ['./terms-and-condition.page.scss'],
})
export class TermsAndConditionPage implements OnInit {

  @Input() name: string;

  constructor(private modalCtr: ModalController) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Close";
    await this.modalCtr.dismiss(closeModal);
  }
}
