import CalendarIcon from './CalendarIcon'
import MapsIcon from './MapsIcon'
import WeatherIcon from './WeatherIcon'
import ClosetIcon from './ClosetIcon'
import SpotifyIcon from './SpotifyIcon'
import SpendingIcon from './SpendingIcon'
import type { AppId } from '../../data/mockData'

const iconMap: Record<AppId, React.FC<{ size?: number }>> = {
  calendar: CalendarIcon,
  maps: MapsIcon,
  weather: WeatherIcon,
  closet: ClosetIcon,
  spotify: SpotifyIcon,
  spending: SpendingIcon,
}

export function AppIconSvg({ id, size = 60 }: { id: AppId; size?: number }) {
  const Icon = iconMap[id]
  return <Icon size={size} />
}

export default iconMap
