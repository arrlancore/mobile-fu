import React from 'react'
import { Row, Col, message } from 'antd'
import { actionProcessFile, actionGetListGroup, actionGetListDocs } from 'context/kpi/action'
import { useStateDefault, useStateValue } from 'context'
import { useTranslation } from 'react-i18next'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Select from 'components/select'
import Input from 'components/input'
import Button from 'components/button'
import Title from 'components/text/title'
import UploadForm from './uploadForm'
import usePrevious from 'utils/usePrevious'
import getUser from 'utils/userData'
import './style.css'

function getMonthByQuarter (quarter) {
  if (!quarter) return null
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ]
  const end = quarter * 3
  const start = end - 3
  const monthByQuarters = months.slice(start, end)
  return monthByQuarters.map(month => ({ value: month, name: month }))
}

const listYear = [
  { name: 2019, value: 2019 },
  { name: 2018, value: 2018 } ]
const listQuarter = [
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 }
]

const kpiEndpointUpload = (key) => {
  let list = [
    {
      name: 'GPN Error',
      url: '/googledocs/error'
    },
    {
      name: 'GPN Daily',
      url: '/googledocs/daily'
    },
    {
      name: 'GPN Monthly',
      url: '/googledocs/monthly'
    }
  ]
  const result = list.filter(file => file.name === key)
  return result[0]
}

function KpiCalculationPage () {
  // initiation
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.calculation.'
  const [ quarter, setQuarter ] = React.useState(0)
  const [ group, setGroup ] = React.useState(0)
  const [ year, setYear ] = React.useState(null)
  const [ month, setMonth ] = React.useState(null)
  const [ fileList, setFileList ] = React.useState([])
  const [ onUpload, setOnUpload ] = React.useState(false)
  const [ fileOnUpload, setFileOnUpload ] = React.useState('')
  const [ monthByQuarter, setMonthByQuarter ] = React.useState(getMonthByQuarter())
  const [ uploadError, uploadLoading, dispatch ] = useStateDefault('PROCESS_FILE')
  const [ fileUploaded, setFileUploaded ] = React.useState({})
  console.log('TCL: KpiCalculationPage -> fileUploaded', fileUploaded)
  const [listGroup] = useStateValue('listGroup')
  const [listDoc] = useStateValue('listDoc')

  // use side effect
  const prevError = usePrevious(uploadError)
  const prevListDoc = usePrevious(listDoc)
  const prevListGroup = usePrevious(listGroup)
  React.useEffect(() => {
  // getting some data from server
    if (!listGroup && prevListGroup !== listGroup) {
      actionGetListGroup(dispatch)
    }
    if (!listDoc && prevListDoc !== listDoc) {
      actionGetListDocs(dispatch)
    }
    if (uploadError && uploadError !== prevError) {
      onUploadError(uploadError)
    }
    // return actionGetListGroup(dispatch)
  }, [ listGroup, prevListGroup, listDoc, prevListDoc, uploadError, prevError, dispatch ])

  const onYearChange = setYear

  const onQuarterChange = (quarter) => {
    setQuarter(quarter)
    setMonths(year, quarter)
  }

  const setMonths = (year, quarter) => {
    const months = getMonthByQuarter(quarter, year)
    setMonthByQuarter(months)
  }

  const onProcessFile = async () => {
    let fileHasUploaded = {}
    setOnUpload(true)
    for(let i=0; i < fileList.length; i++) {
      let sourceFile = fileList[i]
      const username = getUser().sub
      const filename = sourceFile.file.name
      setFileOnUpload(filename)
      let formData = new FormData()
      formData.append('uploadFile', new Blob([sourceFile.file]))
      formData.append('docId', sourceFile.docId)
      formData.append('filename', filename)
      formData.append('groupId', group)
      formData.append('month', month)
      formData.append('quarter', quarter)
      formData.append('year', year)
      formData.append('username', username)
      formData.append('url', kpiEndpointUpload(sourceFile.docName).url)
      await actionProcessFile(dispatch, formData)
      fileHasUploaded = { ...fileHasUploaded, [filename]: true }
      setFileUploaded(fileHasUploaded)
    }
    onUploadFinished()
  }

  const onUploadError = (err) => {
    setOnUpload(false)
    setFileOnUpload('')
    message.error(err)
  }

  const onUploadFinished = () => {
    setOnUpload(false)
    setFileOnUpload('')
    setFileList([])
  }

  const onReceiveFile = (file) => {
    let files = [ ...fileList, file ]
    setFileList(files)
  }

  const loadingWhenUpload = uploadLoading
  const loadingWhenCalculate = uploadLoading
  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(tKey + 'pageTitle')}</title>
      </Helmet>
      <Content>
        <Title bold level={2}>Calculation</Title>
        <div className="section-row">
          <Title bold level={3}>Choose Period</Title>
          <Row gutter={16}>
            <Col span={6}>
              <Select
                type="secondary"
                label="Quarter"
                optionList={listQuarter}
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={onQuarterChange}
              />
            </Col>
            <Col span={6}>
              <Select
                type="secondary"
                label="Month"
                optionList={monthByQuarter || []}
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={setMonth}
              />
            </Col>
            <Col span={6}>
              <Select
                type="secondary"
                devaultValue={quarter}
                label="Year"
                optionList={listYear}
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={onYearChange}
              />
            </Col>
            <Col span={6}>
              <Select
                type="secondary"
                label="Group"
                optionList={listGroup && listGroup.data ?
                  listGroup.data.map(data => ({ name: data.group_name, value: data.id }))
                  : []
                }
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={setGroup}
              />
            </Col>
          </Row>
          <Row>
            {monthByQuarter && group &&
              <div style={{ marginTop: 20 }}>
                <Col span={6}>
                  <Input
                    value="Uploaded"
                    style={{
                      maxWidth: 300, width: '100%'
                    }}
                    label="Status Upload"
                    type="secondary"
                  />
                </Col>
                <Col span={6}>
                  <Input
                    value="Not calculated yet"
                    style={{
                      maxWidth: 300, width: '100%'
                    }}
                    label="Status Calculate"
                    type="secondary"
                  />
                </Col>
              </div>
              || ''
            }
          </Row>
        </div>

        <div className="section-row upload">
          {monthByQuarter && group &&
          <>
            <Title bold level={3}>Upload File</Title>
            <Row type="flex" justify="center" align="middle" gutter={16}>
              <Col span={16} lg={24} xl={20} xxl={19}>
                {listDoc && listDoc.data.map((doc, i) => (
                  <UploadForm
                    key={i}
                    onReceiveFile={onReceiveFile}
                    checkDefault={false}
                    doc={doc}
                    onUpload={onUpload}
                    fileOnUpload={fileOnUpload}
                    fileUploaded={fileUploaded}
                  />
                ))}
              </Col>
              <Col span={8} lg={24} xl={4} xxl={5} className="action-button">
                <div className="wrap-action-button">
                  <Button
                    onClick={onProcessFile}
                    style={{ marginBottom: 64 }}
                    type="secondary"
                    loading={loadingWhenUpload}
                    disabled={fileList && !fileList[0] ||loadingWhenUpload || loadingWhenCalculate}
                  >
                    Process File
                  </Button>
                  <Button
                    loading={loadingWhenCalculate}
                    type="secondary"
                    disabled={loadingWhenUpload || loadingWhenCalculate}
                  >
                    Calculate KPI
                  </Button>
                </div>
              </Col>
            </Row>
          </>
          || ''
          }
        </div>
      </Content>
    </LayoutPage>
  )
}
export default KpiCalculationPage
