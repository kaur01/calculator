import { Component } from '@angular/core';

// const socket = io("http://localhost:3000/");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
}


// socket.on("server", (data: any) => {
//   console.log("data from server", data);
// });

// socket.on("connect", () => {
//   console.log("connected");
//   socket.emit("clientMsg", {
//     message: "HEY THERE!!"
//   });  
// });

