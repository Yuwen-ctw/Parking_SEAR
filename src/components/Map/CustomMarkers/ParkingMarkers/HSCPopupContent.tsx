import { Container, Col, Row, Stack, Button } from 'react-bootstrap'
import { HSCDataType } from './DataTypes'
import dayjs from 'dayjs'

function HSCPopupContent({ parking }: PopupContentProps) {
  return (
    <Container
      className="p-0 fs-6 text-center"
      data-coords={`${parking.X_COORDINATE},${parking.Y_COORDINATE}`}
    >
      <Stack gap={2}>
        <Row className="fw-bold fs-5 justify-content-center">
          {parking.PARKINGNAME}
        </Row>
        <Row className="text-muted fw-bold justify-content-center">
          {parking.ADDRESS}
        </Row>
        <Row>
          <ColTitle />
          <Col>總車位</Col>
          <Col>剩餘車位</Col>
        </Row>
        <Row>
          <ColTitle>汽車</ColTitle>
          <ColAmount>{parking.TOTALSPACE}</ColAmount>
          <ColAmount>{parking.FREESPACE}</ColAmount>
        </Row>
        <Row className={`${parking.TOTALSPACEMOT === 0 && 'd-none'}`}>
          <ColTitle>機車</ColTitle>
          <ColAmount>{parking.TOTALSPACEMOT}</ColAmount>
          <ColAmount>{parking.FREESPACEMOT}</ColAmount>
        </Row>
        <Row className={`${parking.TOTALSPACEDIS === 0 && 'd-none'}`}>
          <ColTitle>身障</ColTitle>
          <ColAmount>{parking.TOTALSPACEDIS}</ColAmount>
          <ColAmount></ColAmount>
        </Row>
        <Row className={`${parking.TOTALSPACECW === 0 && 'd-none'}`}>
          <ColTitle>婦幼</ColTitle>
          <ColAmount>{parking.TOTALSPACECW}</ColAmount>
          <ColAmount></ColAmount>
        </Row>
        <Row className={`${parking.TOTALSPACEECAR === 0 && 'd-none'}`}>
          <ColTitle>電動</ColTitle>
          <ColAmount>{parking.TOTALSPACEECAR}</ColAmount>
          <ColAmount>{parking.FREESPACEECAR}</ColAmount>
        </Row>
        <Row>
          <ColTitle>營業時間</ColTitle>
          <ColMuted>{parking.BUSINESSHOURS}</ColMuted>
        </Row>
        <Row>
          <ColTitle>平日</ColTitle>
          <ColMuted>{parking.HOLIDAY}</ColMuted>
        </Row>
        <Row>
          <ColTitle>假日</ColTitle>
          <ColMuted>{parking.WEEKDAYS}</ColMuted>
        </Row>
        <Row>
          <ColTitle>更新時間</ColTitle>
          <ColMuted>
            {dayjs(parking.UPDATETIME).format('YYYY / MM / DD HH:mm:ss ')}
          </ColMuted>
        </Row>
        <Row className="justify-content-center">
          <Button
            className="w-auto"
            onClick={() => event?.preventDefault()}
            variant="link"
          >
            開始導航
          </Button>
        </Row>
      </Stack>
    </Container>
  )
}

export default HSCPopupContent

interface PopupContentProps {
  parking: HSCDataType
}

// Base components
interface componentsProps {
  children?: React.ReactNode
  className?: React.HTMLAttributes<string>
}

function ColTitle({ children, className }: componentsProps) {
  return (
    <Col className={`col-3 fw-semibold text-align-justify pe-0 ${className}`}>
      {children}
    </Col>
  )
}

function ColAmount({ children, className }: componentsProps) {
  return <Col className={`fw-bolder ${className}`}>{children}</Col>
}

function ColMuted({ children, className }: componentsProps) {
  return (
    <Col
      className={`text-muted fs-7 ${className}`}
      style={{ maxHeight: '75px', overflowY: 'auto' }}
    >
      {children}
    </Col>
  )
}
