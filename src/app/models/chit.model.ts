import {Branch} from './branch.model';
import {ChitId} from './chitid.model';
export class Chit{
    constructor(
                public _id:string,
                public chitid:ChitId,
                public chitvalue:string,
                public branch:Branch,
                public subfee:string,
                public tenure:string,
                ){}
}