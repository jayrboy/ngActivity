import Activity from './activity.model';

export default class Project {
  id: number = 0;
  name: string = '';
  startDate: string | null = null; // จะใช้ string เนื่องจาก DateOnly ไม่ได้รับการรองรับใน JavaScript
  endDate: string | null = null; // เช่นกันที่ startDate
  createDate: Date = new Date();
  updateDate: Date = new Date();
  isDelete: boolean = false;
  activities: Activity[] = [];
  fileXprojects: any[] = []; // ไม่มีโมเดล FileXproject จึงใช้ any ชั่วคราว
}
