import { NgModule } from "@angular/core";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from "@angular/material";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
    imports: [
        MatInputModule,
        DragDropModule,
        MatNativeDateModule,
        MatDatepickerModule,
        
    ],
    exports: [
         MatInputModule,
         DragDropModule,
         MatDatepickerModule
    ]
})
export class MaterialModule {}