import styles from './Button.module.css'

// One button component for the whole app, so all buttons look and behave the same.
// variant: 'primary' (green) | 'outline' (white with green border)
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // With href it is a link that only looks like a button (navigation belongs in <a>)
  if (props.href) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    // type="button" as default, so a button inside a form does not submit it by accident
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
