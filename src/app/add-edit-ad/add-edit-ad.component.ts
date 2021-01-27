import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemoService } from '../services/demo.service';

import { Ad } from '../ad';

@Component({
  selector: 'app-add-edit-ad',
  templateUrl: './add-edit-ad.component.html',
  styleUrls: ['./add-edit-ad.component.css']
})
export class AddEditAdComponent implements OnInit {

  isNewAd : boolean;

  adID : string;
  navTitle: string = "New Ad";

  ad: Ad;

  public adForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              public demoService: DemoService,
              private router: Router) {
    this.isNewAd = this.route.snapshot.url[0].path == 'createad';
    this.navTitle = "Create Ad";
    if(!this.isNewAd){
      this.adID = this.route.snapshot.url[1].path;
      this.navTitle = "Edit Ad";
      this.demoService.get(this.adID).subscribe((data: string) => {
        var obj = JSON.parse(JSON.stringify(data));
        this.ad = obj.response[0];
        this.adForm = new FormGroup({
          title: new FormControl(this.ad.title, [Validators.required, Validators.maxLength(15)]),
          description: new FormControl(this.ad.description, [Validators.required, Validators.maxLength(200)]),
          category: new FormControl(this.ad.category),
          price: new FormControl(this.ad.price)
        });
      })
    }
  }

  ngOnInit(): void {
    // if(this.isNewAd){
      this.adForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        category: new FormControl(''),
        price: new FormControl(0)
      });
    // }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.adForm.controls[controlName].hasError(errorName);
  }

  public createAd = (adFormValue) => {
    if (this.adForm.valid) {
      console.log(adFormValue);
      if(this.isNewAd){
        this.demoService.create(adFormValue).subscribe(res => {
          console.log('Ad created');
          console.log(res);
          this.resetAd();
        });
      }
      else{
        this.demoService.update(this.adID, adFormValue).subscribe(res => {
          console.log('Ad updated');
          console.log(res);
          this.router.navigate(['/']);
        });
      }
    }
  }

  public resetAd = () => {
    this.adForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      category: new FormControl(''),
      price: new FormControl(0, [Validators.min(5)])
    });
  }
}
