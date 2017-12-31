import React, { Component } from 'react'
import { ReactReader } from './readers'
import styles from './App.less'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullscreen: false
    }
  }

  toggleFullscreen () {
    this.setState({
      fullscreen: !this.state.fullscreen
    }, () => {
      setTimeout(() => {
        const evt = document.createEvent('UIEvents')
        evt.initUIEvent('resize', true, false, global, 0)
        global.dispatchEvent(evt)
      }, 1000)
    })
  }

  render () {
    const { fullscreen } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.readerHolderFullscreen}>
            <ReactReader
              url={params.url}
            />
        </div>
      </div>
    )

    // 
    // title={'直道而行：孟子和荀子'}
    // location={'Text/a_cover.xhtml'}
  }
}

export default App
