import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  generateForm: FormGroup;
  calculations: Array<String> = [];

  constructor(private formBuilder: FormBuilder,
    private homeService: HomeService) { }

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

    let minA = this.generateForm.value['minA'];
    let maxA = this.generateForm.value['maxA'];
    let minB = this.generateForm.value['minB'];
    let maxB = this.generateForm.value['maxB'];
    let nbAdd = this.generateForm.value['nbAdd'];
    let nbSub = this.generateForm.value['nbSub'];
    let nbMul = this.generateForm.value['nbMul'];
    let nbDiv = this.generateForm.value['nbDiv'];

    if( nbAdd != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateAdds(nbAdd, minA, maxA, minB, maxB));
    }

    if( nbSub != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateSubs(nbSub, minA, maxA, minB, maxB));
    }

    if( nbMul != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateMuls(nbMul, minA, maxA, minB, maxB));
    }

    if( nbDiv != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateDivs(nbDiv, minA, maxA, minB, maxB));
    }

    for(var i = 0; i < this.calculations.length; i ++) {
      console.log("" + this.calculations[i]);
    }
  }

  generatePDF() {
    this.homeService.generatePDF(this.calculations);
  }

  submit() {
    this.generateCalculations();
    this.generatePDF();
  }
}
