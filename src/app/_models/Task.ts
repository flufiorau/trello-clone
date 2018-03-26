export interface Task {
  id?:string;
  title?:string;
  description?: string;
  isChecked?: boolean;
  dueDate?: any;
  parentId?: string;
}
