import Activity from './activity.model';

export default class Project {
  id: number = 0;
  name: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  createDate: Date = new Date();
  updateDate: Date = new Date();
  isDelete: boolean = false;
  activities: Activity[] = [];
  // fileXprojects: FileXproject[] = [];
}
