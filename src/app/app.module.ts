import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialComponentModule } from './material-component/material-component.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FirebaseHomeComponent } from './firebase-home/firebase-home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './file-upload/file-upload.component';
 
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent,
    FirebaseHomeComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialComponentModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    FileUploadModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    
  ]
})
export class AppModule { }
