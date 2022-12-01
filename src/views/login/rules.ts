export const validatePassword = () => {
  return (rule: unknown, value: string, callback: (err?: unknown) => void) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}
