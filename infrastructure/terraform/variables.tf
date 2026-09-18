variable "cloudflare_account_id" {
  description = "Cloudflare account identifier for the forked application."
  type        = string
}

variable "project_name" {
  description = "Stable kebab-case prefix used for Cloudflare resource names."
  type        = string
  default     = "dev-standard-kit"

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]*$", var.project_name))
    error_message = "project_name must be a lowercase kebab-case identifier."
  }
}

variable "environment" {
  description = "Remote environment whose resources are managed by this state."
  type        = string

  validation {
    condition     = contains(["preview", "production"], var.environment)
    error_message = "environment must be preview or production."
  }
}
