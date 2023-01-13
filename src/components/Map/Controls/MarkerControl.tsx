import Control from 'components/Map/Controls/base/Control'
import { ReactComponent as AvailableIcon } from 'assets/filter_available.svg'
import { ReactComponent as AllIcon } from 'assets/filter_all.svg'
import { ReactComponent as ClusterOffIcon } from 'assets/cluster_off.svg'
import { ReactComponent as ClusterOnIcon } from 'assets/cluster_on.svg'
import { ReactComponent as RefreshIcon } from 'assets/refresh.svg'

interface FilterAvailableButtonProps {
  position: L.ControlPosition
  isFilterChecked: boolean
  isClusterChecked: boolean
  canUpdateData: boolean
  onToggleFilter: React.ChangeEventHandler<HTMLInputElement>
  onToggleCluster: React.ChangeEventHandler<HTMLInputElement>
  onUpdateClick: React.MouseEventHandler<HTMLButtonElement>
}

function MarkerControl({
  position,
  isFilterChecked,
  isClusterChecked,
  canUpdateData,
  onToggleFilter,
  onToggleCluster,
  onUpdateClick,
}: FilterAvailableButtonProps) {
  return (
    <Control
      position={position}
      containerKey="marker-options"
      prepend={true}
      className="d-flex flex-column mb-0"
    >
      <input
        type="checkbox"
        id="cluster-state"
        onChange={onToggleCluster}
        checked={isClusterChecked}
        className="d-none"
      />
      <label
        htmlFor="cluster-state"
        className="leaflet-bar text-center p-0 bg-white"
      >
        {isClusterChecked ? (
          <ClusterOffIcon width="30px" height="30px" className="p-1" />
        ) : (
          <ClusterOnIcon width="30px" height="30px" className="p-1" />
        )}
      </label>

      <input
        type="checkbox"
        id="filter-available"
        onChange={onToggleFilter}
        checked={isFilterChecked}
        className="d-none"
      />
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
      <button
        disabled={!canUpdateData}
        onClick={onUpdateClick}
        className={`leaflet-bar text-center p-0 ${
          canUpdateData ? 'bg-light' : 'disabled'
        }`}
      >
        <RefreshIcon width="30px" height="30px" className="p-1" />
      </button>
    </Control>
  )
}

export default MarkerControl
