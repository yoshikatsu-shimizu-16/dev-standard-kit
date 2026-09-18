resource "cloudflare_d1_database" "tasks" {
  account_id = var.cloudflare_account_id
  name       = "${var.project_name}-${var.environment}-tasks"

  lifecycle {
    prevent_destroy = true
  }
}

resource "cloudflare_r2_bucket" "assets" {
  account_id = var.cloudflare_account_id
  name       = "${var.project_name}-${var.environment}-assets"

  lifecycle {
    prevent_destroy = true
  }
}
