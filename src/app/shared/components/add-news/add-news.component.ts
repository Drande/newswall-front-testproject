import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewsTypes } from '../../enums/news-types.enum';
import { triggerControlValidators } from '../../utils/reactive-forms.utils';
import { NewsModel } from '../../models/news.model';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  NewsTypes = NewsTypes;

  newsForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    text: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<NewsTypes>(NewsTypes.NORMAL, { nonNullable: true, validators: [Validators.required] }),
    tags: new FormArray<FormControl<string>>([]),
    imageUrl: new FormControl<string>("", { nonNullable: true,  validators: [ Validators.required ] }),
    slides: new FormArray(
      [
        new FormGroup({
          title: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
          imageUrl: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] })
        })
      ],
      { validators: [ Validators.required, Validators.minLength(1) ] }
    )
  });

  availableTags: { label: string, value: string }[] = [
    { label: "Global", value: "Global"},
    { label: "Animals", value: "Animals"},
    { label: "Technology", value: "Technology"},
    { label: "Nature", value: "Nature"},
    { label: "Science", value: "Science"},
    { label: "Education", value: "Education"},
    { label: "Office", value: "Office"},
    { label: "Entertainment", value: "Entertainment"},
  ];

  typeOptions: { label: string, value: NewsTypes}[] = [
    { label: "Normal", value: NewsTypes.NORMAL },
    { label: "Slideshow", value: NewsTypes.SLIDESHOW }
  ];

  normalNewsFormMap: Record<string, boolean> = {
    imageUrl: true,
    slides: false
  }

  slideshowFormMap: Record<string, boolean> = {
    imageUrl: false,
    slides: true
  }

  constructor(
    private ref: DynamicDialogRef
  ) {
    this.newsForm.controls['type'].valueChanges.subscribe(type => {
      // Return if null or undefined
      if(!type) return;
      this.handleTypeChange(type);
    });
    this.handleTypeChange(this.typeOptions[0].value);
  }

  ngOnInit(): void {
  }

  handleTypeChange(type: NewsTypes) {
    const controlMapWhitelist = {
      [NewsTypes.NORMAL]: this.normalNewsFormMap,
      [NewsTypes.SLIDESHOW]: this.slideshowFormMap
    }[type];

    Object.entries(controlMapWhitelist).map(([controlName, enable]) => {
      // Making sure we dont handle a non-existing control
      const formControls = Object.keys(this.newsForm.controls);
      if(!formControls.includes((controlName))) { return; }

      // Disabling and enabling required controls based on selected type
      const control = this.newsForm.controls[controlName as keyof typeof this.newsForm.controls];
      if(enable) { control.enable(); }
      else { control.disable(); }
    });
  }

  addSlide() {
    this.newsForm.controls['slides'].push(
      new FormGroup({
        title: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
        imageUrl: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] })
      })
    );
  }
  
  removeSlide(index: number) {
    const slidesControl = this.newsForm.controls['slides'];
    if(slidesControl.length > 1) {
      slidesControl.removeAt(index);
    }
  }

  submitForm() {
    if(!this.newsForm.valid) {
      // Setting controls as touched with an utility method to force validation errors on form inputs
      triggerControlValidators(this.newsForm);
      return;
    }

    // If the form is valid we return the form data to the onClose listener
    // The form value is casted to NewsModel since we know that it matches the type if its valid
    const data: NewsModel = this.newsForm.value as NewsModel;
    this.ref.close(data);
  }

  close() {
    this.ref.close();
  }

}
