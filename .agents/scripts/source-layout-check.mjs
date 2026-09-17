import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const roots = ['frontend/src', 'backend/src'].filter((root) => fs.existsSync(root))

const ignoredPathParts = [
  `${path.sep}components${path.sep}ui${path.sep}`,
  `${path.sep}test${path.sep}`,
  `${path.sep}tests${path.sep}`,
]

const ignoredSuffixes = [
  '.test.ts',
  '.test.tsx',
  '.spec.ts',
  '.spec.tsx',
  '.stories.ts',
  '.stories.tsx',
]

const errors = []

for (const root of roots) {
  for (const filePath of collectSourceFiles(root)) {
    verifySourceFile(filePath)
  }
}

if (errors.length > 0) {
  console.error('Source layout check FAILED')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log('Source layout check PASS')

/** 検査対象root配下のproject-owned TypeScript / TSX sourceを再帰的に収集する。 */
function collectSourceFiles(root) {
  const files = []

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(entryPath))
      continue
    }

    if (
      !entry.isFile() ||
      (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx'))
    ) {
      continue
    }

    const normalized = path.normalize(entryPath)
    if (ignoredPathParts.some((part) => normalized.includes(part))) {
      continue
    }

    if (ignoredSuffixes.some((suffix) => normalized.endsWith(suffix))) {
      continue
    }

    files.push(entryPath)
  }

  return files
}

/** 1ファイル内のpublic-first順序とprivate helperのJSDocを検証する。 */
function verifySourceFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const scriptKind = filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  )
  const functions = collectTopLevelFunctions(sourceFile)
  let privateFunctionSeen = false

  for (const entry of functions) {
    if (entry.exported) {
      if (privateFunctionSeen) {
        errors.push(
          `${formatLocation(sourceFile, entry.node)} 公開関数 "${entry.name}" はprivate helperより上に配置してください。`,
        )
      }
      continue
    }

    privateFunctionSeen = true

    if (!hasJsDoc(entry.node, sourceFile)) {
      errors.push(
        `${formatLocation(sourceFile, entry.node)} private helper "${entry.name}" に日本語JSDocを追加してください。`,
      )
    }
  }
}

/** トップレベルのfunction declarationとfunction-valued variableを読み順で抽出する。 */
function collectTopLevelFunctions(sourceFile) {
  const entries = []

  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      entries.push({
        exported: hasExportModifier(statement),
        name: statement.name.text,
        node: statement,
      })
      continue
    }

    if (!ts.isVariableStatement(statement)) {
      continue
    }

    const exported = hasExportModifier(statement)

    for (const declaration of statement.declarationList.declarations) {
      if (
        !declaration.initializer ||
        (!ts.isArrowFunction(declaration.initializer) &&
          !ts.isFunctionExpression(declaration.initializer))
      ) {
        continue
      }

      entries.push({
        exported,
        name: declaration.name.getText(sourceFile),
        node: statement,
      })
    }
  }

  return entries.sort(
    (a, b) => a.node.getStart(sourceFile) - b.node.getStart(sourceFile),
  )
}

/** AST nodeがESM export宣言かどうかを判定する。 */
function hasExportModifier(node) {
  return (
    node.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    ) ?? false
  )
}

/** node直前のJSDoc block有無を判定する。 */
function hasJsDoc(node, sourceFile) {
  return node.getFullText(sourceFile).trimStart().startsWith('/**')
}

/** Harness errorへ表示するfile:line:column形式の位置を生成する。 */
function formatLocation(sourceFile, node) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(
    node.getStart(sourceFile),
  )
  return `${sourceFile.fileName}:${line + 1}:${character + 1}`
}
