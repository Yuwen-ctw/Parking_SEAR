import Control from 'components/Map/Controls/lib/Control'
import { ReactComponent as AvailableIcon } from 'assets/filter_available.svg'
import { ReactComponent as AllIcon } from 'assets/filter_all.svg'
import { ReactComponent as ClusterOffIcon } from 'assets/cluster_off.svg'
import { ReactComponent as ClusterOnIcon } from 'assets/cluster_on.svg'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

interface FilterAvailableButtonProps {
  position: L.ControlPosition
  isFilterChecked: boolean
  isClusterChecked: boolean
  onToggleFilter: React.ChangeEventHandler<HTMLInputElement>
  onToggleCluster: React.ChangeEventHandler<HTMLInputElement>
}

function MarkerControl({
  position,
  isFilterChecked,
  isClusterChecked,
  onToggleFilter,
  onToggleCluster,
}: FilterAvailableButtonProps) {
  return (
    <Control
      position={position}
      containerKey="layer-options5"
      prepend={true}
      className="d-flex flex-column"
    >
      <input
        type="checkbox"
        id="cluster-state"
        onChange={onToggleCluster}
        checked={isClusterChecked}
        className="d-none"
        style={{ width: '34px', height: '34px', textAlign: 'center' }}
      />
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="button-tooltip">
            {isClusterChecked ? '點擊展開標記' : '點擊群組標記'}
          </Tooltip>
        }
      >
        <label
          htmlFor="cluster-state"
          className="leaflet-bar text-center p-0 bg-white"
        >
          {isClusterChecked ? (
            <ClusterOnIcon width="30px" height="30px" className="p-1" />
          ) : (
            <ClusterOffIcon width="30px" height="30px" className="p-1" />
          )}
        </label>
      </OverlayTrigger>
      <input
        type="checkbox"
        id="filter-available"
        onChange={onToggleFilter}
        checked={isFilterChecked}
        className="d-none"
        style={{ width: '34px', height: '34px', textAlign: 'center' }}
      />
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="button-tooltip">
            {isFilterChecked ? '點擊顯示全部停車場' : '點擊顯示有空位的停車場'}
          </Tooltip>
        }
      >
        <label
          htmlFor="filter-available"
          className="leaflet-bar text-center p-0 bg-white"
        >
          {isFilterChecked ? (
            <AvailableIcon width="30px" height="30px" />
          ) : (
            <AllIcon width="30px" height="30px" />
          )}
        </label>
      </OverlayTrigger>
    </Control>
  )
}

export default MarkerControl
