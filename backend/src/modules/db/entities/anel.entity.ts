import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Anel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  poder: string;

  @Column()
  portador: string;

  @Column()
  forjadoPor: string;

  @Column()
  imagem: string;
}
