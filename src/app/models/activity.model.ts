import Project from './project.model';

export default class Activity {
  id: number = 0;
  projectId: number | null = null;
  activityHeaderId: number | null = null;
  name: string | null = null;
  createDate: string | null = null;
  updateDate: string | null = null;
  isDelete: boolean | null = false;
  activityHeader: Activity | null = null;
  inverseActivityHeader: Activity[] = [];
  project: Project | null = null;

  // constructor() {
  //   this.id = 0;
  //   this.projectId = null;
  //   this.activityHeaderId = null;
  //   this.name = null;
  //   this.createDate = null;
  //   this.updateDate = null;
  //   this.isDelete = null;
  //   this.activityHeader = null;
  //   this.inverseActivityHeader = [];
  //   this.project = null;
  // }
}
