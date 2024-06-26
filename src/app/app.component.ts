import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate } from "@angular/service-worker";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    if (environment.production) {
      try {
        if (this.swUpdate.isEnabled) {
          await this.swUpdate.checkForUpdate();
          await this.swUpdate.activateUpdate();
          document.location.reload();
        }
      } catch (error) {
        this.snackBar.open("Med iskanjem posodobitev je prišlo do napake.");
      }
    }
  }
}
