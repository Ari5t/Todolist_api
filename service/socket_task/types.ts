export interface ISoketTask{
  create(text: string): Promise<void>
  update(text: string, id: string): Promise<void>
  delete(id: string): Promise<void>
}