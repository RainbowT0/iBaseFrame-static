import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Popconfirm,
  Radio,
  Upload,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['success', 'error'];
const status = ['锁定', '未锁定'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入用户姓名！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编码">
        {form.getFieldDecorator('code', {
          rules: [{ required: true, message: '请输入用户编码！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入用户密码！' }],
        })(<Input placeholder="请输入" type="password" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="身份">
        {form.getFieldDecorator('identity', {
          rules: [{ required: true, message: '请选择用户身份！' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value='1'>管理员</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入用户手机号！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入用户邮箱！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      {/* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload> */}
    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => { },
    handleUpdateModalVisible: () => { },
    values: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      formVals: {
        name: props.values.name,
        code: props.values.code,
        password: props.values.password,
        identity: props.values.identity,
        phone: props.values.phone,
        img: '',
        email: props.values.email,
        id: props.values.id
      }
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  render() {
    const { updateModalVisible, handleUpdateModalVisible, handleUpdate, form } = this.props;
    const { formVals: oldValue } = this.state;
    const confimHandle = () => {
      form.validateFields((err, fieldsValue) => {
        const formVals = { ...oldValue, ...fieldsValue };
        if (err) return;
        form.resetFields();
        handleUpdate(formVals);
      });
    }
    return (
      <Modal
        width={640}
        destroyOnClose
        title="编辑用户"
        visible={updateModalVisible}
        onOk={confimHandle}
        onCancel={() => handleUpdateModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户姓名！' }], initialValue: oldValue.name
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编码">
          {form.getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入用户编码！' }], initialValue: oldValue.code
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入用户密码！' }], initialValue: oldValue.password
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="身份">
          {form.getFieldDecorator('identity', {
            rules: [{ required: true, message: '请选择用户身份！' }], initialValue: oldValue.identity
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              <Option value='1'>管理员</Option>
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
          {form.getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入用户手机号！' }], initialValue: oldValue.phone
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
          {form.getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入用户邮箱！' }], initialValue: oldValue.email
          })(<Input placeholder="请输入" />)}
        </FormItem>
        {/* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload> */}
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {}
  };

  columns = [
    {
      title: '编码',
      dataIndex: 'code',
      // render: text => <Link to={`/profile/basic/${text.replace(/\s+/gi, '-')}`}>{text}</Link>,
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '身份',
      dataIndex: 'identity'
    },
    {
      title: '手机',
      dataIndex: 'phone'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '锁定',
      dataIndex: 'isLock',
      filters: [
        {
          text: status[0],
          value: 'N',
        },
        {
          text: status[1],
          value: 'Y',
        }
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要锁定此行？" onConfirm={() => this.handleLock(record)}>
            <a>锁定</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除此行？" onConfirm={() => this.handleDelete(record)}>
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
      payload: { size: 10, current: 1 },
      callback: (data) => {
        if (data.statusCode !== 200) {
          message.error(data.errorMessage)
        }
      }
    });
  }

  // 分页获取列表
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] =getValue(filtersArg[key]);
      return newObj;
    }, {});
    let fromV = {}
    for (let key in filters) {
      fromV[`search_EQ_${key}`] = filters[key]
    }
    const params = {
      current: pagination.current,
      size: pagination.pageSize,
      ...formValues,
      ...fromV,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  // 重置查询条件
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {
        size: 10,
        current: 1
      },
    });
  };

  // 查询条件展示和收起
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  // 选中列表获取数据
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let fromV = []
      for (let key in fieldsValue) {
        fromV[`search_EQ_${key}`] = fieldsValue[key]
      }
      const values = {
        ...fromV,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        size: 10,
        current: 1
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  // 新建弹框隐藏和显示
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag
    });
  };

  // 编辑弹框隐藏和显示
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  // 锁定
  handleLock = record=>{
    const { dispatch } = this.props
    dispatch({
      type:'rule/lock',
      payload:{id:record.id},
      callback:(data)=>{
        if(data.statusCode===200){
          message.success('锁定成功！')
          dispatch({type:'rule/fetch',payload:{}})
        }else{
          message.error(data.errorMessage)
        }
      }
    })
  }

  // 删除
  handleDelete = record => {
    const { dispatch } = this.props
    dispatch({
      type: 'rule/remove',
      payload: record.id,
      callback: (data) => {
        if (data.statusCode === 200) {
          message.success('删除成功！')
          dispatch({
            type: 'rule/fetch',
            payload: { size: 10, current: 1 },
          });
        } else {
          message.error(data.errorMessage)
        }
      },
    });
  };

  // 批量删除
  handleRemoves = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) return;
    dispatch({
      type: 'rule/removes',
      payload: {
        ids: selectedRows.map(e => e.id)
      },
      callback: (data) => {
        if (data.statusCode === 200) {
          message.success('批量删除成功！')
          dispatch({
            type: 'rule/fetch',
            payload: { size: 10, current: 1 }
          })
        } else {
          message.error(data.errorMessage)
        }
      }
    })
  };

  // 添加
  handleAdd = fields => {
    const { dispatch } = this.props;
    const self = this;
    dispatch({
      type: 'rule/add',
      payload: fields,
      callback: (data) => {
        if (data.statusCode === 200) {
          message.success('添加成功');
          self.handleModalVisible();
          dispatch({
            type: 'rule/fetch',
            payload: { size: 10, current: 1 },
          });
        } else {
          message.error(data.errorMessage);
        }
      },
    });
  };

  // 编辑
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/update',
      payload: fields,
      callback: (data) => {
        if (data.statusCode === 200) {
          message.success('编辑成功！');
          this.handleUpdateModalVisible();
          dispatch({
            type: 'rule/fetch',
            payload: { size: 10, current: 1 }
          })
        } else {
          message.error(data.errorMessage);
        }
      }
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编码">
              {getFieldDecorator('code')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编码">
              {getFieldDecorator('code')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份">
              {getFieldDecorator('identity')(
                <Select style={{ width: '100%' }} placeholder="请选择">
                  <Option value='1'>管理员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="手机">
              {getFieldDecorator('phone')(
                <Input style={{ width: '100%' }} placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(
                <Input style={{ width: '100%' }} placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate
    };
    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Popconfirm title="是否要批量删除？" onConfirm={() => this.handleRemoves()}>
                    <Button>批量删除</Button>
                  </Popconfirm>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
