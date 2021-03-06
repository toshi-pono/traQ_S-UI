/**
 * pipelineにリダイレクトが必要な場合リダイレクトする
 * リダイレクトした場合はtrueを返す
 */
export const redirectToPipelineIfNeeded = () => {
  // 簡易的にhost名で分岐させてる
  if (location.host !== 'q.trap.jp') {
    return false
  }

  // pipeline側でリダイレクト先は制限されている
  location.href = `/pipeline${location.search}`
  return true
}
