import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  Table,
  Divider,
  Icon,
  Button,
  Col,
  Row,
  Input,
  Popconfirm,
  Typography
} from "antd";

import Api from "../../../utils/api";
import _ from "lodash";

const { Title } = Typography;

const Datatable = props => {
  const { title, addButton, store, params, history } = props;

  const [pagination, setPagination] = useState({
    total: store.total,
    current: store.params.page,
    pageSize: store.params.limit
  });
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState(props.columns);
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  let searchInput;
  useEffect(() => {
    let { endpoint, store, data } = props;

    /**
     * Set filtering, sorting params from redux
     */
    const setParamsByDefault = () => {
      if (store.params) {
        // set sorting column
        if (store.params.sort) {
          const sortedColumn = columns.find(
            c => c.dataIndex === store.params.sort
          );
          sortedColumn.defaultSortOrder =
            store.params.dir === "desc" ? "descend" : "ascend";
        }

        // set filtering columns
        if (store.params.filters) {
          const fields = Object.keys(store.params.filters);
          fields.forEach(field => {
            const filteredColumn = columns.find(c => c.dataIndex === field);
            filteredColumn.defaultFilteredValue = store.params.filters[field];
          });
        }
      }
    };

    /**
     * Fetch data by specified parameters
     */
    const fetchData = async () => {
      try {
        // show loading animation
        setLoading(true);

        // request data
        const result = await Api.request(endpoint, store.params);

        // set total numbers of items for pagination
        setPagination({ ...pagination, total: result.data.total });

        // dispatch results to store
        dispatch({ type: data, payload: result.data });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    // Automatically set sorting/filtering columns from store
    setParamsByDefault();

    // Fetch data
    if (!store.loaded && !loading) {
      fetchData();
    }
  }, [props, columns, dispatch, pagination, loading]);

  /**
   * Add action (edit/delete) buttons to columns if needed
   */
  const addActionsColumns = () => {
    return {
      title: "Actions",
      dataIndex: "id",
      render: (id, row) => (
        <Fragment>
          <Button
            type="link"
            onClick={() =>
              history.push(`${history.location.pathname}/edit/${row.id}`)
            }
          >
            <Icon type="edit" />
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => props.deleteCallback(id)}
          >
            <Icon type="delete" />
          </Popconfirm>
        </Fragment>
      )
    };
  };

  /**
   * Configure search bars for columns if available
   */
  const setupSearchForColumns = () => {
    return columns.map(column => {
      if (column.search) {
        return {
          ...column,
          ...getColumnSearchProps(column.title, column.dataIndex)
        };
      } else {
        return column;
      }
    });
  };

  /**
   * Configure column search properties
   *
   * @param {*} columnName
   * @param {*} dataIndex
   */
  const getColumnSearchProps = columnName => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
      return (
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${columnName}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      );
    },
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    }
  });

  /**
   * Request data if any parameters change
   *
   * @param {*} pagination
   * @param {*} filters
   * @param {*} sorter
   */
  const handleTableChange = (pagination, filters, sorter) => {
    // get pagination number
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination(pager);

    // get sorting column
    const sort = !_.isEmpty(sorter) ? sorter.field : null;

    // get sorting direction
    const dir = !_.isEmpty(sorter)
      ? sorter.order === "ascend"
        ? "asc"
        : "desc"
      : null;

    // get filter parameters
    filters = _.pickBy(_.pickBy(filters, _.identity), value => value.length);

    // dispatch new parameters to store
    dispatch({
      type: params,
      payload: {
        page: pagination.current,
        limit: pagination.pageSize,
        sort,
        dir,
        filters
      }
    });
  };

  // process columns
  // add action columns and search bars
  if (!ready) {
    let tempColumns = [...setupSearchForColumns(), addActionsColumns()];
    setColumns(tempColumns);
    setReady(true);
  }

  return (
    <Fragment>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={3}>
          <Title level={3}>{title}</Title>
        </Col>
        {addButton && (
          <Col span={3} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => history.push(`${history.location.pathname}/add`)}
            >
              <Icon type={addButton.icon} />
              {addButton.text}
            </Button>
          </Col>
        )}
      </Row>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={store.data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Fragment>
  );
};

Datatable.propTypes = {
  columns: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default Datatable;
