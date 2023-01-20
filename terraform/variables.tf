variable "project_id" {
  default = "example-123456"
}

variable "api_image" {
  default = "europe-west4-docker.pkg.dev/example-123456/example/api:latest"
}

variable "web_app_image" {
  default = "europe-west4-docker.pkg.dev/example-123456/example/web-app:latest"
}
