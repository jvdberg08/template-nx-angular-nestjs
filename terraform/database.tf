resource "google_sql_database_instance" "mysql_instance" {
  name                = "mysql-db"
  region              = "europe-west4"
  database_version    = "MYSQL_8_0"
  deletion_protection = true

  settings {
    tier                        = "db-f1-micro"
    deletion_protection_enabled = true
  }

  depends_on = [google_project_service.sqladmin_api]
}

resource "google_sql_user" "mysql_user" {
  instance = google_sql_database_instance.mysql_instance.name
  name     = random_string.random_db_user_id.result
  password = random_password.random_db_password.result
  host     = "%"
}