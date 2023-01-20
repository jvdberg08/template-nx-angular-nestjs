resource "google_cloud_run_service" "run_service_web_app" {
  name       = "web-app"
  location   = "europe-west4"
  depends_on = [google_project_service.run_api]

  template {
    spec {
      containers {
        image = var.web_app_image
      }
      service_account_name = google_service_account.run_service_identity.email
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "run_all_users_web_app" {
  service  = google_cloud_run_service.run_service_web_app.name
  location = google_cloud_run_service.run_service_web_app.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}