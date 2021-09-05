import MainTemplate from "../src/templates/MainTemplate"
import '../src/styles/global.scss'
import '../src/styles/Header.scss'
import '../src/styles/Home.scss'
import '../src/styles/SQL.scss'
import '../src/styles/Node.scss'
import '../src/styles/Hint.scss'

function MyApp({ Component, pageProps }) {
  return(  
    <MainTemplate>
      <Component {...pageProps} />
    </MainTemplate>
  )
}

export default MyApp
