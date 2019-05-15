import { Col, Upload } from 'antd'
import React from 'react'
import { bool } from 'prop-types'
import LargeCheckbox from 'components/checkbox/large'
import Input from 'components/input'
import Button from 'components/button'


function UploadForm ({ checkDefault }) {
  const [ checked, setChecked ] = React.useState(checkDefault)
  const onCLicked = () => {
    setChecked(!checked)
  }
  return (
    <div className="upload-forms">
      <Col span={10} lg={13} xl={13} xxl={10}>
        <Input
          value="File A.xlsx"
          style={{ maxWidth: 300, width: '100%' }}
          label="File Name"
          type="secondary"
        />
        <Upload style={{ margin: '0 20px' }}>
          <Button type="secondary">
          Choose File
          </Button>
        </Upload>
      </Col>
      <Col span={9} lg={9} xl={7} xxl={9} style={{ marginLeft: 26, display: 'flex', alignItems: 'center' }}>
        <Input
          value="File A.xlsx"
          style={{ maxWidth: 300, width: '100%' }}
          label="Origin File Name"
          type="secondary"
        />
        <span style={{ marginTop: 20 }}>
          <LargeCheckbox
            type="secondary"
            checked={checked}
            disabled={false}
            onChange={(e) => console.log(e)}
            onClick={onCLicked}
          />
        </span>
      </Col>
    </div>
  )
}

UploadForm.propTypes = { checkDefault: bool }

export default UploadForm
