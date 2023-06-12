import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { ImageModel } from "@communities/model/images.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "@environments/environment";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-community-picture',
  templateUrl: './community-picture.component.html',
  styleUrls: ['./community-picture.component.scss']
})
export class CommunityPictureComponent extends BaseComponent implements OnInit {

  iframeUrl = environment.mediaServiceUrl + '/image/html/';

  @Input() set image(_image: ImageModel) {
    if (!_image) {
      return;
    }
    this.imageProps = _image;
    const imageNoExtension = _image.name.split('.')[0];
    this.mapUrl = `${this.iframeUrl}${imageNoExtension}.html`;
  }

  imageProps: ImageModel;
  mapUrl: string;

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) {
    super();
  }

  mapResource() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }

  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl',  centered: true });
  }

  ngOnInit(): void {
  }
}
