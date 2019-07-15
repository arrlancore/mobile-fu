import './style.css'

import { Col, Row } from 'antd'
import Button from 'components/button'
import Helmet from 'components/helmet'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Select from 'components/select'
import Table from 'components/table'
import Title from 'components/text/title'
import { usePrevious, useStateDefault, useStateValue } from 'context'
import {
  actionExportReport,
  actionGetReport,
  actionListTeam,
  actionListGroupByTeam
} from 'context/kpi/action'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { listQuarter, listYear } from 'utils/time'
import { sortNumber, sortString } from 'utils/sorter'

/**
 * KPI Calculation page
 */
function KpiReportPage() {
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.report.'
  const [groupId, setGroupId] = React.useState(null)
  const [teamId, setTeamId] = React.useState(null)
  const [paramHasInput, setParamHasInput] = React.useState(false)
  const [, reportLoading] = useStateDefault('GET_REPORT')
  const [, exportLoading] = useStateDefault('EXPORT_REPORT')
  const [, listGroupTeamLoading] = useStateDefault('LIST_GROUP_TEAM')
  const [year, setYear] = React.useState(null)
  const [quarter, setQuarter] = React.useState(null)
  const [user] = useStateValue('user')
  const [kpiReport] = useStateValue('kpiReport')
  const [listGroupTeam, dispatch] = useStateValue('listGroupByTeam')
  const [listTeam] = useStateValue('listTeam')

  const summaryParam = {
    groupId,
    year,
    quarter
  }
  const prevSummaryParam = usePrevious(summaryParam)
  const prevListTeam = usePrevious(listTeam)
  const prevTeamId = usePrevious(teamId)
  React.useEffect(() => {
    // group summary by the doc Id
    if (!listTeam && listTeam !== prevListTeam) {
      actionListTeam(dispatch)
    }
    if (JSON.stringify(prevSummaryParam) !== JSON.stringify(summaryParam)) {
      if (summaryParam.year && summaryParam.quarter && summaryParam.groupId) {
        actionGetReport(dispatch, summaryParam)
        setParamHasInput(true)
      }
    }
  }, [
    prevSummaryParam,
    summaryParam,
    dispatch,
    user.data.employeeid,
    listTeam,
    prevListTeam,
    teamId,
    prevTeamId
  ])

  const onTeamChange = teamId => {
    setTeamId(teamId)
    actionListGroupByTeam(dispatch, {
      teamid: teamId,
      employeeid: user.data.employeeid
    })
  }

  const dataGroup =
    listGroupTeam && listGroupTeam.data
      ? listGroupTeam.data.map(data => ({
          name: data.group_name,
          value: data.id
        }))
      : []

  const dataTeam =
    listTeam && listTeam.data
      ? listTeam.data.map(data => ({
          name: `${data.team} (${data.team_code})`,
          value: data.id
        }))
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

  const columnProperty = [
    // add special condition for one or each column here
    {
      dataIndex: 'employee_id',
      sorter: (a, b) => sortNumber(a, b)('employee_id')
    },
    {
      dataIndex: 'name',
      sorter: (a, b) => sortString(a, b)('name')
    },
    {
      dataIndex: 'perc_final',
      width: 120,
      align: 'center',
      render: function scoreBar(score) {
        const min = 50
        const max = 100
        const perTen = 10
        const getColor = scores => {
          if (scores > min && scores <= max) {
            return '#52c41a'
          }

          return '#F39C12'
        }

        return (
          <div className="score-bar">
            <span
              className="score-bar-progress"
              style={{
                width: `${Math.round(score / perTen)}%`,
                background: getColor(Math.round(score / perTen))
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
        <title>{t(`${tKey}pageTitle`)}</title>
      </Helmet>
      <Content>
        <Title bold level={2}>
          Report
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
            <Col span={6}>
              <Select
                type="secondary"
                label="Team"
                optionList={dataTeam}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={onTeamChange}
              />
            </Col>
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
                loading={listGroupTeamLoading}
                placeholder={listGroupTeamLoading ? 'loading...' : 'select'}
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

export default KpiReportPage
