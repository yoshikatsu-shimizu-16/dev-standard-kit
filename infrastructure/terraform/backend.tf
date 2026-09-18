terraform {
  # R2はS3互換APIを提供するため、backend設定は実行時のpartial configで注入する。
  backend "s3" {}
}

