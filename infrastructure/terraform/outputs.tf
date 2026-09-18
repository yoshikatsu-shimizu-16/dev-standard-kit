output "d1_database_id" {
  description = "D1 database id to set as database_id in backend/wrangler.jsonc for remote environments."
  value       = cloudflare_d1_database.tasks.id
}

output "d1_database_name" {
  description = "D1 database name used by the Worker binding."
  value       = cloudflare_d1_database.tasks.name
}

output "r2_bucket_name" {
  description = "R2 bucket name used by the Worker binding."
  value       = cloudflare_r2_bucket.assets.name
}

output "environment" {
  description = "Environment represented by this Terraform state."
  value       = var.environment
}
