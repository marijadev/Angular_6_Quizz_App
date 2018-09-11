import { Component, OnInit, ViewChild, ViewContainerRef, Input, ForwardRefFn } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Question } from '../../shared/question.model';
import { ComponentFactoryResolver } from '@angular/core';
import { SingleChoiceComponent } from './question-type/single-choice/single-choice.component';
import { MultipleChoiceComponent } from './question-type/multiple-choice/multiple-choice.component';
import { TextComponent } from './question-type/text/text.component';
import { OrderComponent } from './question-type/order/order.component';
import { questionTypes } from '../../shared/constants';
import { QuestionService } from '../question.service';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
	type: string;
	componentRef_: any;
	childInstance: any;
	@ViewChild('dynamic', { read: ViewContainerRef }) container: ViewContainerRef;
	questionForm: FormGroup;
	difficulties: string[] = ['Easy', 'Medium', 'Difficult'];
	categories: string[] = ['JavaScript', 'Java', 'PHP'];
	questionTypes: string[];
	subscription: Observable<any>;
	newQuestion: Question = {
		id: null,
		question: '',
		category: '',
		difficulty: '',
		type: '',
		answers: []
	};
	childInvalid: boolean = false;

	constructor(private componentResolver: ComponentFactoryResolver, private qService: QuestionService) { }

	ngOnInit() {
		this.questionForm = new FormGroup({
			'question': new FormControl(null),
			'category': new FormControl(null),
			'difficulty': new FormControl(null),
			'type': new FormControl(null)
		})
		this.questionTypes = Object.keys(questionTypes);
	}

	visibleComponent = () => {
		this.container.clear();

		if (this.type == 'Single Choice') {
			const componentFactory = this.componentResolver.resolveComponentFactory(SingleChoiceComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
			this.childInstance = this.componentRef_.instance;
		}
		else if (this.type == 'Multiple Choice') {
			const componentFactory = this.componentResolver.resolveComponentFactory(MultipleChoiceComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
			this.childInstance = this.componentRef_.instance;
		}
		else if (this.type == 'Text') {
			const componentFactory = this.componentResolver.resolveComponentFactory(TextComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
		}
		else if (this.type == 'Order') {
			const componentFactory = this.componentResolver.resolveComponentFactory(OrderComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
		}
		else if (this.type == 'Connecting') {
			const componentFactory = this.componentResolver.resolveComponentFactory(OrderComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
		}
	}

	ngOnDestroy() {
		this.componentRef_.destroy();
	}

	onTypeChange(e: any) {
		const type = e.target.value;
		this.newQuestion.type = type;
		this.type = type;
		this.visibleComponent();
	}

	onSubmitQuestion() {
		this.newQuestion.id = Math.floor(Math.random() * 100000) + 1;
		this.newQuestion.question = this.questionForm.controls.question.value;
		this.newQuestion.category = this.questionForm.controls.category.value;
		this.newQuestion.difficulty = this.questionForm.controls.difficulty.value;
		this.newQuestion.type = this.questionForm.controls.type.value;

		this.newQuestion.answers = this.componentRef_.instance.values;
		console.log(this.newQuestion)
	}
}
