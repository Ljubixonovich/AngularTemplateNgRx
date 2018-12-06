import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "./material/material.module";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({timeOut: 2000, positionClass: 'toast-bottom-right'}),
        MaterialModule
    ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule,
        MaterialModule
    ]
})
export class SharedModule {}