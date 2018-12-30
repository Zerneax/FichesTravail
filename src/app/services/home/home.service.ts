import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  inf: boolean = false;
  minA: number = 0;
  minB: number = 0;
  maxA: number = 0;
  maxB: number = 0;

  constructor() { }


  setInformations(isInf, minA, maxA, minB, maxB) {
    if(isInf != "")
      this.inf = isInf;
    this.minA = minA;
    this.minB = minB;
    this.maxA = maxA;
    this.maxB = maxB;
  }

  generateRandomNumber(min, max) {
    return Math.ceil((Math.random() * max) + min);
  }

  generateBInfToA(a, b) {

  }

  generateAAndB(a, b) {

  }
  // test
  generateAdds(nbAdd) {
    let calculations: Array<String> = [];
    for(var i = 0; i < nbAdd;) {
      let a, b;

      if(this.inf) {
        do {
          a = this.generateRandomNumber(this.minA, this.maxA);
          b = this.generateRandomNumber(this.minB, this.maxB);
        } while(b > a);
      } else {
        a = this.generateRandomNumber(this.minA, this.maxA);
        b = this.generateRandomNumber(this.minB, this.maxB);
      }
      let calculation = '' + a + ' + ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }

    }
    return calculations;
  }

  generateSubs(nbSub) {
    let calculations : Array<String> = [];
    for(var i = 0; i < nbSub;) {
      let a, b;

      if(this.inf) {
        do {
          a = this.generateRandomNumber(this.minA, this.maxA);
          b = this.generateRandomNumber(this.minB, this.maxB);
        } while(b > a);
      } else {
        a = this.generateRandomNumber(this.minA, this.maxA);
        b = this.generateRandomNumber(this.minB, this.maxB);
      }

      let calculation = '' + a + ' - ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }
    }
    return calculations;
  }

  generateMuls(nbMul) {
    let calculations : Array<String> = [];
    for(var i = 0; i < nbMul;) {
      let a, b;

      if(this.inf) {
        do {
          a = this.generateRandomNumber(this.minA, this.maxA);
          b = this.generateRandomNumber(this.minB, this.maxB);
        } while(b > a);
      } else {
        a = this.generateRandomNumber(this.minA, this.maxA);
        b = this.generateRandomNumber(this.minB, this.maxB);
      }

      let calculation = '' + a + ' x ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }
    }
    return calculations;
  }


  generateDivs(nbDiv) {
    let calculations : Array<String> = [];
    for(var i = 0; i < nbDiv;) {
      let a, b;

      if(this.inf) {
        do {
          a = this.generateRandomNumber(this.minA, this.maxA);
          b = this.generateRandomNumber(this.minB, this.maxB);
        } while(b > a);
      } else {
        a = this.generateRandomNumber(this.minA, this.maxA);
        b = this.generateRandomNumber(this.minB, this.maxB);
      }
      
      let calculation = '' + a + ' : ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }
    }
    return calculations;
  }

  generatePDF(calculations) {

    var nbPages = 1;

    var maxPages = 1;
    if(calculations.length > 24  )
      maxPages = Math.round(calculations.length / 24);

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

    for(var i = 0; i < calculations.length; i ++) {
      doc.text(calculations[i], x, y);
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
}
