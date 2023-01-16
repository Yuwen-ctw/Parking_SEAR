import { Container, Col, Row, Stack, Button } from 'react-bootstrap'
import dayjs from 'dayjs'
import { TPEDataType } from './DataTypes'

function TPEPopupContent({ parking }: PopupContentProps) {
  const totalChargeStation: number =
    parking?.ChargeStation?.scoketStatusList.length || 0

  const availabelChargeStation: number =
    parking?.ChargeStation?.scoketStatusList.reduce((prev, curr) => {
      return curr.spot_status === '待機中' ? prev + 1 : prev
    }, 0)

  return (
    <Container
      className="p-0 fs-6 text-center"
      data-coords={`${parking.lat},${parking.lng}`}
    >
      <Stack gap={2}>
        <Row className="fw-bold fs-5 justify-content-center">
          {`${parking.area}${parking.name}`}
        </Row>
        <Row className="text-muted fw-bold justify-content-center">
          {`${parking.area}${parking.address}`}
        </Row>
        <Row>
          <ColTitle />
          <Col>總車位</Col>
          <Col>剩餘車位</Col>
        </Row>
        <Row>
          <ColTitle>汽車</ColTitle>
          <ColAmount>{parking.totalcar}</ColAmount>
          <ColAmount>
            {!parking?.availablecar || parking.availablecar < 0
              ? 'N/A'
              : parking.availablecar}
          </ColAmount>
        </Row>
        <Row className={`${parking.totalmotor === 0 && 'd-none'}`}>
          <ColTitle>機車</ColTitle>
          <ColAmount>{parking.totalmotor}</ColAmount>
          <ColAmount>
            {!parking?.availablemotor || parking.availablemotor < 0
              ? 'N/A'
              : parking.availablemotor}
          </ColAmount>
        </Row>
        <Row className={`${!(Number(parking.Handicap_First) > 0) && 'd-none'}`}>
          <ColTitle>身障</ColTitle>
          <ColAmount>{parking.Handicap_First}</ColAmount>
          <ColAmount></ColAmount>
        </Row>
        <Row
          className={`${!(Number(parking.Pregnancy_First) > 0) && 'd-none'}`}
        >
          <ColTitle>婦幼</ColTitle>
          <ColAmount>{parking.Pregnancy_First}</ColAmount>
          <ColAmount></ColAmount>
        </Row>
        <Row className={`${totalChargeStation === 0 && 'd-none'}`}>
          <ColTitle>電動</ColTitle>
          <ColAmount>{totalChargeStation}</ColAmount>
          <ColAmount>{availabelChargeStation}</ColAmount>
        </Row>
        <Row>
          <ColTitle>營業時間</ColTitle>
          <ColMuted>{parking.serviceTime}</ColMuted>
        </Row>
        <Row>
          <ColTitle>收費</ColTitle>
          <ColMuted className="text-start">{parking.payex}</ColMuted>
        </Row>
        <Row>
          <ColTitle>更新時間</ColTitle>
          <ColMuted>
            {dayjs(parking.updateTime).format('YYYY / MM / DD HH:mm:ss ')}
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

export default TPEPopupContent

interface PopupContentProps {
  parking: TPEDataType
}

// Base components
interface componentsProps {
  children?: React.ReactNode
  className?: string
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
