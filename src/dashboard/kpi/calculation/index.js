import React from 'react'
import { Row, Col } from 'antd'
import {
  actionProcessFile, actionGetListGroup, actionGetListDocs, actionGetSummary, actionCalculate
} from 'context/kpi/action'
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
import UploadIcon from 'components/upload-icon'
import {
  kpiEndpointUpload, getMonthByQuarter, getNumberOfMonth, listYear, listQuarter, mergeSummaryToDoc
} from './helper'
import './style.css'

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
  const [ , summaryLoading ] = useStateDefault('GET_KPI_SUMMARY')
  const [ fileUploaded, setFileUploaded ] = React.useState({})
  const [user] = useStateValue('user')
  const [listGroup] = useStateValue('listGroup')
  const [listDoc] = useStateValue('listDoc')
  const [kpiUpload] = useStateValue('kpiUpload')
  const [kpiSummary] = useStateValue('kpiSummary')
  const [ summaryUploaded, setSummaryUploaded ] = React.useState([])
  const [ listColor, setListColor ] = React.useState([])
  // use side effect
  const summaryParam = { groupId: group, year, quarter }
  const prevError = usePrevious(uploadError)
  const prevKpiSummary = usePrevious(kpiSummary)
  const prevProgress = usePrevious(kpiUpload.progress)
  const prevListDoc = usePrevious(listDoc)
  const prevListGroup = usePrevious(listGroup)
  const prevSummaryParam = usePrevious(summaryParam)
  React.useEffect(() => {
    // group summary by the doc Id
    if (!listGroup && listGroup !== prevListGroup) {
      actionGetListGroup(dispatch, { employeeid: user.data.employeeid })
    }
    if (!listDoc && listDoc !== prevListDoc) {
      actionGetListDocs(dispatch)
    }
    if (listDoc && listDoc !== prevListDoc) {
      setSummaryUploaded(listDoc.data)
    }
    if (uploadError && uploadError !== prevError) {
      onUploadError(uploadError)
    }
    if (JSON.stringify(prevSummaryParam) !== JSON.stringify(summaryParam)) {
      const { groupId, year, quarter } = summaryParam
      const hasInputAll = year && quarter && groupId
      if(hasInputAll) {
        actionGetSummary(dispatch, summaryParam)
      }
    }
    if (kpiSummary && kpiSummary !== prevKpiSummary) {
      const [ dataSummary, dataColor ] = mergeSummaryToDoc(listDoc, kpiSummary)
      setSummaryUploaded(dataSummary)
      setListColor(dataColor)
    }
  },
  [ listGroup, prevListGroup, listDoc, prevListDoc, uploadError, prevError, dispatch, kpiUpload,
    prevProgress, fileList.length, fileUploaded, onUpload, prevSummaryParam, summaryParam,
    user.data.employeeid, kpiSummary, prevKpiSummary ]
  )

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
      const username = user.data.sub
      const filename = sourceFile.file.name
      setFileOnUpload(filename)
      let formData = new FormData()
      formData.append('uploadFile', new Blob([sourceFile.file]))
      formData.append('docId', sourceFile.docId)
      formData.append('filename', filename)
      formData.append('groupId', group)
      formData.append('month', getNumberOfMonth(month))
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

  const onCalculate = () =>
    actionCalculate(dispatch, {
      year,
      quarter,
      groupId: group
    })
  const onUploadError = () => {
    setOnUpload(false)
    setFileOnUpload('')
  }
  const onUploadFinished = () => {
    setOnUpload(false)
    setFileOnUpload('')
    setFileUploaded({})
    setFileList([])
  }
  const onReceiveFile = (file) => {
    let files = [ ...fileList, file ]
    setFileList(files)
  }

  const loadingWhenUpload = uploadLoading
  const loadingWhenCalculate = uploadLoading
  const showAction = monthByQuarter && group && !summaryLoading
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
                onChange={setYear}
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
            {showAction &&
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
          {showAction &&
          <><Title bold level={3}>Upload File</Title>
            <Row type="flex" justify="center" align="middle" gutter={16}>
              <Col span={16} lg={24} xl={20} xxl={19}>
                {summaryUploaded.map((doc, i) => (
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
                    disabled={fileList && !fileList[0] ||loadingWhenUpload || loadingWhenCalculate}
                  >
                    {loadingWhenUpload ? <UploadIcon /> : ''}
                    Process File
                  </Button>
                  <Button
                    onClick={onCalculate}
                    loading={loadingWhenCalculate}
                    type="secondary"
                    disabled={loadingWhenUpload || loadingWhenCalculate}
                  >
                    Calculate KPI
                  </Button>
                </div>
              </Col>
            </Row>
            <ul className="color-description">
              {listColor.map((data, key) => (
                <li key={key}><span className={`circle-description circle-${data.color}`}></span>{data.monthName}</li>
              ))}
            </ul></>
          || ''}
        </div>
      </Content>
    </LayoutPage>
  )
}
export default KpiCalculationPage
