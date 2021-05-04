import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent{
  public numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  public operators: string[] = ['/','*','-','+','.'];
  public inputs: string = '';
  public inputList: string[] = [];

  constructor(private httpClient: HttpClient, public formBuilder: FormBuilder, public router : Router) {
  }

  public reset(): void{
    this.inputs = '';
  }

  public onSubmit(input): void{
    this.inputs=this.inputs + input;
  }

  public calculate(): void{
    const inputString = this.inputs;
    const result = eval(this.inputs);
    this.inputList.push(inputString + '=' + result.toFixed(2));
    this.inputs = '';
  }
}