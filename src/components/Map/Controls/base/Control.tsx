// 此檔案使用 react-leaflet-custom-control 套件，並參考 #issues 5 之內容進行調整
// 連結: https://github.com/chris-m92/react-leaflet-custom-control/issues/5

import L from 'leaflet'
import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  position: L.ControlPosition
  children?: React.ReactNode
  container?: React.HTMLAttributes<HTMLDivElement>
  prepend?: boolean
  containerKey: string
  className?: string
}

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const Control = (props: Props): JSX.Element => {
  const [portalRoot, setPortalRoot] = React.useState<any>(
    document.createElement('div')
  )

  const positionClass =
    (props.position && POSITION_CLASSES[props.position]) ||
    POSITION_CLASSES.topright

  //**** code change start ****//
  // const portalContainer = document.createElement('div')
  let portalContainer = document.getElementById(`control-${props.containerKey}`)

  if (!portalContainer) {
    portalContainer = document.createElement('div')
    portalContainer.setAttribute('id', `control-${props.containerKey}`)
  }

  React.useEffect(() => {
    const targetDiv = document.getElementsByClassName(positionClass)
    setPortalRoot(targetDiv[0])
    if (props.prepend !== undefined && props.prepend === true) {
      portalRoot.prepend(portalContainer)
    } else {
      portalRoot.append(portalContainer)
    }
  }, [positionClass, props.prepend, portalRoot, portalContainer])
  //**** code change end ****//

  const className = (props?.className?.concat(' ') || '') + 'leaflet-control'
  const container = { ...props.container, className }
  const controlContainer = <div {...container}>{props.children}</div>

  L.DomEvent.disableClickPropagation(portalRoot)

  return ReactDOM.createPortal(controlContainer, portalContainer)
}

export default Control
