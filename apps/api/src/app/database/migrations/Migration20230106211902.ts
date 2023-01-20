import { Migration } from '@mikro-orm/migrations';

export class Migration20230106211902 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(
      'create table `example` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime null, `example_property` varchar(255) not null) default character set utf8mb4 engine = InnoDB;'
    );

    this.addSql(
      'create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime null, `email` varchar(255) not null, `password` varchar(255) not null, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;'
    );
  }
}
