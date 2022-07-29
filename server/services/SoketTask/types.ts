export interface ISoketTask{
  create(text: string): Promise<void>
  update(text: string, _id: string): Promise<void>
  delete(_id: string): Promise<void>
}