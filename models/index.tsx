export type ModalItem = {
  id: number;
  name: string;
  code: string;
  type: string;
  cost: number;
  category: string;
  image: string;
  desc: string;
};

export type NoteItem = {
  id?: number;
  by: string;
  date: string;
  type?: string;
  model_id: number;
  details: string;
};
