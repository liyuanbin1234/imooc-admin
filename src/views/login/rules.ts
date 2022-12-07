import i18n from '@/i18n'

export const validatePassword = () => {
  return (rule: unknown, value: string, callback: (err?: unknown) => void) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
