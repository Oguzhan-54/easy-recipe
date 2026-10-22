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

  return (
    // type="button" as default, so a button inside a form does not submit it by accident
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
