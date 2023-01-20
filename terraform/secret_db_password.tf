resource "random_password" "random_db_password" {
  length = 16
}

resource "google_secret_manager_secret" "db_password" {
  secret_id  = "db_password"
  depends_on = [google_project_service.secretmanager_api]

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "db_password_data" {
  secret      = google_secret_manager_secret.db_password.id
  secret_data = random_password.random_db_password.result
}

resource "google_secret_manager_secret_iam_member" "db_password_access" {
  secret_id = google_secret_manager_secret.db_password.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.run_service_identity.email}"
}