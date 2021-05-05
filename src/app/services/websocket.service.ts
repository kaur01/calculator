import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { SERVER_URL } from "../config/config";
import { io, Socket } from "socket.io-client";

@Injectable()
export class WebsocketService {
  public socket: Socket;
  public refreshedExpressionList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {
    this.socket = io(SERVER_URL);
  }

  public onConnect(): void {
    try {
      this.socket.on("connect", () => {
        console.log("Socket connection established.");
      });
      this.invalidExpression();
      this.refreshExpressionList();
    } catch (error) {
      const errorMessage = error.message
        ? error.message
        : "There was an error while connecting to the server.";
      throw new Error(errorMessage);
    }
  }

  public emit(input): void {
    try {
      this.socket.emit("input", input);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public refreshExpressionList(): void{
    this.socket.on("refreshed_list", (inputsList) => {
      console.log(inputsList)
      this.refreshedExpressionList.next(inputsList);
    });
  }

  private invalidExpression(): void{
    this.socket.on('invalid_expression', (data) => {alert(data.message)});
  }
}
