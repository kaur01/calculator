import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "../services/websocket.service";

@Component({
  selector: "calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.css"],
})
export class CalculatorComponent implements OnInit {
  public numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public bottomRow: (number | string)[] = ["C", 0, "="];
  public operators: string[] = ["/", "*", "-", "+", ".", "(", ")"];
  public inputExpression: string = "";
  public expressionList: string[] = [];

  constructor(private webSocketService: WebsocketService) {
    this.webSocketService = webSocketService;
  }

  ngOnInit(): void {
    this.onConnect();
    this.webSocketService.refreshedExpressionList.subscribe((expressions) => {
      this.expressionList = expressions;
    });
  }

  private onConnect() {
    try {
      this.webSocketService.onConnect();
    } catch (error) {
      alert(error);
    }
  }
  public reset(): void {
    this.inputExpression = "";
  }

  public onSubmit(input): void {
    if(input === 'C'){
      this.reset();
    }else if(input === '='){
      this.calculate();
    }else{
    this.inputExpression = this.inputExpression + input;
    }
  }

  public calculate(): void {
    try {
      if (this.inputExpression.length > 0) {
        const stringifiedExpression = this.inputExpression;

        let result = eval(this.inputExpression);
        if (result == "Infinity") {
          result = 0;
        }
        this.expressionList.push(
          stringifiedExpression + "=" + parseFloat(result.toFixed(2))
        );
        this.webSocketService.emit(stringifiedExpression);
        this.inputExpression = "";
      } else {
        alert("Please enter values to calculate.");
      }
    } catch (error) {
      alert("Please enter valid values to calculate.");
    }
  }
}
