// import React from 'react'
import {Button, Result} from 'antd'


const NotFound = () => {
  return (
    <Result 
        status='404'
        title='404 - Not Found'
        subTitle='Sorry, the page you visited does not exist.'
        extra={<Button type='primary'>Back Home</Button>}
    />
  )
}

export default NotFound
