import {
  Col, Upload
} from 'antd'
import React from 'react'
import {
  bool, string, func
} from 'prop-types'
import LargeCheckbox from 'components/checkbox/large'
import Input from 'components/input'
import Button from 'components/button'


function UploadForm ({
  checkDefault, month, onReceiveFile
}) {
  const [ checked, setChecked ] = React.useState(checkDefault)
  const [ fileName, setFileName ] = React.useState('')
  const [ originFileName, setOriginFileName ] = React.useState('')
  // const onCLicked = () => {
  //   setChecked(!checked)
  // }
  const onFileSelected = ({ file }) => {
    setOriginFileName(file.name)
    setChecked(!checked)
    onReceiveFile({ file, month })
    // const reader = new window.FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = (...args) => {

    // let fileContents = reader.result

    // Do some file processing (perhaps converting an image to base 64?)

    // Show that you have to call onSuccess with `<some string>, file`
    // }
  }
  const setFormatedFileName = (name) => {
    setFileName(name)
  }
  console.log('TCL: setFormatedFileName -> setFormatedFileName', setFormatedFileName)
  return (
    <div className="upload-forms">
      <Col span={10} lg={13} xl={13} xxl={10}>
        <Input
          placeholder="File_Example.xlsx"
          style={{
            maxWidth: 300, width: '100%'
          }}
          label="Formatted File Name"
          type="secondary"
          value={fileName}
        />
        <Upload
          onChange={onFileSelected}
          showUploadList={false}
          style={{ margin: '0 20px' }}
          beforeUpload={() => false}
        >
          <Button type="secondary">
          Choose File
          </Button>
        </Upload>
      </Col>
      <Col span={9} lg={9} xl={7} xxl={9} style={{
        marginLeft: 26, display: 'flex', alignItems: 'center'
      }}>
        <Input
          placeholder="File_Example.xlsx"
          style={{
            maxWidth: 300, width: '100%'
          }}
          label={`Origin File Name (${month})`}
          type="secondary"
          value={originFileName}
        />
        <span style={{ marginTop: 20 }}>
          <LargeCheckbox
            type="secondary"
            checked={checked}
            disabled={false}
            // onChange={console.log}
            // onClick={onCLicked}
          />
        </span>
      </Col>
    </div>
  )
}

UploadForm.propTypes = {
  checkDefault: bool,
  onSelected: bool,
  month: string,
  onReceiveFile: func
}

export default UploadForm
