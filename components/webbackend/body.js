import User from "./user"
import Baoming from "./baoming"
import Qianyue from "./qianyue"

export default ({navIndex}) => {
  switch (navIndex) {
    case 0:
      return <User/>
    case 1:
      return <Baoming/>
    case 2:
      return <Qianyue/>
    default:
      return <User/>
  }
}


