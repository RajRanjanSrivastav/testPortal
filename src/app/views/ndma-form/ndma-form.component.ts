

import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { HrjobService } from '../../services/hrjob.service';

@Component({
  selector: 'app-ndma-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink,CommonModule],
  templateUrl: './ndma-form.component.html',
  styleUrl: './ndma-form.component.css'
})
export class NdmaFormComponent implements OnInit {

  addUserFrom: any = FormGroup;
  public showhide: boolean = false;
  toaster: any;
  allstateDropDownList: any;
  currentDistrictDropDownList: any;
  permanentDistrictDropDownList: any;
  files: any = [];
  formData = new FormData();
  positionDropDownList: any = [];
  start_date: any;
  end_date: any;
  timeDiff: any;
  daysDifference: any;
  daysDiff: any;
  showOther: boolean = false;

  // updated
  // exampleData = ['Option 1', 'Option 2', 'Option 3'];
  exampleData: Array<{ id: string, text: string }> = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' }
  ];
  selectedValue: string;
  select2Options: any = {
    width: '300',
    multiple: true,
    tags: true
  };




  constructor(
    private NdmaHrService: HrjobService,
    private routeId: ActivatedRoute, private fb: FormBuilder) { this.selectedValue = 'Option 1'; }

  ngOnInit(): void {
    this.saveHrFormGroup();
    this.getAllStateName();
    this.getPostionName();
    this.onAddEucation();
    this.onAddExperience();
    this.onAddTraining();
    this.onAddRefrences();
    this.onAddRefrences();
  }

  eduRow = [{ id: 1, name: 'education' }]
  id: any;
  trainingRow = [{ id: 1, name: 'training' }]
  expRow = [{ id: 1, name: 'experience' }]
  referenceRow = [{ id: 1, name: 'references' }]
  oneduDel: boolean = false;
  ontrainDel: boolean = false;
  onexpDel: boolean = false;
  onrefDel: boolean = false;
  showSpouse: boolean = false;
  showPayBand: boolean = false;
  totalAge: number = 0;
  copyData: boolean = false;
  totalTraining: number = 0;
  totalExperience: number = 0;
  wordCount: number = 0;
  maxWords: number = 250;


  //this is form builder
  saveHrFormGroup() {
    this.addUserFrom = this.fb.group({
      id: new FormControl(''),
      post_id: new FormControl(''),
      // position: new FormControl(''),
      salutation: new FormControl(''),
      name: new FormControl(''),
      fathername: new FormControl(''),
      mothername: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl(''),
      marital_status: new FormControl(''),
      email: new FormControl(''),
      spouse_name: new FormControl(''),
      Phonenumber: new FormControl(''),
      file: new FormControl(''),
      nationality: new FormControl(''),
      sectoral_expertise: new FormControl(''),
      hazard_specific_expertise: new FormControl(''),
      Other_hazard_specific_expertise: new FormControl(''),


      current_address: new FormControl(''),
      current_state_id: new FormControl(''),
      current_city: new FormControl(''),
      current_district_id: new FormControl(''),
      current_pincode: new FormControl(''),
      current_streetno: new FormControl(''),

      permanent_address: new FormControl(''),
      permanent_state_id: new FormControl(''),
      permanent_district_id: new FormControl(''),
      permanent_city: new FormControl(''),
      permanent_pincode: new FormControl(''),
      permanent_streetno: new FormControl(''),

      copy_address: new FormControl(false),

      education: this.fb.array([]),
      experience: this.fb.array([]),
      training: this.fb.array([]),
      references: this.fb.array([]),

      awards: new FormControl(''),
      membership: new FormControl(''),
      passportPhoto: new FormControl(''),
      upload_cv: new FormControl(''),
      signature: new FormControl(''),
      sop: ['', [Validators.required, Validators.maxLength(this.maxWords)]],
      // sop: new FormControl(''),
      retired_govt_staff: new FormControl(''),
      upload_dob_proof: new FormControl(''),

      yesNoPay: new FormControl(''),
      sameAsPermanent: new FormControl(''),
      age: new FormControl('')
    });
  }


  /************* for Multiple Education************/

  onAddEucation(): void {
    this.getEducationArray().push(this.createEducationGroup())
  }
  removEeducation(index: number): void {
    this.getEducationArray().removeAt(index);
  }
  getEducationArray(): FormArray {
    return this.addUserFrom.get('education') as FormArray;
  }

  private createEducationGroup(): FormGroup {
    return this.fb.group({
      year: ["", Validators.required],
      degree: ["", Validators.required],
      university: ["", Validators.required],
      gpa: ["", Validators.required],
      subject: ["", Validators.required],
      education_proof: ["", Validators.required],
    });
  }


  /************* for Multiple Experience************/

  onAddExperience(): void {
    this.getExperienceArray().push(this.createExperienceGroup())
  }
  removeExperience(index: number): void {
    this.getExperienceArray().removeAt(index);
  }

  getExperienceArray(): FormArray {
    return this.addUserFrom.get('experience') as FormArray;
  }

  private createExperienceGroup(): FormGroup {
    return this.fb.group({
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      total_time_duration: ["", Validators.required],
      organisation_or_institution: ["", Validators.required],
      nature_of_work: ["", Validators.required],
      accomplishment: ["", Validators.required],
      accomplishment_proof: ["", Validators.required],
    });
  }

  /************* for Multiple Training************/

  onAddTraining(): void {
    this.getTrainingArray().push(this.createTrainingGroup())
  }
  removeTraining(index: number): void {
    this.getTrainingArray().removeAt(index);
  }

  getTrainingArray(): FormArray {
    return this.addUserFrom.get('training') as FormArray;
  }

  private createTrainingGroup(): FormGroup {
    return this.fb.group({
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      total_time_duration: ["", Validators.required],
      organisation_or_institution: ["", Validators.required],
      training_organisation_doc: ["", Validators.required],
    });
  }

  /************* for Multiple Refrences************/

  onAddRefrences(): void {
    this.getRefrencesArray().push(this.createRefrencesGroup())
  }
  removeRefrences(index: number): void {
    this.getRefrencesArray().removeAt(index);
  }

  getRefrencesArray(): FormArray {
    return this.addUserFrom.get('references') as FormArray;
  }

  private createRefrencesGroup(): FormGroup {
    return this.fb.group({
      reference_name: ["", Validators.required],
      designation: ["", Validators.required],
      Institution: ["", Validators.required],
      address: ["", Validators.required],
      reference_email: ["", Validators.required],
      phone_number: ["", Validators.required],
    });
  }


  /************* Save All HR Data************/

  saveHrData() {
    const obj = this.addUserFrom.value;
    console.log('Form data:', obj);

    this.NdmaHrService.saveHrDetails(obj).subscribe((res) => {
      if (res.status == "TRUE") {
        this.toaster.success(res.message);
      } else {
        this.saveHrFormGroup();
        this.toaster.error(res.message);
      }
    })
  }

  /****** This is for get all states name ******/
  getAllStateName() {
    this.NdmaHrService.getAllStateName('').subscribe(data => {
      let sordtedData = this.sortByName(data.value);
      this.allstateDropDownList = sordtedData;
    })
  }

  //this is for sort the state by alpha Batically wise
  sortByName(arr: any[]): any[] {
    return arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  //get district
  onCurrentStateChange(id: any) {
    const stateId = id; // Assuming stateId is retrieved from the event
    if (stateId) {
      this.NdmaHrService.getDistrictsByStateId({ states_id: stateId }).subscribe(
        data => {
          let sordtedData = this.sortByName(data.value);
          // Convert the object into an array of key-value pairs
          this.currentDistrictDropDownList = sordtedData;
        },
        error => {
          console.error('Error fetching districts', error);
          this.currentDistrictDropDownList = []; // Reset the list in case of error
        }
      );
    } else {
      this.currentDistrictDropDownList = [];
    }
  }


  onPermanentStateChange(id: any) {
    const stateId = id;
    if (stateId) {
      this.NdmaHrService.getDistrictsByStateId({ states_id: stateId }).subscribe(
        data => {
          this.permanentDistrictDropDownList = data.value;
        },
        error => {
          console.error('Error fetching districts', error);
          this.permanentDistrictDropDownList = [];
        }
      )
    }
  }

  /**************File Uploads *********/

  fileUploads(e: any) {
    const formData = new FormData();
    const file = e.target.files[0];
    console.log(`file`, file);
    formData.append("file", file);
    // for (const file of files) {
    //   formData.append("fileObj[]", file);
    // }
    this.NdmaHrService.fileUploads(formData).subscribe((res) => {
      if (res.status == "TRUE") {
        this.files = res.value;
        this.toaster.success(res.message);
      } else {
        this.toaster.error(res.message);
      }
    });
  }

  /***********Position Drop Down List********* */
  getPostionName() {
    this.NdmaHrService.getPositionList('').subscribe(data => {
      this.positionDropDownList = data.value;
    })
  }

  /******No of Days **************************** */


  // calculateDaysDifference(e: any, i: any, type: any) {

  //   var arrayControl = this.addUserFrom.get('experience') as FormArray;
  //   // var arrayControl = this.addUserFrom.get('training') as FormArray;
  //   var item = arrayControl.at(i);


  //   if (item.value.start_date != '' && item.value.end_date) {
  //     let start_Date = new Date(item.value.start_date);
  //     let end_Date = new Date(item.value.end_date);

  //     let Difference_In_Time =
  //       end_Date.getTime() - start_Date.getTime();

  //     let Difference_In_Days =
  //       Math.round
  //         (Difference_In_Time / (1000 * 3600 * 24));

  //     item.get('total_time_duration')?.setValue(Difference_In_Days);

  //     console.log
  //       ("Total number of days between dates:\n" +
  //         start_Date.toDateString() + " and " +
  //         end_Date.toDateString() +
  //         " is: " + Difference_In_Days + " days");

  //   }

  // }

  calculateDaysDifference(index: number, type: any): void {
    let control;
    if (type == 'training') {
      control = this.getTrainingArray().at(index);
    }
    else {
      control = this.getExperienceArray().at(index);
    }
    const startDate = new Date(control.get('start_date')?.value);
    const endDate = new Date(control.get('end_date')?.value);

    if (startDate && endDate && endDate >= startDate) {
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      control.get('total_time_duration')?.setValue(diffDays);
    } else {
      control.get('total_time_duration')?.setValue(0);
    }

    this.updateTotalExperience(type);
  }

  updateTotalExperience(type: any): void {
    let array;
    if (type == 'training') {
      array = this.getTrainingArray().controls;
      this.totalTraining = array.reduce((sum, control) => {
        return sum + (control.get('total_time_duration')?.value || 0);
      }, 0);
    }
    else {
      array = this.getExperienceArray().controls;
      this.totalExperience = array.reduce((sum, control) => {
        return sum + (control.get('total_time_duration')?.value || 0);
      }, 0);
    }
  }

  /*********Current Address same as Permanent Address ********/
  copyAddress(event: any) {

    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    // console.log('Checkbox checked:', isChecked);

    const formValue = this.addUserFrom.value;
    this.addUserFrom.patchValue({
      copy_address: isChecked
    })

    if (this.addUserFrom.value.copy_address == true) {
      this.onPermanentStateChange(this.addUserFrom.value.current_state_id);

      this.addUserFrom.patchValue({
        permanent_address: this.addUserFrom.value.current_address,
        permanent_state_id: this.addUserFrom.value.current_state_id,
        permanent_city: this.addUserFrom.value.current_city,
        permanent_district_id: this.addUserFrom.value.current_district_id,
        permanent_pincode: this.addUserFrom.value.current_pincode,
        permanent_streetno: this.addUserFrom.value.current_streetno,

      });

    } else {
      this.addUserFrom.patchValue({
        permanent_address: '',
        permanent_state_id: '',
        permanent_city: '',
        permanent_district_id: '',
        permanent_pincode: '',
        permanent_streetno: '',

      });

    }
  }

  //for calculate age
  calculateAge(event: any) {
    console.log(event.target.value);
    let selectedDate = event.target.value;
    const birthDate = new Date(selectedDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birth month hasn't occurred yet in this year, decrement age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.totalAge = age;
    console.log('Age:', age);
    return this.totalAge

  }

  //adding row
  addRow(delBtn: any, arr: any) {
    arr.push({ id: Date.now(), name: "education" });
    if (arr.length > 2) {
      if (delBtn == "ontrainDel") {
        this.ontrainDel = true;
      }
      else if (delBtn == "oneduDel") {
        this.oneduDel = true;
      }
      else if (delBtn == "onexpDel") {
        this.onexpDel = true;
      }
      else if (delBtn == "onrefDel") {
        this.onrefDel = true;
      }
    }
  }

  //for delete particular row
  del(i: any, arr: any, chk: any) {
    if (chk == 'trainingRow') {
      this.trainingRow = arr.filter((e: { id: any; }) => e.id != i);
    }
    else if (chk == 'eduRow') {
      this.eduRow = arr.filter((e: { id: any; }) => e.id != i);
    }
    else if (chk == 'referenceRow') {
      this.referenceRow = arr.filter((e: { id: any; }) => e.id != i);
    }
    else {
      this.expRow = arr.filter((e: { id: any; }) => e.id != i);
    }
  }


  //for check other option is selected or not
  checkforOther(val: any) {
    if (val == 'Other') {
      this.showOther = true;
    }
    else {
      this.showOther = false;
    }
  }


  onInputChange(event: Event) {
    const input = (event.target as HTMLTextAreaElement).value;
    const words = input.match(/\b[-?(\w+)?]+\b/gi);
    this.wordCount = words ? words.length : 0;

    if (this.wordCount > this.maxWords) {
      const trimmedInput = words?.slice(0, this.maxWords).join(' ');
      this.addUserFrom.controls['sop'].setValue(trimmedInput);
    }
  }


  hazard_specific_expertise = [
    { id: 1, name: "Avalanche" },
    { id: 2, name: "Biological (health)" },
    { id: 3, name: "Chemical" },
    { id: 4, name: "Hailstorm" },
    { id: 5, name: "Cold Wave" },
    { id: 6, name: "Cyclone" },
    { id: 7, name: "Drought" },
    { id: 8, name: "Earthquake" },
    { id: 9, name: "Flood" },
    { id: 10, name: "Forest Fire" },
    { id: 11, name: "Forest Safety" },
    { id: 12, name: "GLOF" },
    { id: 13, name: "Heat Wave" },
    { id: 14, name: "Landslides" },
    { id: 15, name: "Lightning" },
    { id: 16, name: "Meteorological" },
    { id: 17, name: "Nuclear" },
    { id: 18, name: "Riverine Flood" },
    { id: 19, name: "River Erosion" },
    { id: 20, name: "Sea Erosion" },
    { id: 21, name: "Tsunami" },
    { id: 22, name: "Urban flood" },
    { id: 23, name: "Volcanic Eruptions" },
    { id: 24, name: "Others" }
  ];

  selected_hazard_specific_expertise = [];
  // selectedCities = [];


}












