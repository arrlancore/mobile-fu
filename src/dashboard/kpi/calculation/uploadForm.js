import { Col, Upload } from 'antd'
import React from 'react'
import { bool, func, object, string } from 'prop-types'
import LargeCheckbox from 'components/checkbox/large'
import Input from 'components/input'
import Button from 'components/button'


function UploadForm ({
  doc, onReceiveFile, onUpload, fileOnUpload
}) {

  const [ originFileName, setOriginFileName ] = React.useState(null)
  const loading = fileOnUpload === originFileName

  const onFileSelected = ({ file }) => {
    setOriginFileName(file.name)
    onReceiveFile({ file, docId: doc.id, docName: doc.name })
  }
  const openDialogManual = () => {
    const button = document.getElementById('upload-dialog-button')
    button.click()
  }

  return (
    <div className="upload-forms">
      <Col span={10} lg={13} xl={13} xxl={10}>
        <Input
          placeholder="select file..."
          style={{
            maxWidth: 300, width: '100%'
          }}
          label={doc.name}
          type="secondary"
          value={'Example: ' + doc.example}
        />
        <Upload
          onChange={onFileSelected}
          showUploadList={false}
          style={{ margin: '0 20px' }}
          beforeUpload={() => false}
          disabled={onUpload}
        >
          <Button id="upload-dialog-button" type="secondary" disabled={onUpload} loading={loading}>
            {loading ? 'Uploading' : 'Choose File'}
          </Button>
        </Upload>
      </Col>
      <Col span={9} lg={9} xl={7} xxl={9} style={{
        marginLeft: 26, display: 'flex', alignItems: 'center'
      }}>
        <Input
          placeholder="select file..."
          style={{
            maxWidth: 300, width: '100%'
          }}
          label={'Origin File Name'}
          type="secondary"
          value={originFileName}
          onClick={openDialogManual}
        />
        <span style={{ marginTop: 20, marginLeft: 10 }}>
          {doc.summary && doc.summary.map((data, key) => (
            <LargeCheckbox
              type={data.color}
              checked={data.status === 'uploaded'}
              key={key}
              title={`File for ${data.monthName} is ${data.status}`}
            />
          ))}
        </span>
      </Col>
    </div>
  )
}

UploadForm.propTypes = {
  onSelected: bool,
  doc: object,
  onReceiveFile: func,
  onUpload: bool,
  fileOnUpload: string
}

export default UploadForm
