export interface Todo {
  task: string;
  isCheck: boolean;
  createdAt: string;
  checkedAt: string;
}

export interface ButtonProps {
  field: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export interface InputTextFieldProps {
  placeholder?: string;
  errorMessage?: string;
  maxLength?: number;
}

export interface TodoRowProps {
  isCheck: boolean;
  task?: string;
  createdAt?: string;
  checkedAt?: string;
  handleDelete?: () => void;
  handleCheck?: () => void;
}
