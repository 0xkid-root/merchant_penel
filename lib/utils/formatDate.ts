export function formatDateTime(dateStr: string) {
  if (!dateStr) return 'N/A'
  const d = new Date(dateStr)
  
  const day = d.getDate().toString().padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = d.getFullYear()
  
  let hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  
  hours = hours % 12
  hours = hours ? hours : 12
  const strHours = hours.toString().padStart(2, '0')
  
  return `${day} ${month} ${year}, ${strHours}:${minutes} ${ampm}`
}
