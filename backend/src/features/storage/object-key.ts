/** object storageへ保存する値を衝突しにくい名前空間付きkeyへ変換する。 */
export function createObjectKey(
  namespace: string,
  identifier: string,
  filename: string,
): string {
  return [namespace, identifier, filename]
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}
