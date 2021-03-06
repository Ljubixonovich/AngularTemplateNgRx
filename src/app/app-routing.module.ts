import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { TestComponent } from "./test/test.component";
import { AuthGuard } from './auth/auth-guard.service';


const appRoutes : Routes = [
    { path: '', component: HomeComponent},
    { path: 'test', component: TestComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}