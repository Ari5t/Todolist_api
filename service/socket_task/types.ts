export interface ISoketTask{
  create(text: string): Promise<void>
}