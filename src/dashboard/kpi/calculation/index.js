import './style.css'

import { Col, message, Row } from 'antd' // @TODO: this need to be fixed to optimize bundle size
import Button from 'components/button'
import Helmet from 'components/helmet'
import Input from 'components/input'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Spinner from 'components/loader/spinner'
import Select from 'components/select'
import Title from 'components/text/title'
import { usePrevious, useStateDefault, useStateValue } from 'context'
import {
  actionCalculate,
  actionCalculationStatus,
  actionGetListDocs,
  actionGetListGroup,
  actionGetSummary,
  actionProcessFile
} from 'context/kpi/action'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  getMonthByQuarter,
  getNumberOfMonth,
  listQuarter,
  listYear
} from 'utils/time'

import { kpiEndpointUpload, mergeSummaryToDoc } from './helper'
import UploadForm from './uploadForm'

function KpiCalculationPage() {
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.calculation.'
  const [quarter, setQuarter] = React.useState(0)
  const [group, setGroup] = React.useState(0)
  const [year, setYear] = React.useState(null)
  const [month, setMonth] = React.useState(2)
  const [uploadStatus, setUploadedStatus] = React.useState(false)
  const [fileList, setFileList] = React.useState([])
  const [onUpload, setOnUpload] = React.useState(false)
  const [fileOnUpload, setFileOnUpload] = React.useState('')
  const [monthByQuarter, setMonthByQuarter] = React.useState(
    getMonthByQuarter()
  )
  const [uploadError, uploadLoading, dispatch] = useStateDefault('PROCESS_FILE')
  const [, summaryLoading] = useStateDefault('GET_KPI_SUMMARY')
  const [calculateError, calculateLoading] = useStateDefault('CALCULATE_KPI')
  const [fileUploaded, setFileUploaded] = React.useState({})
  const [user] = useStateValue('user')
  const [listGroup] = useStateValue('listGroup')
  const [listDoc] = useStateValue('listDoc')
  const [kpiUpload] = useStateValue('kpiUpload')
  const [kpiSummary] = useStateValue('kpiSummary')
  const [kpiCalculationStatus] = useStateValue('kpiCalculationStatus')
  const [summaryUploaded, setSummaryUploaded] = React.useState([])
  const [listColor, setListColor] = React.useState([])

  // use side effect
  const summaryParam = {
    groupId: group,
    year,
    quarter
  }
  const prevError = usePrevious(uploadError)
  const prevKpiSummary = usePrevious(kpiSummary)
  const prevProgress = usePrevious(kpiUpload.progress)
  const prevListDoc = usePrevious(listDoc)
  const prevListGroup = usePrevious(listGroup)
  const prevSummaryParam = usePrevious(summaryParam)
  const prevCalculateLoading = usePrevious(calculateLoading)
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
      if (hasInputAll) {
        actionGetSummary(dispatch, summaryParam)
        actionCalculationStatus(dispatch, summaryParam)
      }
    }
    if (kpiSummary && kpiSummary !== prevKpiSummary) {
      const [dataSummary, dataColor, uploaded] = mergeSummaryToDoc(
        listDoc,
        kpiSummary
      )
      setSummaryUploaded(dataSummary)
      setListColor(dataColor)
      setUploadedStatus(uploaded)
    }
    if (prevCalculateLoading && calculateLoading === false && !calculateError) {
      message.info('Calculate has been finished')
    }
  }, [
    listGroup,
    prevListGroup,
    listDoc,
    prevListDoc,
    uploadError,
    prevError,
    dispatch,
    kpiUpload,
    prevProgress,
    fileList.length,
    fileUploaded,
    onUpload,
    prevSummaryParam,
    summaryParam,
    user.data.employeeid,
    kpiSummary,
    prevKpiSummary,
    prevCalculateLoading,
    calculateLoading,
    calculateError
  ])
  const onQuarterChange = quarter => {
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
    for (let i = 0; i < fileList.length; i++) {
      const sourceFile = fileList[i]
      const username = user.data.sub
      const filename = sourceFile.file.name
      setFileOnUpload(filename)
      const formData = new FormData()
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
      fileHasUploaded = {
        ...fileHasUploaded,
        [filename]: true
      }
      setFileUploaded(fileHasUploaded)
    }
    onUploadFinished()
  }

  const onCalculate = () => {
    message.info('Prepare calculate...').then(() => {
      if (!calculateError) {
        message.info('Calculating...')
      }
    })
    actionCalculate(dispatch, {
      year,
      quarter,
      groupId: group,
      username: user.data.sub,
      itemId: 1558674252026,
      docId: 1558666944435
    })
  }
  const onUploadError = () => {
    setOnUpload(false)
    setFileOnUpload('')
  }
  const onUploadFinished = () => {
    setOnUpload(false)
    setFileOnUpload('')
    setFileUploaded({})
    setFileList([])
    actionGetSummary(dispatch, summaryParam)
  }
  const onReceiveFile = file => {
    const files = [...fileList, file]
    setFileList(files)
  }

  const loadingWhenUpload = uploadLoading
  const loadingWhenCalculate = calculateLoading
  const { data } = kpiCalculationStatus || {}
  const showAction = monthByQuarter && group && !summaryLoading
  const uploadStatuses = () => {
    if (uploadStatus.uploaded) {
      return 'Uploaded'
    }
    if (uploadStatus.notCompleted) {
      return 'Not Completed'
    }

    return 'Not Uploaded'
  }

  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(`${tKey}pageTitle`)}</title>
      </Helmet>
      <Content>
        <Title bold level={2}>
          Calculation
        </Title>
        <div className="section-row">
          <Title bold level={3}>
            Choose Period
          </Title>
          <Row gutter={16}>
            <Col span={6}>
              <Select
                type="secondary"
                label="Quarter"
                optionList={listQuarter}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
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
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={setMonth}
                devaultValue={month}
              />
            </Col>
            <Col span={6}>
              <Select
                type="secondary"
                label="Year"
                optionList={listYear}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
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
                optionList={
                  listGroup && listGroup.data
                    ? listGroup.data.map(data => ({
                        name: data.group_name,
                        value: data.id
                      }))
                    : []
                }
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={setGroup}
              />
            </Col>
          </Row>
          <Row>
            {(showAction && (
              <div style={{ marginTop: 20 }}>
                <Col span={6}>
                  <Input
                    value={uploadStatuses()}
                    style={{
                      maxWidth: 300,
                      width: '100%',
                      textTransform: 'capitalize'
                    }}
                    label="Status Upload"
                    type="secondary"
                  />
                </Col>
                <Col span={6}>
                  <Input
                    value={data && data.status}
                    style={{
                      maxWidth: 300,
                      width: '100%',
                      textTransform: 'capitalize'
                    }}
                    label="Status Calculate"
                    type="secondary"
                  />
                </Col>
              </div>
            )) ||
              ''}
          </Row>
        </div>
        <div className="section-row upload">
          {(showAction && (
            <>
              <Title bold level={3}>
                Upload File
              </Title>
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
                      disabled={
                        (fileList && !fileList[0]) ||
                        loadingWhenUpload ||
                        loadingWhenCalculate
                      }
                    >
                      {loadingWhenUpload ? (
                        <Spinner size="default" style={{ marginRight: 10 }} />
                      ) : (
                        ''
                      )}
                      Process File
                    </Button>
                    <Button
                      onClick={onCalculate}
                      type="secondary"
                      disabled={
                        loadingWhenUpload ||
                        loadingWhenCalculate ||
                        !uploadStatus.uploaded
                      }
                    >
                      {loadingWhenCalculate ? (
                        <Spinner size="default" style={{ marginRight: 10 }} />
                      ) : (
                        ''
                      )}
                      Calculate KPI
                    </Button>
                  </div>
                </Col>
              </Row>
              <ul className="color-description">
                {listColor.map((data, key) => (
                  <li key={key}>
                    <span
                      className={`circle-description circle-${data.color}`}
                    ></span>
                    {data.monthName}
                  </li>
                ))}
              </ul>
            </>
          )) ||
            ''}
        </div>
        {(summaryLoading && <Spinner center tip="Loading..." top="10%" />) ||
          ''}
      </Content>
    </LayoutPage>
  )
}
export default KpiCalculationPage
