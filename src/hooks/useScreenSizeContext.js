const { useContext } = 'react'
const { ScreenSizeContext } = 'context/ScreenSizeContext'

const useScreenSizeContext = () => useContext(ScreenSizeContext)

export default useScreenSizeContext