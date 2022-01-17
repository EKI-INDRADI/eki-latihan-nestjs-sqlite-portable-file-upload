
import { Files } from "src/files/entities/files.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    nama_user: string

    @Column()
    email: string

    @Column()
    username: string

    @Column({ name: 'password', select: false }) 
    password: string

    @CreateDateColumn() 
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @OneToMany(() => Files, data => data.id)
    produk: Files


}
