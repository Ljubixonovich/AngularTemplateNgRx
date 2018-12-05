import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

@NgModule({
    imports: [CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({timeOut: 2000, positionClass: 'toast-bottom-right'})
    ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule
    ]
})
export class SharedModule {}