import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Mexp from 'math-expression-evaluator';
import { Token } from '@angular/compiler';
import { createTokens, tokenTypes } from 'math-expression-evaluator/dist/types/token';
import { Parser } from 'expr-eval';
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private url = "http://localhost:8090/calculate/";
  constructor(private http: HttpClient) {}
  public calculate(first:number,second:number,operation:string): string{
    console.log("Access: "+this.url + first + "/" + second + "/" + operation);
    const parser = new Parser;
    var expression = first.toString() + ' ' + operation + ' ' + second.toString()
    console.log(expression);
    if(operation.includes('div') && second==0){
      return 'Math error : division by zero';
    }else if(operation.includes('sq')){
      expression = first.toString() + ' ^ 2';
    }else if(operation.includes('rt')){
      if(second < 0){
        return 'Math error : root of negative';
      }
      expression = first.toString() + ' ^ (0.5)';
    }else if(operation.includes('inverse')){
      if(second == 0){
        return 'Math error : division by zero';
      }
      expression = '1 / ' + first.toString();
    }else if(operation.includes('mul')){
      expression = first.toString() + ' * ' + second.toString();
    }else if(operation.includes('div')){
      expression = first.toString() + ' / ' + second.toString();
    }
    let expr = parser.parse(expression);
    var result:number = expr.evaluate(); 
    console.log(result);
    return result.toString();
  }
}