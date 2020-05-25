import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBounties, Bounties } from 'app/shared/model/bounties.model';
import { BountiesService } from './bounties.service';

@Component({
  selector: 'jhi-bounties-update',
  templateUrl: './bounties-update.component.html',
})
export class BountiesUpdateComponent implements OnInit {
  isSaving = false;
  expiresDp: any;

  editForm = this.fb.group({
    id: [],
    status: [],
    url: [],
    amount: [],
    experience: [],
    commitment: [],
    type: [],
    category: [],
    keywords: [],
    permission: [],
    expires: [],
  });

  constructor(protected bountiesService: BountiesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bounties }) => {
      this.updateForm(bounties);
    });
  }

  updateForm(bounties: IBounties): void {
    this.editForm.patchValue({
      id: bounties.id,
      status: bounties.status,
      url: bounties.url,
      amount: bounties.amount,
      experience: bounties.experience,
      commitment: bounties.commitment,
      type: bounties.type,
      category: bounties.category,
      keywords: bounties.keywords,
      permission: bounties.permission,
      expires: bounties.expires,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bounties = this.createFromForm();
    if (bounties.id !== undefined) {
      this.subscribeToSaveResponse(this.bountiesService.update(bounties));
    } else {
      this.subscribeToSaveResponse(this.bountiesService.create(bounties));
    }
  }

  private createFromForm(): IBounties {
    return {
      ...new Bounties(),
      id: this.editForm.get(['id'])!.value,
      status: this.editForm.get(['status'])!.value,
      url: this.editForm.get(['url'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      experience: this.editForm.get(['experience'])!.value,
      commitment: this.editForm.get(['commitment'])!.value,
      type: this.editForm.get(['type'])!.value,
      category: this.editForm.get(['category'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      permission: this.editForm.get(['permission'])!.value,
      expires: this.editForm.get(['expires'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBounties>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
