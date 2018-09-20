import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from '../users/users.component';
import { QuestionComponent } from '../questions/question/question.component';
import { ResultsComponent } from '../results/results.component';
import { HeaderComponent } from './header/header.component';
import { TestsComponent } from '../tests/tests.component';
import { PassedTestsComponent } from '../tests/passed-tests/passed-tests.component';
import { ProfileComponent } from './profile/profile.component';

const coreRoutes: Routes = [
	{
		path: 'home', component: HomeComponent, children: [
			{ path: 'question', component: QuestionComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'results', component: ResultsComponent },
			{ path: 'users', component: UsersComponent },
			{ path: 'passed-tests', component: PassedTestsComponent },
			{ path: 'tests', component: TestsComponent },
		]
	},
	{ path: 'header', component: HeaderComponent },
]

@NgModule({
	imports: [RouterModule.forChild(coreRoutes)],
	exports: [RouterModule]
})

export class CoreRoutingModule { }