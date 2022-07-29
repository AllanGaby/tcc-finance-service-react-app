export type MenuBrandProps = {
  title?: string
  route?: string
  onHandleTitle?: () => JSX.Element
  onClick?: () => Promise<void>
}
