mock_provider "cloudflare" {}

run "preview_resource_names" {
  command = plan

  variables {
    cloudflare_account_id = "00000000000000000000000000000000"
    project_name          = "sample-app"
    environment           = "preview"
  }

  assert {
    condition     = cloudflare_d1_database.tasks.name == "sample-app-preview-tasks"
    error_message = "D1 name must include the preview environment."
  }

  assert {
    condition     = cloudflare_r2_bucket.assets.name == "sample-app-preview-assets"
    error_message = "R2 name must include the preview environment."
  }
}

run "production_resource_names" {
  command = plan

  variables {
    cloudflare_account_id = "00000000000000000000000000000000"
    project_name          = "sample-app"
    environment           = "production"
  }

  assert {
    condition     = output.environment == "production"
    error_message = "Output must identify the production state."
  }
}
