import { Moment } from 'moment';
import { IFunding } from 'app/shared/model/funding.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface IBounties {
  id?: number;
  status?: Status;
  url?: string;
  amount?: number;
  experience?: Experience;
  commitment?: number;
  type?: Type;
  category?: Category;
  keywords?: string;
  permission?: boolean;
  expires?: Moment;
  fundings?: IFunding[];
}

export class Bounties implements IBounties {
  constructor(
    public id?: number,
    public status?: Status,
    public url?: string,
    public amount?: number,
    public experience?: Experience,
    public commitment?: number,
    public type?: Type,
    public category?: Category,
    public keywords?: string,
    public permission?: boolean,
    public expires?: Moment,
    public fundings?: IFunding[]
  ) {
    this.permission = this.permission || false;
  }
}
