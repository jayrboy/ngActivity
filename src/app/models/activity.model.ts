import Project from './project.model';

export default class Activity {
  id = 0;
  projectId = 0;
  activityHeaderID = 0;
  name = '';
  createDate = new Date();
  updateDate = new Date();
  isDelete = false;
  activityHeader: Activity | null = null;
  inverseActivityHeader: Activity[] = [];
  project: Project = new Project();
}
