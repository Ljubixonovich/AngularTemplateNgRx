import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { TestComponent } from "./test/test.component";


const appRoutes : Routes = [
    { path: '', component: HomeComponent},
    { path: 'test', component: TestComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}