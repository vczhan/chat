export default function notify({
  title = '',
  body = '',
  icon = null,
  tag = '',
  timer = 2000
}) {
  if (Notification.permission === 'granted' && document.hidden) {
    let notification = new Notification(title, {
      body,
      icon,
      tag
    })

    notification.onshow = () => {
      setTimeout(() => notification.close(), timer)
    }
  }
}
