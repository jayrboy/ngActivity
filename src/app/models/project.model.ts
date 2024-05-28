import Activity from './activity.model';
import ProjectFile from './project-file.model';

export default class Project {
  id: number = 0;
  name: string = '';
  startDate: string | null = null; // จะใช้ string เนื่องจาก DateOnly ไม่ได้รับการรองรับใน JavaScript
  endDate: string | null = null; // เช่นกันที่ startDate
  createDate: Date = new Date();
  updateDate: Date = new Date();
  isDelete: boolean = false;
  activities: Activity[] = [];
  // projectFile: ProjectFile[] = []; // .NET Core [JsonIgnore]
  file: File[] = [];
}
