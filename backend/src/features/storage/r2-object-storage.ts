import type {
  R2Bucket,
  R2GetOptions,
  R2ObjectBody,
  R2PutOptions,
} from '@cloudflare/workers-types'

/** R2へ保存するオブジェクトのmetadata。 */
export type ObjectStorageOptions = Pick<
  R2PutOptions,
  'httpMetadata' | 'customMetadata'
>

type R2PutValue = Parameters<R2Bucket['put']>[1]

/** R2 bindingをアプリケーションのobject storage portへ適合させるadapter。 */
export class R2ObjectStorage {
  /** Cloudflareから注入されたR2 bindingだけを保持し、bucket名への依存を隠蔽する。 */
  constructor(private readonly bucket: R2Bucket) {}

  /** オブジェクトをbinding経由で保存し、metadataをそのままR2へ渡す。 */
  async put(
    key: string,
    value: R2PutValue,
    options?: ObjectStorageOptions,
  ): Promise<void> {
    await this.bucket.put(key, value, options)
  }

  /** キーに対応するR2 bodyを返し、未存在時はnullを返す。 */
  async get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | null> {
    return this.bucket.get(key, options)
  }

  /** オブジェクトを削除する。削除対象がなくてもR2の冪等性を維持する。 */
  async delete(key: string): Promise<void> {
    await this.bucket.delete(key)
  }
}
