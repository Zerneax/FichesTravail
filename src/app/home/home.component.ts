import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  generateForm: FormGroup;
  calculations: Array<String> = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.generateForm = this.formBuilder.group({
      minA: ['', Validators.required],
      maxA: ['', Validators.required],
      minB: ['', Validators.required],
      maxB: ['', Validators.required],
      add: [''],
      nbAdd: [''],
      sub: [''],
      nbSub: [''],
      mul: [''],
      nbMul: [''],
      div: [''],
      nbDiv: ['']
    });
  }

  generateCalculations() {

    if(this.generateForm.value['nbAdd'] != undefined) {
      this.generateAdds();
    }

    if(this.generateForm.value['nbSub'] != undefined) {
      this.generateSubs();
    }

    if(this.generateForm.value['nbMul'] != undefined) {
      this.generateMuls();
    }

    if(this.generateForm.value['nbDiv'] != undefined) {
      this.generateDivs();
    }

    for(var i = 0; i < this.calculations.length; i ++) {
      console.log("" + this.calculations[i]);
    }
  }

  generateAdds() {

    for(var i = 0; i < this.generateForm.value['nbAdd'];) {
      let a = this.generateRandomNumber(this.generateForm.value['minA'], this.generateForm.value['maxA']);
      let b = this.generateRandomNumber(this.generateForm.value['minB'], this.generateForm.value['maxB']);
      let calculation = '' + a + ' + ' + b + " = ______";
      if(!this.calculations.includes(calculation)) {
        this.calculations.push(calculation);
        i ++;
      }

    }
  }

  generateSubs() {

    for(var i = 0; i < this.generateForm.value['nbSub'];) {
      let a = this.generateRandomNumber(this.generateForm.value['minA'], this.generateForm.value['maxA']);
      let b = this.generateRandomNumber(this.generateForm.value['minB'], this.generateForm.value['maxB']);
      let calculation = '' + a + ' - ' + b + " = ______";
      if(!this.calculations.includes(calculation)) {
        this.calculations.push(calculation);
        i ++;
      }
    }
  }

  generateMuls() {

    for(var i = 0; i < this.generateForm.value['nbMul'];) {
      let a = this.generateRandomNumber(this.generateForm.value['minA'], this.generateForm.value['maxA']);
      let b = this.generateRandomNumber(this.generateForm.value['minB'], this.generateForm.value['maxB']);
      let calculation = '' + a + ' x ' + b + " = ______";
      if(!this.calculations.includes(calculation)) {
        this.calculations.push(calculation);
        i ++;
      }
    }
  }

  generateDivs() {

    for(var i = 0; i < this.generateForm.value['nbDiv'];) {
      let a = this.generateRandomNumber(this.generateForm.value['minA'], this.generateForm.value['maxA']);
      let b = this.generateRandomNumber(this.generateForm.value['minB'], this.generateForm.value['maxB']);
      let calculation = '' + a + ' : ' + b + " = ______";
      if(!this.calculations.includes(calculation)) {
        this.calculations.push(calculation);
        i ++;
      }
    }
  }

  generateRandomNumber(min, max) {
    return Math.ceil((Math.random() * max) + min);
  }

  generatePDF() {

    var nbPages = 1;

    var maxPages = 1;
    if(this.calculations.length > 24  )
      maxPages = Math.round(this.calculations.length / 24);

    var doc = new jsPDF();

    doc.setLineWidth(1);
    doc.rect(5, 5, 100, 25);
    doc.rect(105, 5, 100, 25);
    doc.setFontStyle("bold");
    doc.setFontSize(22);
    doc.text('Calculs', 40, 20);

    doc.setFontStyle("normal");
    doc.setFontSize(14);
    var x = 20;
    var y = 50;

    for(var i = 0; i < this.calculations.length; i ++) {
      doc.text(this.calculations[i], x, y);
      x += 60;

      if(i != 0 && i % 23 == 0) {
        x = 20;
        y = 50;
        doc.text('Page ' + nbPages + '/' + maxPages, 180, 290);
        nbPages ++;

        doc.addPage(nbPages, 'a6');
        doc.setLineWidth(1);
        doc.rect(5, 5, 100, 25);
        doc.rect(105, 5, 100, 25);
        doc.setFontStyle("bold");
        doc.setFontSize(22);
        doc.text('Calculs', 40, 20);

        doc.setFontStyle("normal");
        doc.setFontSize(14);
      }

      if(x > 140) {
        x = 20;
        y += 30;
      }

    }

    doc.text('Page ' + nbPages + '/' + maxPages, 180, 290);
    doc.save('Fiche calculs.pdf');
  }

  submit() {
    this.generateCalculations();
    this.generatePDF();
  }
}
