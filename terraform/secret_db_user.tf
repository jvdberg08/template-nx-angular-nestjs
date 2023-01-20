resource "random_string" "random_db_user_id" {
  length  = 8
  special = false
}

resource "google_secret_manager_secret" "db_user" {
  secret_id  = "db_user"
  depends_on = [google_project_service.secretmanager_api]

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "db_user_data" {
  secret      = google_secret_manager_secret.db_user.id
  secret_data = random_string.random_db_user_id.result
}

resource "google_secret_manager_secret_iam_member" "db_user_access" {
  secret_id = google_secret_manager_secret.db_user.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.run_service_identity.email}"
}