import React from 'react'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Select from 'components/select'
import Button from 'components/button'
import Table from 'components/table'
import Title from 'components/text/title'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'antd'
import { listYear, listQuarter } from 'utils/time'
import { useStateValue, usePrevious, useStateDefault } from 'context'
import {
  actionGetListGroup,
  actionGetReport,
  actionExportReport
} from 'context/kpi/action'
/**
 * KPI Calculation page
 */
function KpiCalculationPage() {
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.report.'
  const [listGroup, dispatch] = useStateValue('listGroup')
  const [groupId, setGroupId] = React.useState(null)
  const [paramHasInput, setParamHasInput] = React.useState(false)
  const [, reportLoading] = useStateDefault('GET_REPORT')
  const [, exportLoading] = useStateDefault('EXPORT_REPORT')
  const [year, setYear] = React.useState(null)
  const [quarter, setQuarter] = React.useState(null)
  const [user] = useStateValue('user')
  const [kpiReport] = useStateValue('kpiReport')

  const summaryParam = { groupId, year, quarter }
  const prevSummaryParam = usePrevious(summaryParam)
  const prevListGroup = usePrevious(listGroup)
  React.useEffect(() => {
    // group summary by the doc Id
    if (!listGroup && listGroup !== prevListGroup) {
      actionGetListGroup(dispatch, { employeeid: user.data.employeeid })
    }
    if (JSON.stringify(prevSummaryParam) !== JSON.stringify(summaryParam)) {
      const { groupId, year, quarter } = summaryParam
      const hasInputAll = year && quarter && groupId
      if (hasInputAll) {
        actionGetReport(dispatch, summaryParam)
        setParamHasInput(true)
      }
    }
  }, [
    listGroup,
    prevListGroup,
    prevSummaryParam,
    summaryParam,
    dispatch,
    user.data.employeeid
  ])

  // const CheckboxGroup = Checkbox.Group
  // const filterOption = [ 'CRM', 'CPC', 'CTR' ]
  const dataGroup =
    listGroup && listGroup.data
      ? listGroup.data.map(data => ({ name: data.group_name, value: data.id }))
      : []

  const onExportReport = () => actionExportReport(dispatch, summaryParam)

  const ColumnHeader = () => (
    <>
      <Row
        gutter={24}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 28
        }}
      >
        <Button
          onClick={onExportReport}
          style={{ maxWidth: 300 }}
          type="secondary"
        >
          Export
        </Button>
      </Row>
      <Row gutter={24}>
        <Col span={12}>Result</Col>
        {/* <Col span={12} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <CheckboxGroup options={filterOption} defaultValue={[]} onChange={onChange} />
          <Tooltip title="You can do some filter">
            <Icon type="question-circle" />
          </Tooltip>
        </Col> */}
      </Row>
    </>
  )

  let columnProperty = [
    // add special condition for one or each column here
    {
      dataIndex: 'employee_id',
      sorter: (a, b) => a - b
    },
    {
      dataIndex: 'name',
      sorter: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    },
    {
      dataIndex: 'perc_final',
      width: 120,
      align: 'center',
      render: function scoreBar(score) {
        const getColor = score => {
          if (score > 50 && score <= 100) {
            return '#52c41a'
          }
          return '#F39C12'
        }
        return (
          <div className="score-bar">
            <span
              className="score-bar-progress"
              style={{
                width: `${Math.round(score / 10)}%`,
                background: getColor(Math.round(score / 10))
              }}
            />
            <span className="score-bar-value">{score}</span>
          </div>
        )
      }
    }
  ]

  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(tKey + 'pageTitle')}</title>
      </Helmet>
      <Content>
        <Title bold level={2}>
          Achivement
        </Title>
        <div className="section-row">
          <Row gutter={24}>
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
                label="Quarter"
                optionList={listQuarter}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={setQuarter}
              />
            </Col>
            {/* <Col span={6}>
              <Select
                type="secondary"
                label="Team"
                optionList={listYear}
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={onChange}
              />
            </Col> */}
            <Col span={6}>
              <Select
                type="secondary"
                label="Group"
                optionList={dataGroup}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={setGroupId}
              />
            </Col>
          </Row>
        </div>

        <div className="section-row">
          <Row gutter={24}>
            {/* <Col span={6}>
            </Col>
            <Col span={6}>
              <Button style={{ maxWidth: 300 }} type="secondary">
                 Reset
              </Button>
            </Col> */}
            {/* <Col span={6}>
              <Button style={{ maxWidth: 300 }} type="secondary">
                 Apply
              </Button>
            </Col>
            <Col span={6}>
            </Col> */}
          </Row>
        </div>

        {paramHasInput ? (
          <div className="section-row">
            <Table
              title={() => <ColumnHeader />}
              data={kpiReport ? kpiReport.data : []}
              scroll={{ x: 1300 }}
              columnProperty={columnProperty}
              excludeColumns={['color']}
              loading={reportLoading || exportLoading}
            />
          </div>
        ) : (
          ''
        )}
      </Content>
    </LayoutPage>
  )
}

export default KpiCalculationPage
