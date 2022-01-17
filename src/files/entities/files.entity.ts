import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    generate_file_name: string

    @Column()
    file_ext: string

    @Column()
    file_storage: string

    @Column()
    file_data: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" }) 
    update_at: Date

    @ManyToOne(() => User, data => data.id) 
    user: User 


}
