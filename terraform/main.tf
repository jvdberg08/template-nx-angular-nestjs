terraform {
  required_version = ">= 0.14"

  required_providers {
    google = ">= 3.3"
  }

  backend "http" {}
}

provider "google" {
  project = var.project_id
}

resource "google_service_account" "run_service_identity" {
  account_id = "run-terraform"
}