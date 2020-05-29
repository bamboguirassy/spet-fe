import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { NewMail } from '../../assistanceemail/NewMail';
import { AssistanceEmail } from '../../assistanceemail/assistanceemail';
import { ActivatedRoute } from '@angular/router';
import { AssistanceEmailService } from '../../assistanceemail/assistanceemail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  type: AbstractControl;
  description: AbstractControl;
  newMail: NewMail;
  assistances: AssistanceEmail[] = [];
  message: string;
  constructor(public acivatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public assistanceEmailSrv: AssistanceEmailService) { 
    this.contactForm = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.type = this.contactForm.controls.type;
    this.description = this.contactForm.controls.description;
    this.newMail = new NewMail()
  }
        
  ngOnInit() {
    this.assistances = this.acivatedRoute.snapshot.data['assistants'];
  }
  EnvoiMail() {
    this.newMail.message = "<div style='background-color:orangered; text-align:center; color:white;'><h3>Problème de l'étudiant</h3></div><div" + this.message + "</div>";
    this.assistanceEmailSrv.sendMail(this.newMail)
      .subscribe(() => {
        this.contactForm.reset();
      }, error => console.log(error));
  }


}
