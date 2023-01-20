resource "google_cloud_run_service" "run_service_api" {
  name       = "api"
  location   = "europe-west4"
  depends_on = [google_project_service.run_api]

  template {
    spec {
      service_account_name = google_service_account.run_service_identity.email
      containers {
        image = var.api_image
        env {
          name  = "INSTANCE_CONNECTION_NAME"
          value = google_sql_database_instance.mysql_instance.connection_name
        }
        env {
          name = "DB_USER"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.db_user.secret_id
              key  = "latest"
            }
          }
        }
        env {
          name = "DB_PASS"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.db_password.secret_id
              key  = "latest"
            }
          }
        }
      }
    }

    metadata {
      annotations = {
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.mysql_instance.connection_name
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "run_all_users_api" {
  service  = google_cloud_run_service.run_service_api.name
  location = google_cloud_run_service.run_service_api.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_project_iam_member" "run_service_identity_sql_access" {
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.run_service_identity.email}"
  project = var.project_id
}